import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  SWITCH_TO_GALLERY = '[Layout Change View] Switch To Gallery',
  SWITCH_TO_CAMERA = '[Layout Change View] Switch To Camera'
}

export class SwitchToGalleryView implements Action {
  readonly type = LayoutActionTypes.SWITCH_TO_GALLERY;
}

export class SwitchToCameraView implements Action {
  readonly type = LayoutActionTypes.SWITCH_TO_CAMERA;
}

export type LayoutActions = SwitchToGalleryView | SwitchToCameraView;
