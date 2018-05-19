import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RouteNavigationEffects } from './route-navigation.effects';

describe('Core/effects/RouteNavigationService', () => {
  let actions$: Observable<any>;
  let effects: RouteNavigationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RouteNavigationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(RouteNavigationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
