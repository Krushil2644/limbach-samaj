import dotenv from 'dotenv';

dotenv.config();

export const config = {
	cloudinary: {
		cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
		apiKey: process.env.CLOUDINARY_API_KEY ?? '',
		apiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
		assetPrefix: process.env.CLOUDINARY_ASSET_PREFIX ?? ''
	},
	smtp: {
		username: process.env.SMTP_USERNAME,
		password: process.env.SMTP_PASSWORD,
		host: 'smtp.gmail.com',
		port: 587
	}
}
