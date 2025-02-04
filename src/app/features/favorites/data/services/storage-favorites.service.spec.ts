import { TestBed } from '@angular/core/testing';

import { StorageFavoritesService } from './storage-favorites.service';

describe('StorageFavoritesService', () => {
  let service: StorageFavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageFavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
