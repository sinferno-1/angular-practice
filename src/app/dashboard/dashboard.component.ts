
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-country-city-selector',
  styleUrls: ['./dashboard.component.css'],
  templateUrl: './dashboard.component.html',
  imports:[FormsModule, CommonModule, NavbarComponent,],
})
export class DashboardComponent {
  // loggedInUser: any; // Assume this holds the logged-in user's information

  // constructor(private apiService: ApiService) {}


  countries = ['India', 'USA', 'UK', 'Australia', 'Canada', 'Germany', 'France', 'Japan', 'China', 'Brazil'];
  cities: string[] = [];
  countryCitiesMap: { [key: string]: string[] } = {
    'India': ['Pune', 'Mumbai', 'Bengaluru', 'Delhi', 'Chennai', 'Hyderabad', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat'],
    'USA': ['New York', 'Chicago', 'Washington', 'Los Angeles', 'San Francisco', 'Houston', 'Boston', 'Miami', 'Dallas', 'Seattle'],
    'UK': ['London', 'Oxford', 'Manchester', 'Birmingham', 'Liverpool', 'Bristol', 'Edinburgh', 'Glasgow', 'Leeds', 'Nottingham'],
    'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra', 'Hobart', 'Darwin', 'Gold Coast', 'Newcastle'],
    'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton', 'Quebec City', 'Winnipeg', 'Victoria', 'Halifax'],
    'Germany': ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne', 'Stuttgart', 'Dusseldorf', 'Leipzig', 'Dresden', 'Nuremberg'],
    'France': ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
    'Japan': ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Hiroshima', 'Sendai', 'Yokohama'],
    'China': ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Hangzhou', 'Wuhan', 'Xi\'an', 'Nanjing', 'Tianjin'],
    'Brazil': ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre']
  };
  selectedCountry: string = '';
  selectedCity: string = '';
  isPopupVisible: boolean = false;

  username: string | null = '';

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit() {
    this.username = this.authService.getUsername(); // Fetch username
  }


  onCountryChange() {
    this.cities = this.countryCitiesMap[this.selectedCountry] || [];
    this.selectedCity = '';
  }

  showPopup() {
    if (this.selectedCity) {
      this.isPopupVisible = true;
    // Update the user's country and city in the database
    if (this.username) {
      this.apiService.updateUserCountryCity(this.username, this.selectedCountry, this.selectedCity).subscribe();
      this.isPopupVisible = true;
    }
    }
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  
}
