import { Route } from '@angular/router';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const adminAuthRoutes: Route[] = [
  { path: '', component: AdminAuthComponent,
    children:[
      {
        path:'',redirectTo:'login', pathMatch:'full'
      },
      {
        path:'login', component: LoginComponent,

      },
      {
        path:'forgot-password', component: ForgotPasswordComponent
      },
      {
        path:'reset-password', component: ResetPasswordComponent
      }
    ]
   },
];
