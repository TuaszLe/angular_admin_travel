import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories-add',
  standalone: true,
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.css'],
  imports: [FormsModule]  // Thêm FormsModule vào mảng imports
})
export class CategoriesAddComponent {
  category = { name: '' };

  constructor(private router: Router) {}

  saveCategory() {
    console.log('Đã thêm danh mục:', this.category.name);
    
    // Thêm danh mục vào danh sách (hoặc gọi API để lưu vào cơ sở dữ liệu)
    this.router.navigate(['/admin/categories']);  // Điều hướng về trang quản lý danh mục
  }
}
