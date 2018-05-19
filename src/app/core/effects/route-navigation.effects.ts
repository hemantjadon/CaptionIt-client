import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { map, tap } from 'rxjs/operators';
import * as layoutActions from '../actions/layout.actions';
import { CustomRouterStateSnapshot } from '../../shared/utils';

@Injectable()
export class RouteNavigationEffects {

  constructor(private actions$: Actions) {}

  @Effect()
  syncViewModeEffect$ = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    map((
      action: RouterNavigationAction<CustomRouterStateSnapshot>
    ) => action.payload),
    map(payload => payload.routerState.data.view),
    map(view => {
      if (view === 'camera') {
        return new layoutActions.SwitchToCameraView();
      } else if (view === 'gallery') {
        return new layoutActions.SwitchToGalleryView();
      }
    })
  );
}
