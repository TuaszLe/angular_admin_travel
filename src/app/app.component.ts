import { Component } from '@angular/core';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
// import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { Router, NavigationEnd } from '@angular/router'; // Import Router và NavigationEnd
import { filter } from 'rxjs'; // Import filter từ rxjs
import { CommonModule } from '@angular/common';  // Import CommonModule để sử dụng *ngIf


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,SidebarComponent, RouterModule, HttpClientModule], // Import SidebarComponent và RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin-travel';
  showSidebar = true;  // Biến để kiểm soát sidebar

  constructor(private router: Router) {
    // Lắng nghe sự kiện thay đổi đường dẫn
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  // Lọc sự kiện NavigationEnd
    ).subscribe(() => {
      // Kiểm tra URL và ẩn sidebar nếu trang là login hoặc register
      if (this.router.url === '/auth/login' || this.router.url === '/auth/register') {
        this.showSidebar = false;  // Ẩn sidebar
      } else {
        this.showSidebar = true;   // Hiển thị sidebar
      }
    });
  }
}