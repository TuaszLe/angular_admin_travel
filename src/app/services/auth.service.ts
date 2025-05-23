import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';


export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  // Đăng nhập và nhận token
  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, data).pipe(
      catchError(this.handleError) // Xử lý lỗi khi đăng nhập
    );
  }

  // Đăng ký tài khoản mới
  register(data: RegisterRequest): Observable<string> {
  return this.http.post<string>(`${this.baseUrl}/register`, data).pipe(
    catchError(this.handleError), // Xử lý lỗi khi đăng ký
    tap(response => {
      console.log('Response từ backend:', response); // Log phản hồi để kiểm tra
    })
  );
}


  // Lấy token từ localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Gửi header Authorization cho API cần bảo mật
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    return new HttpHeaders();
  }

  // Xử lý lỗi trả về từ API
  private handleError(error: HttpErrorResponse) {
  let errorMessage = 'Đã xảy ra lỗi, vui lòng thử lại sau.';
  
  if (error.status === 0) {
    errorMessage = 'Không thể kết nối đến máy chủ.';
  } else if (error.status === 400) {
    errorMessage = 'Dữ liệu không hợp lệ hoặc tài khoản đã tồn tại.';
  } else if (error.status === 401) {
    errorMessage = 'Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.';
  } else if (error.status === 500) {
    errorMessage = 'Lỗi server, vui lòng thử lại sau.';
  } else if (error.error && error.error.message) {
    // Kiểm tra xem backend có trả về message chi tiết không
    errorMessage = error.error.message;
  }
  
  return throwError(() => new Error(errorMessage));
}

}
