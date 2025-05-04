import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';  // Thêm dòng này
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';


// Khởi tạo ứng dụng và cung cấp HttpClientModule
bootstrapApplication(AppComponent, {
  providers: [
    HttpClientModule,
    provideHttpClient(),  // Cung cấp HttpClientModule
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
