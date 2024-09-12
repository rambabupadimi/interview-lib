import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from './home.service';
import { Observable } from 'rxjs';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,NgbAlertModule,NgxEditorModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  technologyList$:any;
  questionsList$:any;

  technologyId = 1;
  questionId = -1;
  selectedAnswer:any;

  answerEditor: any;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(private homeService: HomeService){}

  ngOnInit(): void {
    this.answerEditor = new Editor();
   
    this.initData();
  }

  async initData(){
    await this.loadTechnologies();
    await this.loadQuestionAndAnswers();

  }

  loadTechnologies(){
    this.homeService.technologyList().subscribe({
      next:(result:any) =>{
        console.log(result);
        this.technologyList$ = result?.data;
      },
      error:(error) =>{
        console.log(error);
      },
      complete:() =>{
        console.log('completed');
      } 
    })
  }

  loadQuestionAndAnswers(){
    this.homeService.questionsList(this.technologyId).subscribe({
      next:(result:any) =>{
        console.log(result);
        this.questionsList$ = result?.data;
      },
      error:(error) =>{
        console.log(error);
      },
      complete:() =>{
        console.log('completed');
      } 
    })
  }

  selectTechnology(id:any) {
    this.technologyId = id;
    this.loadQuestionAndAnswers();
  }

  selectQuestion(item:any) {
    this.selectedAnswer = item.description;
    this.questionId = item.id;
  }


  ngOnDestroy(): void {
    this.answerEditor?.destroy();
  }
}
