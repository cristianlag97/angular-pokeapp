import { Component } from '@angular/core';
import { FormRegisterComponent } from '../../components/form-register/form-register.component';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  imports: [FormRegisterComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {

}
