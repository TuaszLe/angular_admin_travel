import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories-add',
  standalone: true,
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.css'],
  imports: [FormsModule]  // Thêm FormsModule vào mảng imports
})
export class CategoriesAddComponent implements OnInit {
  category = {
    id: null,
    name: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  // Hàm thêm danh mục
  saveCategory() {
    const requestData = {
      id: null,
      name: this.category.name
    };

    // Gửi yêu cầu POST để thêm danh mục
    this.http.post('http://localhost:8080/categories/admin/add', requestData)
      .subscribe(
        (response) => {
          console.log('Category added successfully', response);
          this.router.navigate(['/admin/categories']); // Chuyển hướng về danh sách danh mục
        },
        (error) => {
          console.error('Error adding category', error);
        }
      );
  }
}