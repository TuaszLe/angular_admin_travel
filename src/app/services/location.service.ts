import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://localhost:8080/locations';  // Đảm bảo URL đúng với backend của bạn
  private categoryApiUrl = 'http://localhost:8080/categories';  // Địa chỉ API để lấy danh mục

  constructor(private http: HttpClient) {}

  // Phương thức lấy tất cả các địa điểm
  getLocations(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)  // Xử lý lỗi
    );
  }
  // Phương thức để lấy danh mục
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoryApiUrl);
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
  deleteLocation(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/locations/admin/delete/${id}`);
  }
  
}
