import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';  // Đảm bảo import đúng CategoryService

describe('CategoryService', () => {  // Thay 'LocationService' thành 'CategoryService'
  let service: CategoryService;  // Thay 'LocationService' thành 'CategoryService'

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryService);  // Sửa lại đối tượng service
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
