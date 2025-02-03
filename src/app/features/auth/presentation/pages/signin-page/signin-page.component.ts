import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormLoginComponent } from '../../components/form-login/form-login.component';

@Component({
  selector: 'app-signin-page',
  imports: [ReactiveFormsModule, FormLoginComponent, RouterLink],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.css'
})
export class SigninPageComponent {

}
