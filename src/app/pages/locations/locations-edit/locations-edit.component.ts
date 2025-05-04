import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-locations-edit',
  standalone: true,
  templateUrl: './locations-edit.component.html',
  styleUrls: ['./locations-edit.component.css'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class LocationsEditComponent implements OnInit {
  locationId: number | null = null;
  location: any = {
    id: null,
    name: '',
    description: '',
    latitude: null,
    longitude: null,
    province: null,
    categories: []
  };
  imageUrls: string = '';
  provinces: any[] = [];
  categories: any[] = [];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.locationId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.locationId) {
      this.loadLocation(this.locationId);
    }

    this.http.get<any[]>('http://localhost:8080/locations').subscribe(locations => {
      this.provinces = Array.from(
        new Map(locations.map(l => [l.province.id, l.province])).values()
      );
    });

    this.http.get<any[]>('http://localhost:8080/categories').subscribe(categories => {
      this.categories = categories;
    });
  }

  loadLocation(id: number): void {
    this.http.get<any>(`http://localhost:8080/locations/${id}`).subscribe({
      next: (data) => {
        this.location = {
          ...data,
          categories: data.categories.map((cat: any) => ({ id: cat.id, name: cat.name }))
        };
        this.imageUrls = data.images?.map((img: any) => img.image_url).join('\n') || '';
      },
      error: (err) => {
        console.error('Lỗi khi tải địa điểm:', err);
        this.errorMessage = 'Không thể tải dữ liệu địa điểm.';
      }
    });
  }

  saveLocation(): void {
    const imageList = this.imageUrls
      .split('\n')
      .map(url => url.trim())
      .filter(url => url !== '')
      .map(url => ({ id: null, image_url: url }));

    const updatedLocation = {
      location: {
        id: this.location.id,
        name: this.location.name,
        description: this.location.description,
        latitude: this.location.latitude,
        longitude: this.location.longitude,
        province: this.location.province,
        categories: this.location.categories.map((c: any) => ({ id: c.id, name: c.name }))
      },
      images: imageList
    };

    this.http.put(`http://localhost:8080/locations/admin/update/${this.locationId}`, updatedLocation)
      .subscribe({
        next: () => {
          console.log('Cập nhật thành công');
          this.router.navigate(['/admin/locations']);
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật địa điểm:', err);
          this.errorMessage = 'Không thể cập nhật địa điểm.';
        }
      });
  }
}
