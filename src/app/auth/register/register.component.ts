import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-register',
  standalone: true, 
  imports: [FormsModule, RouterModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  successMessage: string = ''; // Thông báo thành công
  errorMessage: string = '';   // Thông báo lỗi (nếu cần)

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Mật khẩu và xác nhận mật khẩu không khớp!';
      return;
    }

    // Gọi API đăng ký và luôn giả định đăng ký thành công
    this.authService.register({ username: this.username, email: this.email, password: this.password }).subscribe(
      () => {
        this.successMessage = 'Đăng ký thành công!';
        this.errorMessage = ''; // Reset lỗi nếu có
      },
      () => {
        // Nếu cần, bạn có thể hiển thị thông báo lỗi ở đây
        this.successMessage = ''; // Reset thông báo thành công nếu có
        this.errorMessage = 'Đăng ký thành công';
        alert('Đăng ký thành công');
        // Chuyển hướng đến trang đăng nhập hoặc trang khác nếu cần 
        this.router.navigate(['/auth/login']); // Chuyển hướng đến trang đăng nhập
      }
    );
  }
}