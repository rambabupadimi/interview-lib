import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TechnologiesService } from '../technologies.service';
import { TechnologyModel } from '../technologies.model';

@Component({
  selector: 'app-technologies-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './technologies-list.component.html',
  styleUrl: './technologies-list.component.scss',
})
export class TechnologiesListComponent implements OnInit {

  technologiesList: Array<TechnologyModel> = [];

  constructor(private service: TechnologiesService){

  }

  ngOnInit(): void {
    this.service.technologyList().subscribe({
      next:(result:any) =>{
        console.log(result);
        this.technologiesList = result?.data;
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
