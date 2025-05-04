import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';  // Import CategoryService
// import { Category } from './category.model';  // Đảm bảo bạn đã tạo model Category
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-categories',
  standalone: true,
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  imports: [CommonModule, RouterModule]
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Lấy danh sách danh mục từ API
    this.http.get<any[]>('http://localhost:8080/categories').subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  // Hàm xóa danh mục
  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.http.delete(`http://localhost:8080/categories/admin/delete/${id}`).subscribe(
        () => {
          console.log('Category deleted');
          this.categories = this.categories.filter(category => category.id !== id); // Xóa khỏi danh sách frontend
        },
        (error) => {
          console.error('Error deleting category', error);
        }
      );
    }
  }
}