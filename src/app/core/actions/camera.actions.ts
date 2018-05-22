import { Action } from '@ngrx/store';

export enum CameraActionTypes {
  CAPTURE_IMAGE = '[Camera Capture] Capture Image',
  CAPTURE_IMAGE_WAIT_TO_CONFIRM = '[Camera Capture] Capture Image Wait To Confirm',
  CAPTURE_IMAGE_SUCCESS = '[Camera Capture] Capture Image Success',
  CAPTURE_IMAGE_FAIL = '[Camera Capture] Capture Image Fail'
}

export class CaptureImageAction implements Action {
  readonly type = CameraActionTypes.CAPTURE_IMAGE;
}

export class CaptureImageWaitToConfirmAction implements Action {
  readonly type = CameraActionTypes.CAPTURE_IMAGE_WAIT_TO_CONFIRM;

  constructor(
    public blob: Blob
  ) { }
}

export class CaptureImageSuccessAction implements Action {
  readonly type = CameraActionTypes.CAPTURE_IMAGE_SUCCESS;
}

export class CaptureImageFailAction implements Action {
  readonly type = CameraActionTypes.CAPTURE_IMAGE_FAIL;
}

export type CameraActions
  = CaptureImageAction
  | CaptureImageWaitToConfirmAction
  | CaptureImageSuccessAction
  | CaptureImageFailAction;
