import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { canvasToBlob } from '../../../shared/utils';
import * as fromRoot from '../../../reducers';
import * as fromCamera from '../../reducers/camera.reducer';
import * as coreCameraActions from '../../../core/actions/camera.actions';

@Component({
  selector: 'ci-camera',
  templateUrl: './camera-root.component.html',
  styleUrls: ['./camera-root.component.css']
})
export class CameraRootComponent implements OnInit, OnDestroy {
  doCapture$: Observable<boolean>;
  captureSubscription: Subscription;

  @ViewChild('videoEl') videoRef: ElementRef;

  private videoEl: HTMLVideoElement;
  private offScreenCanvas: HTMLCanvasElement = document.createElement('canvas');

  stream: MediaStream;
  track: MediaStreamTrack;
  streaming = false;

  captured: boolean;
  capturedBlob: Blob;

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.doCapture$ = this.store.pipe(select(fromCamera.getDoCapture));
    this.videoEl = this.videoRef.nativeElement;

    this.captureSubscription =
      this.doCapture$.subscribe(doCapture => {
        if (doCapture) {
          this.capture();
        } else {
          this.startMedia();
        }
      });

  }

  ngOnDestroy() {
    if (this.capturedBlob) {
      this.store.dispatch(new coreCameraActions.CaptureImageFailAction());
    }
    if (this.stream) {
      this.stopStream();
    }
    this.captureSubscription.unsubscribe();
  }

  private async startMedia() {
    await this.startStream();
    this.setupVideo();
  }

  private async startStream() {
    this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    this.track = this.stream.getVideoTracks()[0];
  }

  private stopStream() {
    if (this.stream) {
      this.stream.getVideoTracks().forEach(track => {
        track.stop();
      });
    }
    this.stream = undefined;
    this.track = undefined;
    this.streaming = false;
  }

  private setupVideo() {
    this.videoEl.srcObject = this.stream;
    this.videoEl.play();
    this.videoEl.addEventListener('canplay', () => { this.streaming = true; }, false);
  }

  private async capture(): Promise<Blob> {
    let blob: Blob;
    if ('ImageCapture' in self) {
      const capture = new ImageCapture(this.track);
      blob = await capture.takePhoto();
    } else {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width = this.videoEl.videoWidth;
      const height = this.videoEl.videoHeight;
      canvas.setAttribute('width', width.toString());
      canvas.setAttribute('height', height.toString());
      ctx.drawImage(this.videoEl, 0, 0);
      blob = await canvasToBlob(canvas, 'image/jpeg');
    }
    this.videoEl.pause();
    this.stopStream();
    this.captured = true;
    this.capturedBlob = blob;
    this.store.dispatch(new coreCameraActions.CaptureImageWaitToConfirmAction(this.capturedBlob));
    return Promise.resolve(blob);
  }
 }
