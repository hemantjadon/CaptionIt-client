import { Action } from '@ngrx/store';
import { ImageSchema } from '../../shared/schema/image';

export enum IDBGalleryActionTypes {
  LOAD_GALLERY_DATA = '[IDB Load Gallery] Load Gallery Data',
  LOAD_GALLERY_DATA_SUCCESS = '[IDB Load Gallery] Load Gallery Data Success',
  LOAD_GALLERY_DATA_FAIL = '[IDB Load Gallery] Load Gallery Data Fail',
}

export class LoadGalleryData implements Action {
  readonly type = IDBGalleryActionTypes.LOAD_GALLERY_DATA;
}

export class LoadGalleryDataSuccess implements Action {
  readonly type = IDBGalleryActionTypes.LOAD_GALLERY_DATA_SUCCESS;

  constructor(
    public images: ImageSchema[]
  ) { }
}

export class LoadGalleryDataFail implements Action {
  readonly type = IDBGalleryActionTypes.LOAD_GALLERY_DATA_FAIL;
}

export type IDBGalleryActions
  = LoadGalleryData
  | LoadGalleryDataSuccess
  | LoadGalleryDataFail;
