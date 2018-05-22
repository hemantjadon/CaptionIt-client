import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { IDBImageService } from '../services/idb-image.service';
import * as idbImageActions from '../actions/idb-image.actions';
import { ImageSchema } from '../../shared/schema/image';

@Injectable()
export class IDBImageEffects {

  @Effect()
  storeImageEffect$: Observable<Action> =
    this.actions$.pipe(
      ofType(idbImageActions.IDBImageActionTypes.STORE_IMAGE_DATA),
      map((action: idbImageActions.StoreImageData) => action.image),
      mergeMap((image: ImageSchema) => {
        return this.idbImg.add(image)
          .then((id: IDBValidKey) => {
            console.log(id);
            return new idbImageActions.StoreImageDataSuccess(id);
          })
          .catch(error => {
            console.error(error);
            return new idbImageActions.StoreImageDataFail();
          });
      })
    );

  constructor(
    private actions$: Actions,
    private idbImg: IDBImageService
  ) {}
}
