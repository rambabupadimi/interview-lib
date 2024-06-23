import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTabsModule, RouterModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  constructor(private router: Router){}

  navLinks = [
    {
      link:'technologies',
      label:'Technologies'
    },
    {
      link:'questions',
      label:'Questions'
    }
   
  ]


  logout() {
    localStorage.clear();
    this.router.navigateByUrl('');
  }
}
