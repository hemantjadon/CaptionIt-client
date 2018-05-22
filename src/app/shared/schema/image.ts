export interface ImageSchema {
  timestamp: Date;
  image: Blob;
  caption: string;
  type: 'captured' | 'uploaded' | 'loaded';
}
