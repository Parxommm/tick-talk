import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tt-login-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  passwordCaseValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);

    if (!hasUpperCase || !hasLowerCase) {
      return { passwordCase: true };
    }

    return null;
  };

  form = new FormGroup({
    username: new FormControl('evgparx', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('gwRosj0qDx', [
      Validators.required,
      Validators.minLength(6),
      this.passwordCaseValidator,
    ]),
  });

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  getUsernameError(): string {
    const control = this.username;
    if (control?.errors && (control.dirty || control.touched)) {
      if (control.errors['required']) {
        return 'Логин обязателен для заполнения';
      }
      if (control.errors['minlength']) {
        return 'Логин должен содержать минимум 3 символа';
      }
    }
    return '';
  }

  getPasswordError(): string {
    const control = this.password;
    if (control?.errors && (control.dirty || control.touched)) {
      if (control.errors['required']) {
        return 'Пароль обязателен для заполнения';
      }
      if (control.errors['minlength']) {
        return 'Пароль должен содержать минимум 6 символов';
      }
      if (control.errors['passwordCase']) {
        return 'Пароль должен содержать буквы разного регистра';
      }
    }
    return '';
  }

  onSubmit() {
    if (this.form.valid) {
      const formValues = this.form.value as {
        username: string;
        password: string;
      };
      this.authService.login(formValues).subscribe(() => {
        this.router.navigate(['']);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible.set(!this.isPasswordVisible());
  }
}
