import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { AdminAuthComponent } from './admin-auth.component';
import { RouterModule } from '@angular/router';
import { adminAuthRoutes } from '../lib.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AdminAuthComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminAuthRoutes),
    RouterModule,
    
    // StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.authReducer),
    // EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AdminAuthModule {}
