import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, // Quan trọng để loadComponent hoạt động
  imports: [CommonModule, FormsModule, RouterModule], // Thêm RouterModule vào đây
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onLogin() {
    const storedUser = localStorage.getItem(this.username);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === this.password) {
        this.router.navigate(['/admin/locations']); // Chuyển đến trang admin sau khi đăng nhập
      } else {
        this.errorMessage = 'Mật khẩu không đúng!';
      }
    } else {
      this.errorMessage = 'Tài khoản không tồn tại!';
    }
  }
  onSubmit(): void {
    console.log('Form submitted:', { username: this.username, password: this.password });
  }
}
