import type { VercelRequest, VercelResponse } from '@vercel/node';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  created_at: string;
  resource_type: string;
}

const CLOUDINARY_BASE_URL = `https://api.cloudinary.com/v1_1`;
const CLOUDINARY_SEARCH_ENDPOINT = `resources/search`;

export default async function handler(request: VercelRequest, response: VercelResponse) {
  try {
    const albumName = request.query?.album;
    const assetPathPrefix = process.env.CLOUDINARY_ASSET_PREFIX;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const apiKey = process.env.CLOUDINARY_API_KEY;

    if (!albumName) {
      throw new Error('No album name passed');
    }

    if (!assetPathPrefix || !cloudName || !apiKey || !apiSecret) {
      throw new Error('Missing required env variables!');
    }

    // Remove leading and trailing quotes from API credentials if present
    const cleanApiKey = apiKey.replace(/^["']|["']$/g, '');
    const cleanApiSecret = apiSecret.replace(/^["']|["']$/g, '');
    const cleanAssetPathPrefix = assetPathPrefix.replace(/^["']|["']$/g, '');

    const directoryPath = `${cleanAssetPathPrefix}/${albumName}`;

    const maxResults = 100;

    // Use Cloudinary Admin API search endpoint
    const searchUrl = `${CLOUDINARY_BASE_URL}/${cloudName}/${CLOUDINARY_SEARCH_ENDPOINT}`;

    const searchParams = new URLSearchParams({
      expression: `folder:${directoryPath}`,
      max_results: maxResults.toString(),
    });

    const cloudinaryResponse = await fetch(`${searchUrl}?${searchParams}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${btoa(`${cleanApiKey}:${cleanApiSecret}`)}`,
        'Content-Type': 'application/json',
      },
    });

    if (!cloudinaryResponse.ok) {
      const errorText = await cloudinaryResponse.text();
      console.error(`Cloudinary API error: ${cloudinaryResponse.status} ${cloudinaryResponse.statusText}`, errorText);
      throw new Error(`Cloudinary API error: ${cloudinaryResponse.status} ${cloudinaryResponse.statusText}`);
    }

    const result = await cloudinaryResponse.json();

    if (!result.resources || !Array.isArray(result.resources)) {
      console.warn(`No resources found in directory: ${directoryPath}`);
      return [];
    }

    // Transform the response to our standardized format
    const images: CloudinaryImage[] = result.resources.map((resource: any) => ({
      public_id: resource.public_id,
      secure_url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      bytes: resource.bytes,
      format: resource.format,
      created_at: resource.created_at,
      resource_type: resource.resource_type
    }));

    console.log(`Successfully fetched ${images.length} images from directory: ${directoryPath}`);

    return response.status(200).json({
      images,
      done: true
    })
  } catch (error) {
    console.error(error);
    return response.status(400).json({
      error: 'Something went wrong!',
      ok: false
    })
  }
}
