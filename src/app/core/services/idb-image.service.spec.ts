import { TestBed, inject } from '@angular/core/testing';

import { IDBImageService } from './idb-image.service';

describe('IDBImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IDBImageService]
    });
  });

  it('should be created', inject([IDBImageService], (service: IDBImageService) => {
    expect(service).toBeTruthy();
  }));
});
