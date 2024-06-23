import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginRequest } from '../admin-auth/+state/auth.models';
import { AuthFacade } from '../admin-auth/+state/aut.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoginApiCalling$ = this.authFacade.isLoginCalling$;
  isLoginErrorMessage$ = this.authFacade.loginErrorMessage$;
  isLoginSuccess$ = this.authFacade.isLoginSuccess$;

  constructor(private fb: FormBuilder, private authFacade: AuthFacade, private route: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    console.log('login');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form submitted successfully!', this.loginForm.value);
      const loginRequest: LoginRequest = {email : this.loginForm.value.email, password: this.loginForm.value.password};
      this.authFacade.login(loginRequest);
    } else {
      console.log('Form is invalid');
    }
  }

}
