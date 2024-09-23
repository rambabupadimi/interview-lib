import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { QuestionsService } from './questions.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TechnologiesService } from '../technologies/technologies.service';
import {MatSelectModule} from '@angular/material/select';
import { AddQuestionRequest, EditQuestionRequest } from './questions.model';
import { QuillModule } from 'ngx-quill';
import Quill from 'quill';
import hljs from 'highlight.js'; // Import Highlight.js
hljs.configure({
  languages: ['javascript', 'python', 'java', 'html', 'css'] // Add desired languages
});


@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule,NgxEditorModule, 
    QuillModule,
    
    MatExpansionModule, MatButtonModule, 
    MatSelectModule,
    MatInputModule,
    FormsModule,
    FormsModule,
    MatFormFieldModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent implements OnInit,  AfterViewInit{

  readonly panelOpenState = signal(false);
  questionEditor: any;
  answerEditor: any;
  rightSectionEditor:any;

  @ViewChild("questionEditorContainer")
  questionEditorContainer?: ElementRef;

  @ViewChild("answerEditorContainer")
  answerEditorContainer?: ElementRef;

  @ViewChild("answerRightSectionEditorContainer")
  answerRightSectionEditorContainer?: ElementRef;

  
    
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
  

  constructor(private service: QuestionsService, private technologyService: TechnologiesService){}
  ngAfterViewInit(): void {
    this.initQuestionEditor();
    this.initAnswerEditor();
    this.initAnswerRightSectionEditor();

  }

  ngOnInit(): void {
    // this.answerEditor = new Editor();
    // this.questionEditor = new Editor();
    this.loadQuestionsList();
    this.loadTechnologyList();
   
  }


  initQuestionEditor() {
    if (this.questionEditorContainer) {
      try {
          this.questionEditor = new Quill(this.questionEditorContainer.nativeElement, {
            modules: {
              toolbar: [
                // Text formatting
                [{ 'font': [] }], // Font selection
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // Headers (h1-h6)
                ['bold', 'italic', 'underline', 'strike'], // Bold, Italic, Underline, Strike-through
          
                // Subscript/Superscript
                [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript / Superscript
          
                // Lists
                [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Ordered & Unordered list
          
                // Indentation
                [{ 'indent': '-1' }, { 'indent': '+1' }], // Outdent and Indent
          
                // Alignment
                [{ 'align': [] }], // Alignment options
          
                // Line height and blockquotes
                [{ 'lineheight': [] }], // Line height adjustment
                ['blockquote', 'code-block'], // Blockquote and Code block
          
                // Links, images, and videos
                ['link', 'image', 'video'], // Hyperlink, Image, Video embedding
          
                // Text color & background
                [{ 'color': [] }, { 'background': [] }], // Text color and background color
          
                // Clear formatting
                ['clean'], // Remove formatting button
              ],
              syntax: {
                highlight: (text:any) => hljs.highlightAuto(text).value // Highlight the text
              },
            },
            theme: 'snow',
            placeholder:'Enter text...'
          });
      } catch (error) {
          console.error("Error creating Quill editor:", error);
      }
  } else {
      console.error("Element with #questioneditorContainer not found!");
  }
  }

  initAnswerEditor(){
    if (this.answerEditorContainer) {
      try {
          this.answerEditor = new Quill(this.answerEditorContainer.nativeElement, {
            modules: {
              toolbar: [
                // Text formatting
                [{ 'font': [] }], // Font selection
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // Headers (h1-h6)
                ['bold', 'italic', 'underline', 'strike'], // Bold, Italic, Underline, Strike-through
          
                // Subscript/Superscript
                [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript / Superscript
          
                // Lists
                [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Ordered & Unordered list
          
                // Indentation
                [{ 'indent': '-1' }, { 'indent': '+1' }], // Outdent and Indent
          
                // Alignment
                [{ 'align': [] }], // Alignment options
          
                // Line height and blockquotes
                [{ 'lineheight': [] }], // Line height adjustment
                ['blockquote', 'code-block'], // Blockquote and Code block
          
                // Links, images, and videos
                ['link', 'image', 'video'], // Hyperlink, Image, Video embedding
          
                // Text color & background
                [{ 'color': [] }, { 'background': [] }], // Text color and background color
          
                // Clear formatting
                ['clean'], // Remove formatting button
              ],
              syntax: {
                highlight: (text:any) => hljs.highlightAuto(text).value // Highlight the text
              },
            },
            theme: 'snow',
            placeholder:'Enter text...'
          });
      } catch (error) {
          console.error("Error creating Quill editor:", error);
      }
  } else {
      console.error("Element with #AnswereditorContainer not found!");
  }
  }

  initAnswerRightSectionEditor(){
    try {
    if (this.answerRightSectionEditorContainer) {
      try {
          this.rightSectionEditor = new Quill(this.answerRightSectionEditorContainer?.nativeElement, {
            modules: {
              toolbar: [
                // Text formatting
                [{ 'font': [] }], // Font selection
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // Headers (h1-h6)
                ['bold', 'italic', 'underline', 'strike'], // Bold, Italic, Underline, Strike-through
          
                // Subscript/Superscript
                [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript / Superscript
          
                // Lists
                [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Ordered & Unordered list
          
                // Indentation
                [{ 'indent': '-1' }, { 'indent': '+1' }], // Outdent and Indent
          
                // Alignment
                [{ 'align': [] }], // Alignment options
          
                // Line height and blockquotes
                [{ 'lineheight': [] }], // Line height adjustment
                ['blockquote', 'code-block'], // Blockquote and Code block
          
                // Links, images, and videos
                ['link', 'image', 'video'], // Hyperlink, Image, Video embedding
          
                // Text color & background
                [{ 'color': [] }, { 'background': [] }], // Text color and background color
          
                // Clear formatting
                ['clean'], // Remove formatting button
              ],
              syntax: {
                highlight: (text:any) => hljs.highlightAuto(text).value // Highlight the text
              },
            },
            theme: 'snow',
            placeholder:'Enter text...'
          });
      } catch (error) {
          console.error("Error creating Quill editor:", error);
      }
  } else {
      console.error("Element with #AnswerRighteditorContainer not found!");
  }
}catch(err) {
  console.log(err);
}
  }

  // ngOnDestroy(): void {
  //   // this.questionEditor?.destroy();
  //   // this.answerEditor?.destroy();
  // }

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
    this.technologyService.technologyList().subscribe({
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

    // 3. Get the HTML content (with formatting)
    this.questionContent = this.questionEditor?.root.innerHTML;
    this.answerContent = this.answerEditor?.root.innerHTML;
    
    if(this.selectedTechnologyId && this.questionContent.length >0 ) {
      const request: AddQuestionRequest = {technology_id:+this.selectedTechnologyId,title: this.questionContent,description:this.answerContent};
      this.service.addQuestion(request).subscribe({
        next:(request) =>{
            console.log(request);
            this.loadQuestionsList();
            this.questionContent = '';
            this.answerContent = '';

            if(this.questionEditor?.root) {
              this.questionEditor.root.innerHTML = this.questionContent;
            }
            if(this.answerEditor?.root) {
              this.answerEditor.root.innerHTML = this.answerContent;
            }
        },
        error:(error) =>{
          console.log(error);
        }
      })
    }
  }

  editQuestion(item:any) {
    console.log(item);
    this.isEdit = true;
    this.selectedTechnologyId = item.technology_id;

    // this.questionContent = item.title;
    // this.answerContent = item.description;
    
    this.selectedReviewId = item.id;
    if(this.questionEditor?.root) {
      this.questionEditor.root.innerHTML = item.title;
    }
    if(this.answerEditor?.root) {
      this.answerEditor.root.innerHTML = item.description;
    }
  }

  deleteQuestion(item:any){
    console.log(item);
  }

  cancelEdit(){
    this.isEdit = false;
    this.selectedTechnologyId = -1;
    this.questionContent = '';
    this.answerContent = '';
    if(this.questionEditor?.root) {
      this.questionEditor.root.innerHTML = this.questionContent;
    }
    if(this.answerEditor?.root) {
      this.answerEditor.root.innerHTML = this.answerContent;
    }
  }

  updateQuestion(){

    this.questionContent = this.questionEditor?.root.innerHTML;
    this.answerContent = this.answerEditor?.root.innerHTML;


    if(this.selectedTechnologyId && this.questionContent.length >0 && this.answerContent.length>0) {

      const request: EditQuestionRequest = {technology_id:+this.selectedTechnologyId,title: this.questionContent,description:this.answerContent,review_id:this.selectedReviewId};
      this.service.editQuestion(request).subscribe({
        next:(request) =>{
            console.log(request);
            this.loadQuestionsList();
            this.isEdit = false;
            this.selectedTechnologyId = -1;
            this.questionContent = '';
            this.answerContent = '';
            if(this.questionEditor?.root) {
              this.questionEditor.root.innerHTML = this.questionContent;
            }
            if(this.answerEditor?.root) {
              this.answerEditor.root.innerHTML = this.answerContent;
            }
        },
        error:(error) =>{
          console.log(error);
        }
      })
    }
  }

  selectItem(id:any) {
    this.selectItemId = id;
    this.loadQuestionsList();
  }

  setData(description:string){
    if(this.rightSectionEditor?.root) {
      this.rightSectionEditor.root.innerHTML = description;
    }
  }
}

