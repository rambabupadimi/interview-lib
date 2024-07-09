import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class TechnologiesListComponent {

  @Input() list:any;
  technologiesList: Array<TechnologyModel> = [];

  @Output() editTechnologyEmitter = new EventEmitter();

  @Output() deleteTechnologyEmitter = new EventEmitter();

  constructor(private service: TechnologiesService){

  }


  editTechnology(item:any) {
    this.editTechnologyEmitter.emit(item);
  }

  deleteTechnology(item:any) {
    this.deleteTechnologyEmitter.emit(item.id);
  } 
}
