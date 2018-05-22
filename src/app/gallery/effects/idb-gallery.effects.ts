import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { IDBImageService } from '../../core/services/idb-image.service';
import { ImageSchema } from '../../shared/schema/image';
import * as idbGalleryActions from '../actions/idb-gallery.actions';
import * as idbImageActions from '../../core/actions/idb-image.actions';


@Injectable()
export class IDBGalleryEffects {

  @Effect()
  loadGalleryData$: Observable<Action> =
    this.actions$.pipe(
      ofType(idbGalleryActions.IDBGalleryActionTypes.LOAD_GALLERY_DATA),
      mergeMap(action => {
        return this.idbImg.getAll()
          .then(images => new idbGalleryActions.LoadGalleryDataSuccess(images))
          .catch(error => {
            console.error(error);
            return new idbGalleryActions.LoadGalleryDataFail();
          });
      })
    );

  @Effect()
  reloadGalleryDataOnNewImage$: Observable<Action> =
    this.actions$.pipe(
      ofType(idbImageActions.IDBImageActionTypes.STORE_IMAGE_DATA_SUCCESS),
      map((action: idbImageActions.StoreImageDataSuccess) => action.id),
      map(id => new idbGalleryActions.LoadGalleryData())
    );


  constructor(
    private actions$: Actions,
    private idbImg: IDBImageService
  ) {}
}
