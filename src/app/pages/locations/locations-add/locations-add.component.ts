import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locations-add',
  standalone: true,
  templateUrl: './locations-add.component.html',
  styleUrls: ['./locations-add.component.css'],
  imports: [CommonModule]
})
export class LocationsAddComponent {
  constructor(private router: Router) {}

  saveLocation() {
    console.log('Location saved');
    this.router.navigate(['/admin/locations']);
  }
}
