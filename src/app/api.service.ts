import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/users'; 

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => {
        if (users.some((u) => u.username === user.username)) {
          throw new Error('Username already exists!');
        }
        if (users.some((u) => u.email === user.email)) {
          throw new Error('Email already exists!');
        }
        return user; 
      }),
      catchError((error) => throwError(() => new Error(error.message))),
      switchMap((validatedUser: any) => this.http.post(this.apiUrl, validatedUser))
    );
  }
  
  

  checkUserExists(username: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => users.some((user) => user.username === username))
    );
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => users.some((user) => user.email === email))
    );
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => users.find((user) => user.username === username && user.password === password))
    );
  }

  updateUserCountryCity(username: string, country: string, city: string, date: string, time: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => users.find((user) => user.username === username)),
      map((user) => {
        if (!user) {
          throw new Error('User not found');
        }
        user.country = country;
        user.city = city;
        user.date = date;
        user.time = time; 
        return this.http.put(`${this.apiUrl}/${user.id}`, user).subscribe();
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      })
    );
  }
  
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
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
