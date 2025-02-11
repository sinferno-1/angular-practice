import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/users'; 

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    return this.checkUserExists(user.username).pipe(
      map((exists) => {
        if (exists) {
          throw new Error('User already exists!');
        }
        return this.http.post(this.apiUrl, user).subscribe();
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  checkUserExists(username: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => users.some((user) => user.username === username))
    );
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => users.find((user) => user.username === username && user.password === password))
    );
  }
  updateUserCountryCity(username: string, country: string, city: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => users.find((user) => user.username === username)),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      }),
      map((user) => {
        if (!user) {
          throw new Error('User not found');
        }
        user.country = country;
        user.city = city;
        return this.http.put(`${this.apiUrl}/${user.id}`, user).subscribe();
      })
    );
  }
  getUserDetails(username: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => users.find((user) => user.username === username)),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      })
    );
  }
}