import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://localhost:8080/locations';  // Đảm bảo URL đúng với backend của bạn

  constructor(private http: HttpClient) {}

  // Phương thức lấy tất cả các địa điểm
  getLocations(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)  // Xử lý lỗi
    );
  }

  // Xử lý lỗi
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Lỗi: ${error.error.message}`;
    } else {
      errorMessage = `Mã lỗi: ${error.status}, Thông báo lỗi: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
