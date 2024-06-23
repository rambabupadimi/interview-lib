import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TechnologiesService } from '../technologies.service';

@Component({
  selector: 'app-technologies-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './technologies-list.component.html',
  styleUrl: './technologies-list.component.scss',
})
export class TechnologiesListComponent implements OnInit {


  constructor(private service: TechnologiesService){

  }

  ngOnInit(): void {
    this.service.technologyList().subscribe({
      next:(result) =>{
        console.log(result);
      },
      error:(error) =>{
        console.log(error);
      },
      complete:() =>{
        console.log('completed');
      } 
    })
  }

}
