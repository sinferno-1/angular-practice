import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage = '';
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    });
  }

  signup() {
    if (this.signupForm.valid) {
      this.apiService.registerUser(this.signupForm.value).subscribe({
        next: () => {
          alert('Registration successful!');
          localStorage.setItem('username', this.signupForm.value.username);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
    }
  }
}
