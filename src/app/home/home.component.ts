import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';    
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../auth.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../api.service'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule, NavbarComponent,],  
})
export class HomeComponent implements OnInit {
  username: string | null = '';
  country: string | null = '';
  city: string | null = '';

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsername();
    if (this.username) {
      this.apiService.getUserDetails(this.username).subscribe(
        (user) => {
          this.country = user.country || 'Not set';
          this.city = user.city || 'Not set';
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }
  }
}