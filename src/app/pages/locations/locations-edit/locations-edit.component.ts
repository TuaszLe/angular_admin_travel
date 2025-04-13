import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

declare var Goong: any; // Khai báo GoongMap

@Component({
  selector: 'app-locations-edit',
  standalone: true,
  templateUrl: './locations-edit.component.html',
  styleUrls: ['./locations-edit.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LocationsEditComponent implements OnInit {
  location = {
    id: 1,
    name: 'Vịnh Hạ Long',
    description: 'Vịnh Hạ Long là một trong những danh lam thắng cảnh nổi tiếng của Việt Nam.',
    image: 'https://example.com/halong.jpg',
    latitude: 20.9711,
    longitude: 107.0448,
    province: '3',
    category: '1'
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadMap();
  }

  loadMap(): void {
    // Tạo bản đồ GoongMap
    const map = new Goong.Map({
      container: 'map', // ID của div chứa bản đồ
      center: [this.location.longitude, this.location.latitude], // Vị trí ban đầu
      zoom: 15
    });

    // Tạo marker tại vị trí hiện tại của địa điểm
    const marker = new Goong.Marker()
      .setLngLat([this.location.longitude, this.location.latitude])
      .addTo(map);

    // Cập nhật tọa độ khi người dùng kéo marker
    marker.on('dragend', (event: any) => {
      const newLat = event.target.getLngLat().lat;
      const newLng = event.target.getLngLat().lng;
      this.location.latitude = newLat;
      this.location.longitude = newLng;

      // Cập nhật lại giá trị trong các input
      (<HTMLInputElement>document.getElementById('latitude')).value = newLat.toString();
      (<HTMLInputElement>document.getElementById('longitude')).value = newLng.toString();
    });
  }

  saveLocation() {
    console.log('Location updated', this.location);
    this.router.navigate(['/admin/locations']);
  }
}
