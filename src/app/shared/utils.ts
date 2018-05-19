import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateSnapshot, Params, Data } from '@angular/router';

export interface CustomRouterStateSnapshot {
  url: string;
  params: Params;
  queryParams: Params;
  data: Data;
}

export class CustomRouterStateSerializer
  implements RouterStateSerializer<CustomRouterStateSnapshot> {
  serialize(routerState: RouterStateSnapshot): CustomRouterStateSnapshot {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params, data } = route;

    return { url, params, queryParams, data };
  }
}
