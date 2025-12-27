// Cloudinary Client using fetch API for browser compatibility
interface CloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  created_at: string;
}

interface FetchOptions {
  max_results?: number;
  sort_by?: string;
  direction?: 'asc' | 'desc';
}

class CloudinaryClient {
  private config: CloudinaryConfig;

  constructor(config: CloudinaryConfig) {
    this.config = config;
  }

  /**
   * Fetch all images from a specific directory/folder
   * @param directoryId - The directory/folder ID (e.g., 'Limbac-Samaj-Assets/album-1')
   * @param options - Additional fetch options
   * @returns Promise<CloudinaryImage[]> - Array of images in the directory
   */
  async fetchImagesByDirectory(directoryId: string, options: FetchOptions = {}): Promise<CloudinaryImage[]> {
    try {
      console.log(`Fetching images from Cloudinary directory: ${directoryId}`);

      const maxResults = options.max_results || 100;
      const sortBy = options.sort_by || 'created_at';
      const direction = options.direction || 'desc';

      // Use Cloudinary Admin API search endpoint
      const searchUrl = `https://api.cloudinary.com/v1_1/${this.config.cloud_name}/resources/search`;

      const searchParams = new URLSearchParams({
        expression: `folder:${directoryId}`,
        max_results: maxResults.toString(),
        sort_by: `${sortBy}:${direction}`
      });

		console.log(searchUrl, searchParams);
      const response = await fetch(`${searchUrl}?${searchParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(`${this.config.api_key}:${this.config.api_secret}`)}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Cloudinary API error: ${response.status} ${response.statusText}`, errorText);
        throw new Error(`Cloudinary API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (!result.resources || !Array.isArray(result.resources)) {
        console.warn(`No resources found in directory: ${directoryId}`);
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
        created_at: resource.created_at
      }));

      console.log(`Successfully fetched ${images.length} images from directory: ${directoryId}`);
      return images;

    } catch (error) {
      console.error(`Error fetching images from directory ${directoryId}:`, error);
      throw error;
    }
  }

  /**
   * Check if a directory exists and has images
   * @param directoryId - The directory/folder ID to check
   * @returns Promise<boolean> - True if directory exists and has images
   */
  async directoryExists(directoryId: string): Promise<boolean> {
    try {
      const images = await this.fetchImagesByDirectory(directoryId, { max_results: 1 });
      return images.length > 0;
    } catch (error) {
      console.error(`Error checking directory existence for ${directoryId}:`, error);
      return false;
    }
  }

  /**
   * Get the total count of images in a directory
   * @param directoryId - The directory/folder ID
   * @returns Promise<number> - Number of images in the directory
   */
  async getImageCount(directoryId: string): Promise<number> {
    try {
      // Use the search API to get the total count
      const searchUrl = `https://api.cloudinary.com/v1_1/${this.config.cloud_name}/resources/search`;

      const searchParams = new URLSearchParams({
        expression: `folder:${directoryId}`,
        max_results: '0' // Set to 0 to just get the total count
      });

      const response = await fetch(`${searchUrl}?${searchParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(`${this.config.api_key}:${this.config.api_secret}`)}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Cloudinary API error: ${response.status} ${response.statusText}`, errorText);
        throw new Error(`Cloudinary API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result.total_count || 0;
    } catch (error) {
      console.error(`Error getting image count for directory ${directoryId}:`, error);
      return 0;
    }
  }

  /**
   * Upload an image to a specific directory
   * @param file - The file to upload
   * @param directoryId - The directory to upload to
   * @param options - Additional upload options
   * @returns Promise<CloudinaryImage> - The uploaded image data
   */
  async uploadImage(file: File | string, directoryId: string, options: any = {}): Promise<CloudinaryImage> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', directoryId);

      // Add any additional options
      Object.keys(options).forEach(key => {
        formData.append(key, options[key]);
      });

      const uploadUrl = `https://api.cloudinary.com/v1_1/${this.config.cloud_name}/image/upload`;

      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Cloudinary upload error: ${response.status} ${response.statusText}`, errorText);
        throw new Error(`Cloudinary upload error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      return {
        public_id: result.public_id,
        secure_url: result.secure_url,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
        format: result.format,
        created_at: result.created_at
      };
    } catch (error) {
      console.error(`Error uploading image to directory ${directoryId}:`, error);
      throw error;
    }
  }

  /**
   * Delete an image by public ID
   * @param publicId - The public ID of the image to delete
   * @returns Promise<any> - The deletion result
   */
  async deleteImage(publicId: string): Promise<any> {
    try {
      const deleteUrl = `https://api.cloudinary.com/v1_1/${this.config.cloud_name}/resources/image/upload`;

      const response = await fetch(`${deleteUrl}?public_ids=${encodeURIComponent(publicId)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Basic ${btoa(`${this.config.api_key}:${this.config.api_secret}`)}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Cloudinary delete error: ${response.status} ${response.statusText}`, errorText);
        throw new Error(`Cloudinary delete error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error(`Error deleting image ${publicId}:`, error);
      throw error;
    }
  }
}

// Create and export a default instance
const cloudinaryConfig: CloudinaryConfig = {
  cloud_name: 'dft9gtmve',
  api_key: '451822538219224',
  api_secret: 'iDz-ln-rcepBKmxFubZYVzk01P8'
};

export const cloudinaryClient = new CloudinaryClient(cloudinaryConfig);

// Export the class for custom instances
export default CloudinaryClient;

// Export types
export type { CloudinaryImage, CloudinaryConfig, FetchOptions };