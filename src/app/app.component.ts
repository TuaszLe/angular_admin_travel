import { Component } from '@angular/core';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
// import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, RouterModule, HttpClientModule], // Import SidebarComponent và RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin-travel';
}
