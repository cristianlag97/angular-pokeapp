import { Component } from '@angular/core';
import { AuthService } from '../../../data/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-register',
  imports: [ReactiveFormsModule],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.css',
})
export class FormRegisterComponent {
  registerFormGroup: FormGroup;
  fullName: FormControl;
  email: FormControl;
  password: FormControl;
  gender: FormControl;
  messageError: String = '';
  isCompany: FormControl;

  constructor(public authService: AuthService, private router: Router) {
    this.fullName = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.gender = new FormControl('male', [Validators.required]);
    this.isCompany = new FormControl(false);
    this.registerFormGroup = new FormGroup({
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      gender: this.gender,
      isCompany: this.isCompany,
    });
  }

  register() {
    this.authService.createUser(this.registerFormGroup.value).subscribe({
      next: (data) => {
        this.registerFormGroup.reset();
        this.router.navigate(['/']);
      },
      error: (error) => {
        if (typeof error.error.message === 'string') {
          this.messageError = error.error.message;
        } else if (Array.isArray(error.error.message)) {
          this.messageError = error.error.message.join(', ');
        }
      }
    });
  }
}
