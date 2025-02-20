import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
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
  showModal: boolean = false;
  passwordStrength: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  usernameExists: boolean = false;
  emailExists: boolean = false;
  maxDate: string = '';

 

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];

    this.signupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$#!%*?&]{6,}$'),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  checkUsernameExists() {
    const username = this.signupForm.get('username')?.value;
    if (username) {
      this.apiService.checkUserExists(username).subscribe((exists) => {
        this.usernameExists = exists;
      });
    }
  }

  checkEmailExists() {
    const email = this.signupForm.get('email')?.value;
    if (email) {
      this.apiService.checkEmailExists(email).subscribe((exists) => {
        this.emailExists = exists;
      });
    }
  }

  checkPasswordStrength() {
    const password = this.signupForm.get('password')?.value || '';
    let strength = 0;

    if (password.length >= 6) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[@$!%*?&]/.test(password)) strength += 1;

    if (strength <= 2) this.passwordStrength = 'weak';
    else if (strength === 3 || strength === 4) this.passwordStrength = 'medium';
    else this.passwordStrength = 'strong';
  }

  signup() {
    if (this.signupForm.valid && !this.usernameExists && !this.emailExists) {
      const { confirmPassword, ...userData } = this.signupForm.value;
      this.apiService.registerUser(userData).subscribe({
        next: () => {
          
          this.successMessage = 'Registration Successful!';
          this.showModal = true;
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.errorMessage = error.message;
        },
      });
    }
  }

  redirectToLogin() {
    this.showModal = false;
    this.router.navigate(['/']);
  }
}
