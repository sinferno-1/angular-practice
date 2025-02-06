import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Make sure this is imported for ngModel to work
import { FormsModule } from '@angular/forms';    // ngModel depends on this
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule, NavbarComponent],  // Import FormsModule here for ngModel
})
export class HomeComponent {
  cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow'];
  selectedCity: string = '';

  submitCity() {
    if (this.selectedCity) {
      // The city is displayed when submitted
    }
  }
}
