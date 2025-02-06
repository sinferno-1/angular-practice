import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[FormsModule, CommonModule],
})
export class LoginComponent {
  userinfo: any = {};
  errorMessage = '';
  private authService = inject(AuthService);
  
  constructor(private router: Router) {}

  login() {
    if (this.authService.login(this.userinfo.username, this.userinfo.password)) {
      this.errorMessage = ''; // Clear error message on success
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Invalid username or password!';
    }
  }
}
