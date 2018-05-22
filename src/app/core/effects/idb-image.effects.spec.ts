import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { IDBImageEffects } from './idb-image.effects';

describe('IDBImageService', () => {
  let actions$: Observable<any>;
  let effects: IDBImageEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IDBImageEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(IDBImageEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
