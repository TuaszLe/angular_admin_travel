import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';  // Import Leaflet
import 'leaflet-control-geocoder'; // tìm kiếm


@Component({
  selector: 'app-locations-add',
  standalone: true,
  templateUrl: './locations-add.component.html',
  styleUrls: ['./locations-add.component.css'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class LocationsAddComponent implements OnInit, AfterViewInit {
  location = {
    name: '',
    description: '',
    latitude: null,
    longitude: null,
    province: null,
    categories: [] as any[]
  };

  imageUrls: string = ''; // <<=== Thêm biến này để nhập link ảnh

  provinces: any[] = [];
  categories: any[] = [];

  private map: any;
  private marker: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Lấy danh sách tỉnh
    this.http.get<any[]>('http://localhost:8080/locations').subscribe(
      (response) => {
        this.provinces = response.map(location => location.province);
        this.provinces = Array.from(new Set(this.provinces.map(a => a.id)))
                              .map(id => this.provinces.find(a => a.id === id));
      },
      (error) => console.error('Error fetching provinces', error)
    );

    // Lấy danh sách các danh mục
    this.http.get<any[]>('http://localhost:8080/categories').subscribe(
      (response) => {
        this.categories = response.map(category => ({
          ...category,
          selected: false
        }));
      },
      (error) => console.error('Error fetching categories', error)
    );
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map').setView([21.0285, 105.8542], 13);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  
    // 👇 Tìm kiếm địa điểm
    // @ts-ignore
    L.Control.geocoder({
      defaultMarkGeocode: true
    })
      .on('markgeocode', (e: any) => {
        const center = e.geocode.center;
        this.map.setView(center, 15);
  
        if (this.marker) {
          this.marker.setLatLng(center);
        } else {
          this.marker = L.marker(center).addTo(this.map);
        }
  
        this.location.latitude = center.lat;
        this.location.longitude = center.lng;
      })
      .addTo(this.map);
  
    // 👇 Người dùng click vào bản đồ để chọn vị trí
    this.map.on('click', (e: any) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
  
      if (this.marker) {
        this.marker.setLatLng([lat, lng]);
      } else {
        this.marker = L.marker([lat, lng]).addTo(this.map);
      }
  
      this.location.latitude = lat;
      this.location.longitude = lng;
    });
  }
  
  

  saveLocation() {
    if (this.location.categories.length === 0) {
      alert("Vui lòng chọn ít nhất một danh mục!");
      return;
    }

    const imageList = this.imageUrls
      .split('\n')
      .map(url => url.trim())
      .filter(url => url !== '')
      .map(url => ({
        id: null,
        image_url: url
      }));

    const newLocation = {
      location: {
        id: null,
        name: this.location.name,
        description: this.location.description,
        latitude: this.location.latitude,
        longitude: this.location.longitude,
        province: this.location.province,
        categories: this.location.categories.map(c => ({ id: c.id, name: c.name }))
      },
      images: imageList
    };

    console.log('Dữ liệu gửi đi:', newLocation);

    this.http.post('http://localhost:8080/locations/admin/add', newLocation)
      .subscribe(
        (response) => {
          console.log('Thêm thành công:', response);
          this.router.navigate(['/admin/locations']);
        },
        (error) => {
          console.error('Lỗi khi thêm địa điểm:', error);
        }
      );
  }
}
