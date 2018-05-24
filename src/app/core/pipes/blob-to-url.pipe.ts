import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blobToUrl',
  pure: true
})
export class BlobToUrlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value instanceof Blob) {
      return URL.createObjectURL(value);
    } else {
      throw new Error('BlobToUrlPipe expects the input to be of type blob');
    }
  }

}
