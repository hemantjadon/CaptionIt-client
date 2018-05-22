import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateSnapshot, Params, Data } from '@angular/router';

export interface CustomRouterStateSnapshot {
  url: string;
  params: Params;
  queryParams: Params;
  data: Data;
}

export class CustomRouterStateSerializer
  implements RouterStateSerializer<CustomRouterStateSnapshot> {
  serialize(routerState: RouterStateSnapshot): CustomRouterStateSnapshot {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params, data } = route;

    return { url, params, queryParams, data };
  }
}

export function dataUrlToArrayBuffer(dataURI: string): ArrayBuffer {
  const byteString = atob(dataURI.split(',')[1]);
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return ia.buffer as ArrayBuffer;
}

export async function canvasToBlob(canvas: HTMLCanvasElement, type: string): Promise<Blob> {
  if (canvas.toBlob) {
    const result: Promise<Blob> = new Promise((resolve) => {
      canvas.toBlob((blob: Blob) => resolve(blob), type);
    });
    return result;
  } else {
    const dataURL = canvas.toDataURL(type);
    const buffer = dataUrlToArrayBuffer(dataURL);
    return new Blob([buffer], {type});
  }
}

export function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', async (e: ProgressEvent) => {
      resolve(reader.result);
    });
    reader.addEventListener('error', reject);
    reader.readAsArrayBuffer(blob);
  });
}
