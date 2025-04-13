import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories-edit',
  standalone: true,
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css'],
  imports: [FormsModule]
})
export class CategoriesEditComponent implements OnInit {
  category = { id: 0, name: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      // Lấy thông tin danh mục từ API hoặc dịch vụ dựa trên categoryId
      this.category = { id: +categoryId, name: 'Tên danh mục cũ' }; // Thay thế bằng dữ liệu thực tế
    }
  }

  saveCategory() {
    console.log('Đã sửa danh mục:', this.category.name);
    this.router.navigate(['/admin/categories']);  // Điều hướng về trang quản lý danh mục
  }
}
