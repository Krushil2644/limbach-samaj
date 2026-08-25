import type { VercelRequest, VercelResponse } from '@vercel/node';
import dotenv from 'dotenv';

dotenv.config();

const CLOUDINARY_BASE_URL = `https://api.cloudinary.com/v1_1`;
const CLOUDINARY_SEARCH_ENDPOINT = `resources/search`;

/**
 * Thumbnail transformation applied to album covers. Cloudinary resizes and
 * re-encodes on delivery, so a 20 MB original is served as a ~60 kB WebP.
 */
const COVER_TRANSFORM = 'c_fill,g_auto,w_800,h_450,q_auto,f_auto';

export interface GalleryAlbum {
  /** Cloudinary folder name, e.g. "picnic-2026". */
  id: string;
  /** Derived from the folder name; the client may override it. */
  title: string;
  /** Delivery URL of a representative image, already resized. */
  coverImage: string | null;
  /** Total assets in the folder, images and video. */
  imagesLength: number;
  /** Newest asset's upload time, used to order albums newest-first. */
  updatedAt: string | null;
}

/** "picnic-2026" -> "Picnic 2026", "mataji-havan-2025" -> "Mataji Havan 2025". */
function titleFromFolder(name: string): string {
  return name
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Insert a transformation into a Cloudinary delivery URL. */
function withTransform(secureUrl: string, transform: string): string {
  return secureUrl.replace('/upload/', `/upload/${transform}/`);
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
	try {
		const assetPathPrefix = process.env.CLOUDINARY_ASSET_PREFIX;
		const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
		const apiSecret = process.env.CLOUDINARY_API_SECRET;
		const apiKey = process.env.CLOUDINARY_API_KEY;

		if (!assetPathPrefix || !cloudName || !apiKey || !apiSecret) {
			throw new Error('Missing required env variables!');
		}

		// Remove leading and trailing quotes from API credentials if present
		const cleanApiKey = apiKey.replace(/^["']|["']$/g, '');
		const cleanApiSecret = apiSecret.replace(/^["']|["']$/g, '');
		const cleanAssetPathPrefix = assetPathPrefix.replace(/^["']|["']$/g, '');

		const authHeader = `Basic ${Buffer.from(`${cleanApiKey}:${cleanApiSecret}`).toString('base64')}`;
		const searchUrl = `${CLOUDINARY_BASE_URL}/${cloudName}/${CLOUDINARY_SEARCH_ENDPOINT}`;

		const search = async (expression: string) => {
			const res = await fetch(searchUrl, {
				method: 'POST',
				headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
				body: JSON.stringify({
					expression,
					max_results: 1,
					sort_by: [{ created_at: 'desc' }],
				}),
			});
			if (!res.ok) {
				console.warn(`Cloudinary search failed for "${expression}": ${res.status}`);
				return null;
			}
			return res.json();
		};

		// Get subfolders under the asset path prefix
		const foldersUrl = `${CLOUDINARY_BASE_URL}/${cloudName}/folders/${cleanAssetPathPrefix}`;
		const foldersResponse = await fetch(foldersUrl, {
			method: 'GET',
			headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
		});

		if (!foldersResponse.ok) {
			const errorText = await foldersResponse.text();
			console.error(`Cloudinary folders API error: ${foldersResponse.status} ${foldersResponse.statusText}`, errorText);
			throw new Error(`Cloudinary folders API error: ${foldersResponse.status} ${foldersResponse.statusText}`);
		}

		const foldersResult = await foldersResponse.json();
		const subfolders: { name: string; path: string }[] = foldersResult.folders || [];

		// One round trip per folder for the total count, and one restricted to
		// images for the cover — some albums lead with a video, which cannot be
		// used as a thumbnail.
		const albums: GalleryAlbum[] = (
			await Promise.all(
				subfolders.map(async (folder) => {
					const [all, firstImage] = await Promise.all([
						search(`folder:${folder.path}`),
						search(`folder:${folder.path} AND resource_type:image`),
					]);

					const cover = firstImage?.resources?.[0];

					return {
						id: folder.name,
						title: titleFromFolder(folder.name),
						coverImage: cover?.secure_url
							? withTransform(cover.secure_url, COVER_TRANSFORM)
							: null,
						imagesLength: all?.total_count ?? 0,
						updatedAt: all?.resources?.[0]?.created_at ?? null,
					};
				}),
			)
		)
			// Empty folders would render as broken cards.
			.filter((album) => album.imagesLength > 0)
			// Newest album first; folders with no date sort last.
			.sort((a, b) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? ''));

		console.log(`Successfully fetched ${albums.length} albums under ${assetPathPrefix}`);

		return response.status(200).json({
			albums,
			done: true
		});
	} catch (error) {
		console.error(error);
		return response.status(400).json({
			error: 'Something went wrong!',
			ok: false
		});
	}
}
