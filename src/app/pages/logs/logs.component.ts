import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logs',
  standalone: true,
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
  imports: [CommonModule]
})
export class LogsComponent implements OnInit {
  logs = [
    { id: 1, admin: 'admin01', action: 'Thêm địa điểm mới', timestamp: '2025-03-30 14:30:00' },
    { id: 2, admin: 'admin02', action: 'Xóa danh mục', timestamp: '2025-03-30 15:00:00' }
  ];

  ngOnInit(): void {
    // Ở đây bạn có thể gọi dịch vụ để lấy dữ liệu logs từ API
  }
}
