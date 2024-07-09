import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { QuestionsService } from './questions.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule,NgxEditorModule, MatExpansionModule, MatButtonModule, 
    MatInputModule,
    FormsModule,
    MatFormFieldModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent implements OnInit, OnDestroy{

  readonly panelOpenState = signal(false);
  questionEditor: any;
  answerEditor: any;

  html = '';
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

  questionAndAnswersList:any = [];
  constructor(private serive: QuestionsService){}

  ngOnInit(): void {
    this.answerEditor = new Editor();
    this.questionEditor = new Editor();
    this.loadQuestionsList();
  }

  ngOnDestroy(): void {
    this.questionEditor?.destroy();
    this.answerEditor?.destroy();
  }

  loadQuestionsList() {
    this.serive.questionsList().subscribe({
      next:(result:any) =>{
        this.questionAndAnswersList = result.data;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
