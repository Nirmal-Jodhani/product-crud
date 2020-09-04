import { TestBed } from '@angular/core/testing';

import { ProductNodejsService } from './product-nodejs.service';

describe('ProductNodejsService', () => {
  let service: ProductNodejsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductNodejsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
