import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // JSON server URL

  constructor(private router: Router, private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl); // Fetch all users
  }

  validateUser(users: any[], username: string, password: string): boolean {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('username', user.username);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }  

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}
