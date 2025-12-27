import type { VercelRequest, VercelResponse } from '@vercel/node';
import { v2 as cloudinary } from 'cloudinary';

export default function handler(request: VercelRequest, response: VercelResponse) {
  try {
    const albumName = request.query?.album;

    if (!albumName) {
      throw new Error('No album name passed');
    }

    const cloudinaryInstance = cloudinary.config({
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME
    });
    
    // const images = 

    return response.status(200).json({
      body: `Hello from asdsdzxs`,
      albumName: request.query.album
    });
  } catch (error) {
    console.error(error);
    return response.status(400).json({
      error: 'Something went wrong!',
      ok: false
    })
  }
}