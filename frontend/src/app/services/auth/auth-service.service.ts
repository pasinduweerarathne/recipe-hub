import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  authSubject = new BehaviorSubject<any>({
    user: null,
  });

  login(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/sign-in`, userData);
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/signup`, userData);
  }

  getUserProfile(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });
    return this.http
      .get<any>(`${this.baseUrl}/api/user/profile`, {
        headers,
      })
      .pipe(
        tap((user) => {
          const currentState = this.authSubject.value;
          this.authSubject.next({ ...currentState, user });
        })
      );
  }

  logout() {
    localStorage.clear();
    this.authSubject.next({});
  }
}
