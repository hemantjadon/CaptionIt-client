import { Injectable } from '@angular/core';
import { ImageSchema } from '../../shared/schema/image';

@Injectable()
export class ImageConvertService {

  constructor(
  ) { }

  private scaleUrlImage(imgUrl: string, MAX_WIDTH: number, MAX_HEIGHT: number): Promise<Blob> {
    return new Promise<Blob>((resolve: Function, reject: Function) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        let newWidth = img.width;
        let newHeight = img.height;

        if (img.width >= img.height) {
          if (img.width > MAX_WIDTH) {
            newWidth = MAX_WIDTH;
            newHeight = newWidth * (img.height / img.width);
          }
        } else {
          if (img.height > MAX_HEIGHT) {
            newHeight = MAX_HEIGHT;
            newWidth = newHeight * (img.width / img.height);
          }
        }
        ctx.canvas.width = newWidth;
        ctx.canvas.height = newHeight;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        canvas.toBlob((blob) => {
          resolve(blob);
        });
      };

      img.onerror = (err) => reject(err);

      img.src = imgUrl;
    });
  }

  private scaleBlob(blob: Blob, MAX_WIDTH: number, MAX_HEIGHT: number): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      const imgUrl = URL.createObjectURL(blob);
      this.scaleUrlImage(imgUrl, MAX_WIDTH, MAX_HEIGHT)
        .then(b => resolve(b))
        .catch(err => reject(err));
    });
  }

  public async fileToSchema(file): Promise<ImageSchema> {
    return new Promise<ImageSchema>(async (resolve: Function, reject: Function) => {
      const reader = new FileReader();

      reader.onloadend = async (e) => {
        const imageBlob = new Blob([new Uint8Array(reader.result)]);
        const scaledBlob = await this.scaleBlob(imageBlob, 1000, 1000);

        const serializedImage: ImageSchema = {
          image: scaledBlob,
          caption: null,
          type: 'uploaded',
          timestamp: new Date()
        };
        resolve(serializedImage);
      };

      reader.onerror = (err) => reject(err);

      reader.readAsArrayBuffer(file);
    });
  }

  public async blobToSchema(blob: Blob): Promise<ImageSchema> {
    return new Promise<ImageSchema>(async (resolve: Function, reject: Function) => {
      const scaledBlob = await this.scaleBlob(blob, 1000, 1000);

      const serializedImage: ImageSchema = {
        image: scaledBlob,
        caption: null,
        type: 'captured',
        timestamp: new Date()
      };
      resolve(serializedImage);
    });
  }
}
