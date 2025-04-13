import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule để dùng routerLink

@Component({
  selector: 'app-sidebar',
  standalone: true, // Standalone Component (không cần Module)
  imports: [RouterModule], // Dùng RouterModule để điều hướng
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent { }
