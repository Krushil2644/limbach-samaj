import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(request: VercelRequest, response: VercelResponse) {
  try {
    return response.status(200).json({
      body: `Hello from test`,
      albumName: request.query.album
    }); 
  } catch (error) {
    return response.status(400).json({
      error: 'Something went wrong!',
      ok: false
    })
  }
}