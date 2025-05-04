import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';  // Đảm bảo đúng đường dẫn đến .import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // Đảm bảo đã import HttpClientModule


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule  // Đảm bảo đã import HttpClientModule
  ],
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  locations: any[] = [];
  errorMessage: string = '';  // Để lưu lỗi từ API

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.fetchLocations();
  }

  // Phương thức lấy dữ liệu địa điểm
  fetchLocations(): void {
    this.locationService.getLocations().subscribe({
      next: (data: any[]) => {
        console.log("Data received from API:", data);  // Kiểm tra dữ liệu trả về
        this.locations = data;
      },
      error: (err) => {
        console.error("Error fetching data:", err);  // Kiểm tra lỗi từ API
        this.errorMessage = err.message;
      }
    });
  }

  // Phương thức xóa địa điểm
  deleteLocation(id: number): void {
    if (!confirm('Bạn có chắc muốn xoá địa điểm này?')) return;
  
    this.locationService.deleteLocation(id).subscribe({
      next: () => {
        // Xoá thành công thì cập nhật danh sách
        this.locations = this.locations.filter(location => location.id !== id);
        console.log(`Đã xoá địa điểm ID: ${id}`);
      },
      error: (err) => {
        console.error('Lỗi khi xoá địa điểm:', err);
        this.errorMessage = 'Không thể xoá địa điểm. Vui lòng thử lại.';
      }
    });
  }
  
}
