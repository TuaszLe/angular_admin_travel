import { TestBed } from '@angular/core/testing';

import { LocationService } from '../services/location.service';  // Đảm bảo đúng đường dẫn đến .import { NgModule } from '@angular/core';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
