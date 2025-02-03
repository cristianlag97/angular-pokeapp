import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../data/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  imports: [ReactiveFormsModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {

  loginFormGroup: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(public authService: AuthService, private router: Router) {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.loginFormGroup = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  login() {
    this.authService.loginUser(this.email.value, this.password.value ).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

}
