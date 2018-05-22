import { Action } from '@ngrx/store';
import { ImageSchema } from '../../shared/schema/image';

export enum IDBImageActionTypes {
  STORE_IMAGE_DATA = '[IDB Store Image] Store Image Data',
  STORE_IMAGE_DATA_SUCCESS = '[IDB Store Image] Store Image Data Success',
  STORE_IMAGE_DATA_FAIL = '[IDB Store Image] Store Image Data Fail',
}

export class StoreImageData implements Action {
  readonly type = IDBImageActionTypes.STORE_IMAGE_DATA;

  constructor(
    public image: ImageSchema
  ) { }
}

export class StoreImageDataSuccess implements Action {
  readonly type = IDBImageActionTypes.STORE_IMAGE_DATA_SUCCESS;

  constructor(
    public id: IDBValidKey
  ) { }
}

export class StoreImageDataFail implements Action {
  readonly type = IDBImageActionTypes.STORE_IMAGE_DATA_FAIL;
}

export type IDBGalleryActions
  = StoreImageData
  | StoreImageDataSuccess
  | StoreImageDataFail;
