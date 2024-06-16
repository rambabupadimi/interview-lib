import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, provideRouter } from '@angular/router';
import { adminAuthRoutes } from '../lib.routes';

@Component({
  selector: 'lib-admin-auth',
  standalone: false,
  templateUrl: './admin-auth.component.html',
  styleUrl: './admin-auth.component.css',
})
export class AdminAuthComponent {}
