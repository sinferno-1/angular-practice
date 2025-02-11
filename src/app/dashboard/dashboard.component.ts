import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule],
})
export class DashboardComponent {
  countries = {
    India: ['Mumbai', 'Delhi', 'Bangalore'],
    USA: ['New York', 'Los Angeles', 'Chicago'],
    UK: ['London', 'Manchester', 'Birmingham'],
  };

  selectedCountry: string = '';
  selectedCity: string = '';

  onSelectCountry(country: string) {
    this.selectedCountry = country;
    this.selectedCity = ''; // Reset city on country change
  }

  onSelectCity(city: string) {
    this.selectedCity = city;
    this.showPopup();
  }

  showPopup() {
    if (this.selectedCountry && this.selectedCity) {
      alert(`Selected Country: ${this.selectedCountry}\nSelected City: ${this.selectedCity}`);
    }
  }
}
