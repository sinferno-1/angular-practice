import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
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
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value ? null : { mismatch: true };
  }

  signup() {
    if (this.signupForm.valid) {
      console.log('Form is valid, attempting to register user:', this.signupForm.value);

      this.apiService.registerUser(this.signupForm.value).subscribe({
        next: () => {
          alert('Registration successful!');
          localStorage.setItem('username', this.signupForm.value.username);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error during registration:', err);
          this.errorMessage = err.message;
        },
      });
    } else {
      console.log('Form is invalid:', this.signupForm.errors);
      this.errorMessage = 'Please ensure all fields are correctly filled out and passwords match.';
    }
  }
}
