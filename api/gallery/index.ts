import type { VercelRequest, VercelResponse } from '@vercel/node';
import dotenv from 'dotenv';

dotenv.config();

const CLOUDINARY_BASE_URL = `https://api.cloudinary.com/v1_1`;
const CLOUDINARY_SEARCH_ENDPOINT = `resources/search`;

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

		// Get subfolders under the asset path prefix
		const foldersUrl = `${CLOUDINARY_BASE_URL}/${cloudName}/folders/${cleanAssetPathPrefix}`;
		const foldersResponse = await fetch(foldersUrl, {
			method: 'GET',
			headers: {
				Authorization: `Basic ${Buffer.from(`${cleanApiKey}:${cleanApiSecret}`).toString("base64")}`,
				'Content-Type': 'application/json',
			},
		});

		if (!foldersResponse.ok) {
			const errorText = await foldersResponse.text();
			console.error(`Cloudinary folders API error: ${foldersResponse.status} ${foldersResponse.statusText}`, errorText);
			throw new Error(`Cloudinary folders API error: ${foldersResponse.status} ${foldersResponse.statusText}`);
		}

		const foldersResult = await foldersResponse.json();
		const subfolders = foldersResult.folders || [];

		// For each subfolder, get the count of items
		const albums: Record<string, number> = {};
		for (const folder of subfolders) {
			const searchUrl = `${CLOUDINARY_BASE_URL}/${cloudName}/${CLOUDINARY_SEARCH_ENDPOINT}`;
			const searchParams = new URLSearchParams({
				expression: `folder:${folder.path}`,
				max_results: '1', // We only need the total count
			});

			const searchResponse = await fetch(`${searchUrl}?${searchParams}`, {
				method: 'GET',
				headers: {
					Authorization: `Basic ${Buffer.from(`${cleanApiKey}:${cleanApiSecret}`).toString("base64")}`,
					'Content-Type': 'application/json',
				},
			});

			if (!searchResponse.ok) {
				console.warn(`Failed to get count for folder ${folder.path}: ${searchResponse.status}`);
				albums[folder.name] = 0;
				continue;
			}

			const searchResult = await searchResponse.json();
			albums[folder.name] = searchResult.total_count || 0;
		}

		console.log(`Successfully fetched ${Object.keys(albums).length} albums under ${assetPathPrefix}`);

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
