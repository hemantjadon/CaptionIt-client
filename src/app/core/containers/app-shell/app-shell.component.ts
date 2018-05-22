import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ImageSchema } from '../../../shared/schema/image';
import { ImageConvertService } from '../../services/image-convert.service';
import * as fromRoot from '../../../reducers';
import * as fromLayout from '../../reducers/layout.reducer';
import * as fromCamera from '../../reducers/camera.reducer';
import * as layoutActions from '../../actions/layout.actions';
import * as idbImageActions from '../../actions/idb-image.actions';
import * as cameraActions from '../../actions/camera.actions';

@Component({
  selector: 'ci-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.css']
})
export class AppShellComponent implements OnInit {
  viewMode$: Observable<fromLayout.ViewMode>;
  isCapturing$: Observable<boolean>;
  captured$: Observable<{ status: boolean, blob: Blob }>;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private store: Store<fromRoot.State>,
    private imgConvert: ImageConvertService
  ) { }

  ngOnInit() {
    this.viewMode$ = this.store.pipe(select(fromLayout.getViewMode));
    this.isCapturing$ = this.store.pipe(select(fromCamera.getIsCapturing));
    this.captured$ = this.store.pipe(select(fromCamera.getCaptured));
  }

  handleCaptureImage(event) {
    this.store.dispatch(new cameraActions.CaptureImageAction());
  }

  handleUploadImage(event) {
    this.fileInput.nativeElement.click();
  }

  async fileChange(event) {
    const files = event.target.files;

    for (const file of files) {
      if (!file.type.match('image.*')) {
        continue;
      }

      const serializedImage = await this.imgConvert.fileToSchema(file);

      this.store.dispatch(new idbImageActions.StoreImageData(serializedImage));
    }
  }

  async handleSaveImage(event) {
    this.captured$.subscribe(async (captured) => {
      const serializedImage = await this.imgConvert.blobToSchema(captured.blob);
      this.store.dispatch(new idbImageActions.StoreImageData(serializedImage));
      this.store.dispatch(new cameraActions.CaptureImageSuccessAction());
    }).unsubscribe();
  }

  handleDiscardImage(event) {
    this.store.dispatch(new cameraActions.CaptureImageFailAction());
  }
}
