import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // Đường dẫn đến AuthService

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = ''; // Thêm thông báo lỗi

  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    // Ẩn sidebar khi vào trang đăng nhập
    document.body.classList.add('no-sidebar'); // Thêm class cho body để ẩn sidebar
  }
  onSubmit() {
    // Kiểm tra thông tin người dùng không được để trống
    if (!this.username || !this.password) {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin đăng nhập';
      return;
    }

    // Gọi API login
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          // Lưu token vào localStorage nếu đăng nhập thành công
          localStorage.setItem('token', res.token);
          alert('Đăng nhập thành công!');
          this.router.navigate(['/admin/locations']); // Điều hướng đến admin/locations sau khi đăng nhập thành công
        },
        error: (err) => {
          // Xử lý lỗi khi đăng nhập thất bại
          console.error('Lỗi đăng nhập:', err);
          this.errorMessage = 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.';
        }
      });
  }
}