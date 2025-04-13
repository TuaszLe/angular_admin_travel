import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // Import RouterModule


@Component({
  selector: 'app-register',
  standalone: true, // ✅ Component độc lập
  imports: [FormsModule, RouterModule], // Thêm RouterModule vào đây
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  email: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Mật khẩu xác nhận không khớp!';
      return;
    }

    const newUser = { username: this.username, password: this.password, email: this.email };
    localStorage.setItem(this.username, JSON.stringify(newUser));

    this.router.navigate(['/login']); // ✅ Chuyển đến trang login sau khi đăng ký
  }

  onSubmit() {
    console.log('Đăng ký với:', this.username, this.email, this.password);
  }
}
