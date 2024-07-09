import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TechnologiesListComponent } from './technologies-list/technologies-list.component';
import { TechnologiesService } from './technologies.service';
import { AddTechnologyRequest, EditTechnologyRequest } from './technologies.model';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatButtonModule,ReactiveFormsModule,MatInputModule,TechnologiesListComponent],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.scss',
})
export class TechnologiesComponent  implements OnInit{

  myForm: FormGroup;
  technologiesList = [];
  isEdit = false;
  recordId = -1;
  constructor(private fb: FormBuilder, private service: TechnologiesService) {
    this.myForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.loadTechnologyList();
  }

  loadTechnologyList() {
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

  onSubmit(){
    console.log(this.myForm.value)
    if(this.myForm.valid) {
      if(this.isEdit) {
        const requst: EditTechnologyRequest = {technology_id:this.recordId, name: this.myForm.value.name, code:this.myForm.value.code, description: this.myForm.value.description};
        this.service.editTechnology(requst).subscribe({
          next:(response) =>{
            console.log(response);
            this.isEdit = false;
            this.myForm.reset();
            this.loadTechnologyList();

          },
          error:(error) => {
              console.log(error);
          }
        })
      } else {
        const requst: AddTechnologyRequest = {name: this.myForm.value.name, code:this.myForm.value.code, description: this.myForm.value.description};
        this.service.addTechnology(requst).subscribe({
          next:(response) =>{
            console.log(response);
            this.loadTechnologyList();
          },
          error:(error) => {
              console.log(error);
          }
        })
      }

    }
  }

  onClose(){
    this.isEdit = false;
    this.myForm.reset();
  }

  onEditTechnology(item:any){
    this.isEdit = true;
    this.recordId = item.id;
    this.myForm.patchValue({
      code: item.code,
      name: item.name,
      description: item.description
    });
  }

  onDeleteTechnology(id:number) {
    this.service.deleteTechnology(id).subscribe({
      next:(result) =>{
        console.log(result);
        this.loadTechnologyList();
        alert('Record delted');
      },
      error:(error) =>{
        console.log(error);
      }
    })
  }


}
