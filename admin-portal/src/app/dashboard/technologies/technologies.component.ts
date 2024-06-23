import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TechnologiesListComponent } from './technologies-list/technologies-list.component';
import { TechnologiesService } from './technologies.service';
import { AddTechnologyRequest } from './technologies.model';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatButtonModule,ReactiveFormsModule,MatInputModule,TechnologiesListComponent],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.scss',
})
export class TechnologiesComponent {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private service: TechnologiesService) {
    this.myForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', [Validators.required]],
    });
  }

  onSubmit(){
    console.log(this.myForm.value)
    if(this.myForm.valid) {
      const requst: AddTechnologyRequest = {name: this.myForm.value.name, code:this.myForm.value.code, description: this.myForm.value.description};
      this.service.addTechnology(requst).subscribe({
        next:(response) =>{
          console.log(response);
        },
        error:(error) => {
            console.log(error);
        }
      })
    }
  }
}
