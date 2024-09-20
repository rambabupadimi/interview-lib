import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { HomeService } from '../home/home.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    CommonModule,
    NgxEditorModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent {

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
  technologyList:any = [];
  selectedTechnologyId = -1;
  questionContent:any = '';
  answerContent:any = '';
  isEdit = false;
  selectedReviewId = -1;

  selectItemId = -1;

  constructor(private service: HomeService,  public dialogRef: MatDialogRef<QuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {
    this.answerEditor = new Editor();
    this.questionEditor = new Editor();
    //this.loadQuestionsList();
    //this.loadTechnologyList();
  }

  ngOnDestroy(): void {
    this.questionEditor?.destroy();
    this.answerEditor?.destroy();
  }

  loadQuestionsList() {
    this.service.questionsList(this.selectItemId).subscribe({
      next:(result:any) =>{
        this.questionAndAnswersList = result.data;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  loadTechnologyList() {
    this.service.technologyList().subscribe({
      next:(result:any) =>{
        this.technologyList = result.data;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  onTechnologySelect(event:any){
    console.log(event);
  }

  saveQuestion(){
    console.log(this.selectedTechnologyId);
    console.log(this.questionContent);
    console.log(this.answerContent);

    if(this.selectedTechnologyId && this.questionContent.length >0 ) {
      const request = {technology_id:+this.selectedTechnologyId,title: this.questionContent,description:this.answerContent};
      // this.service.addQuestion(request).subscribe({
      //   next:(request) =>{
      //       console.log(request);
      //       this.loadQuestionsList();
      //       this.questionContent = '';
      //       this.answerContent = '';
      //   },
      //   error:(error) =>{
      //     console.log(error);
      //   }
      // })
    }
  }

  editQuestion(item:any) {
    console.log(item);
    this.isEdit = true;
    this.selectedTechnologyId = item.technology_id;
    this.questionContent = item.title;
    this.answerContent = item.description;
    this.selectedReviewId = item.id;
  }

  deleteQuestion(item:any){
    console.log(item);
  }

  cancelEdit(){
    this.isEdit = false;
    this.selectedTechnologyId = -1;
    this.questionContent = '';
    this.answerContent = '';
  }

  updateQuestion(){
    if(this.selectedTechnologyId && this.questionContent.length >0 && this.answerContent.length>0) {
      const request = {technology_id:+this.selectedTechnologyId,title: this.questionContent,description:this.answerContent,review_id:this.selectedReviewId};
      // this.service.editQuestion(request).subscribe({
      //   next:(request) =>{
      //       console.log(request);
      //       this.loadQuestionsList();
      //       this.isEdit = false;
      //       this.selectedTechnologyId = -1;
      //       this.questionContent = '';
      //       this.answerContent = '';
      //   },
      //   error:(error) =>{
      //     console.log(error);
      //   }
      // })
    }
  }

  selectItem(id:any) {
    this.selectItemId = id;
    this.loadQuestionsList();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
