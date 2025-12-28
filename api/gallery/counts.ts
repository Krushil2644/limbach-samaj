import type { VercelRequest, VercelResponse } from "@vercel/node";
import dotenv from "dotenv";
dotenv.config();

import galleryData from "../../src/content/gallery.json";

const CLOUDINARY_BASE_URL = `https://api.cloudinary.com/v1_1`;
const CLOUDINARY_SEARCH_ENDPOINT = `resources/search`;

// 5 min memory cache (warm serverless instances)
const CACHE_MS = 5 * 60 * 1000;
let cache: { ts: number; counts: Record<string, number> } | null = null;

function makeAuthHeader(apiKey: string, apiSecret: string) {
  return `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // CDN cache on Vercel
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");

    // memory cache
    if (cache && Date.now() - cache.ts < CACHE_MS) {
      return res.status(200).json({ counts: cache.counts, cached: true });
    }

    const assetPathPrefix = process.env.CLOUDINARY_ASSET_PREFIX;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const apiKey = process.env.CLOUDINARY_API_KEY;

    if (!assetPathPrefix || !cloudName || !apiKey || !apiSecret) {
      throw new Error("Missing required env variables!");
    }

    // Clean quotes (same idea as your [album].ts)
    const cleanApiKey = apiKey.replace(/^["']|["']$/g, "");
    const cleanApiSecret = apiSecret.replace(/^["']|["']$/g, "");
    const cleanAssetPathPrefix = assetPathPrefix.replace(/^["']|["']$/g, "");

    const searchUrl = `${CLOUDINARY_BASE_URL}/${cloudName}/${CLOUDINARY_SEARCH_ENDPOINT}`;
    const authHeader = makeAuthHeader(cleanApiKey, cleanApiSecret);

    const entries = await Promise.all(
      (galleryData as any[]).map(async (album) => {
        const directoryPath = `${cleanAssetPathPrefix}/${album.id}`;

        // We only need total_count, so max_results=1
        const searchParams = new URLSearchParams({
          expression: `folder:${directoryPath}`,
          max_results: "1",
        });

        const cloudinaryResponse = await fetch(`${searchUrl}?${searchParams}`, {
          method: "GET",
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        });

        if (!cloudinaryResponse.ok) {
          const errorText = await cloudinaryResponse.text();
          throw new Error(
            `Cloudinary count error (${album.id}): ${cloudinaryResponse.status} ${cloudinaryResponse.statusText} ${errorText}`
          );
        }

        const result = await cloudinaryResponse.json();

        // Cloudinary search response includes total_count
        const count = typeof result.total_count === "number" ? result.total_count : 0;

        return [album.id, count] as const;
      })
    );

    const counts = Object.fromEntries(entries);
    cache = { ts: Date.now(), counts };

    return res.status(200).json({ counts, done: true });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      error: error?.message || "Something went wrong!",
      ok: false,
    });
  }
}
