import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



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
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      // Gửi yêu cầu GET để lấy thông tin danh mục từ API
      this.http.get<any>(`http://localhost:8080/categories/${categoryId}`).subscribe(
        (response) => {
          this.category = response; // Cập nhật thông tin danh mục
        },
        (error) => {
          console.error('Error fetching category', error);
        }
      );
    }
  }

  // Hàm lưu danh mục đã sửa
  saveCategory() {
    // Dữ liệu danh mục mới cần sửa
    const updatedCategory = {
      id: this.category.id,
      name: this.category.name
    };

    // Gửi yêu cầu PUT đến API để cập nhật danh mục
    this.http.post('http://localhost:8080/categories/admin/add', updatedCategory)
      .subscribe(
        (response) => {
          console.log('Category updated successfully', response);
          this.router.navigate(['/admin/categories']); // Quay lại trang danh sách danh mục
        },
        (error) => {
          console.error('Error updating category', error);
        }
      );
  }
}