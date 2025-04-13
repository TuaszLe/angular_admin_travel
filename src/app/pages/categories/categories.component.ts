import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  imports: [CommonModule, RouterModule]
})
export class CategoriesComponent {
  categories = [
    { id: 1, name: 'Bãi biển' },
    { id: 2, name: 'Núi rừng' },
    { id: 3, name: 'Du lịch tâm linh' }
  ];

  deleteCategory(id: number) {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa danh mục này?');
    if (confirmDelete) {
      this.categories = this.categories.filter(category => category.id !== id);
      console.log('Deleted category with id:', id);
    }
  }
}
