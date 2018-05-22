import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { IdbGalleryEffects } from './idb-gallery.effects';

describe('Gallery/effects/IdbGalleryService', () => {
  let actions$: Observable<any>;
  let effects: IdbGalleryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IdbGalleryEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(IdbGalleryEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
