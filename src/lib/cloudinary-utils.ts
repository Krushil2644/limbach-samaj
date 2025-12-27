import { cloudinaryClient, type CloudinaryImage } from '@/lib/cloudinary';

/**
 * Utility function to fetch images from a Cloudinary directory
 * @param directoryId - The directory ID (e.g., 'Limbac-Samaj-Assets/album-1')
 * @param options - Additional fetch options
 * @returns Promise<CloudinaryImage[]> - Array of images
 */
export async function fetchImagesByDirectory(directoryId: string, options = {}) {
  return await cloudinaryClient.fetchImagesByDirectory(directoryId, options);
}

/**
 * Utility function to check if a directory exists and has images
 * @param directoryId - The directory ID to check
 * @returns Promise<boolean> - True if directory exists and has images
 */
export async function directoryExists(directoryId: string) {
  return await cloudinaryClient.directoryExists(directoryId);
}

/**
 * Utility function to get the count of images in a directory
 * @param directoryId - The directory ID
 * @returns Promise<number> - Number of images in the directory
 */
export async function getImageCount(directoryId: string) {
  return await cloudinaryClient.getImageCount(directoryId);
}

/**
 * Utility function to upload an image to a Cloudinary directory
 * @param file - The file to upload
 * @param directoryId - The directory to upload to
 * @param options - Additional upload options
 * @returns Promise<CloudinaryImage> - The uploaded image data
 */
export async function uploadImage(file: File | string, directoryId: string, options = {}) {
  return await cloudinaryClient.uploadImage(file, directoryId, options);
}

/**
 * Utility function to delete an image from Cloudinary
 * @param publicId - The public ID of the image to delete
 * @returns Promise<any> - The deletion result
 */
export async function deleteImage(publicId: string) {
  return await cloudinaryClient.deleteImage(publicId);
}