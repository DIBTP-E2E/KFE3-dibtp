export interface ImageUploadResponse {
  images: UploadedImage[];
}

export interface UploadedImage {
  url: string;
  filename?: string;
  size?: number;
}
