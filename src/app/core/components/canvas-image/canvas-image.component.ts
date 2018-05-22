import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ci-canvas-image',
  templateUrl: './canvas-image.component.html',
  styleUrls: ['./canvas-image.component.css']
})
export class CanvasImageComponent implements OnInit, AfterViewInit {
  @Input() srcBlob: Blob;
  @Input() width: number | 'auto' = 'auto';
  @Input() height: number | 'auto' = 'auto';
  @Input() cover = false;

  @ViewChild('imgCanvas') canvasRef: ElementRef;
  private canvas: HTMLCanvasElement;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.draw();
  }

  private draw() {
    this.canvas = this.canvasRef.nativeElement;
    const ctx = this.canvas.getContext('2d');

    const worker = new Worker('../assets/js-workers/bitmap-worker.js');

    worker.postMessage({ blob: this.srcBlob, width: this.width, height: this.height });

    worker.onmessage = (e) => {
      worker.terminate();
      const bitmap = e.data.bitmap;
      const w = this.width  === 'auto' ? bitmap.width : this.width;
      const h = this.height === 'auto' ? bitmap.height : this.height;
      ctx.canvas.width = w;
      ctx.canvas.height = h;
      if (this.cover) {
        this.drawCover(ctx, bitmap, 0, 0, w, h);
      } else {
        ctx.drawImage(bitmap, 0, 0, w, h);
      }
    };
  }

  private drawCover(
    ctx: CanvasRenderingContext2D,
    bitmap: ImageBitmap,
    x: number = 0,
    y: number = 0,
    w: number = ctx.canvas.width,
    h: number = ctx.canvas.height,
    offsetX: number = 0.5,
    offsetY: number = 0.5
  ) {
    if (offsetX < 0) {
      offsetX = 0;
    }
    if (offsetX > 1) {
      offsetX = 1;
    }
    if (offsetY < 0) {
      offsetY = 0;
    }
    if (offsetY > 1) {
      offsetY = 1;
    }

    const iw = bitmap.width;
    const ih = bitmap.height;
    const r = Math.min(w / iw, h / ih);
    let nw = iw * r;
    let nh = ih * r;
    let ar = 1;
    let cx, cy, cw, ch;

     /// decide which gap to fill
    if (nw < w) {
      ar = w / nw;
    }
    if (nh < h) {
      ar = h / nh;
    }
    nw *= ar;
    nh *= ar;

    /// calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    /// make sure source rectangle is valid
    if (cx < 0) {
      cx = 0;
    }
    if (cy < 0) {
      cy = 0;
    }
    if (cw > iw) {
      cw = iw;
    }
    if (ch > ih) {
      ch = ih;
    }

    /// fill image in dest. rectangle
    ctx.drawImage(bitmap, cx, cy, cw, ch,  x, y, w, h);
  }
}
