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
  users: any[] = []; // Store all users

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data.filter(user => user.country && user.city && user.date && user.time); // Only show users with location data
    });
  }
}