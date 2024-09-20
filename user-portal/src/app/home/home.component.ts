import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from './home.service';
import { Observable } from 'rxjs';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { QuestionComponent } from '../question/question.component';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { CommentsComponent } from '../comments/comments.component';
import { CustomformatPipe } from '../customformat.pipe';

declare const google: any;

import { QuillModule } from 'ngx-quill';
import Quill from 'quill';

import hljs from 'highlight.js'; // Import Highlight.js
hljs.configure({
  languages: ['javascript', 'python', 'java', 'html', 'css'] // Add desired languages
});


const FontAttributor:any = Quill.import('attributors/class/font');





@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    QuillModule,
    CustomformatPipe,
    CommonModule,NgbAlertModule,NgxEditorModule,FormsModule, MatIconModule, SocialLoginModule,MatBottomSheetModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {



  technologyList$:any;
  questionsList$:any;

  technologyId = 1;
  questionId = -1;
  selectedAnswer:any;

  profileName="";
  profileURL = 'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png';
  
  isUserLoggedIn = true;

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



  @ViewChild("editorContainer", { static: true })
  editorContainer: ElementRef | null = null;

  editor: Quill | undefined;
 content = '';



  constructor(private homeService: HomeService, private router: Router){}
 
  readonly dialog = inject(MatDialog);
  private _bottomSheet = inject(MatBottomSheet);






  ngOnInit(): void {
    this.answerEditor = new Editor();

    // FontAttributor.whitelist = [
    //   'Poppins'
    // ];
    // Quill.register(FontAttributor, true);
    

    this.setData();
    this.initData();

    if (this.editorContainer) {
      try {
          this.editor = new Quill(this.editorContainer.nativeElement, {
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
          });
      } catch (error) {
          console.error("Error creating Quill editor:", error);
      }
  } else {
      console.error("Element with #editorContainer not found!");
  }
  }

  ngAfterViewInit(): void {
    this.loginWithGoogle();
  }

  openBottomSheet(): void {
    this._bottomSheet.open(CommentsComponent);
  }

  loginWithGoogle(){
    //const body = <HTMLDivElement>document.body;
    // const script = document.createElement('script');
    // script.src = 'https://accounts.google.com/gsi/client';
    // script.async = true;
    // script.defer = true;
    // body.appendChild(script);

    google.accounts.id.initialize({
      client_id:'711574190393-32970qhrrtds70m1sregudgh2pe20v8r.apps.googleusercontent.com',
      callback: (res:any)=>{
        console.log(res);
        const responsePayload = decodeJWTToken(res.credential);
        localStorage.setItem('loggedInUser', JSON.stringify(responsePayload));
         this.setData();

      }
    })

    function decodeJWTToken(token:any) {
      return JSON.parse(atob(token.split('.')[1]));
    }

    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme: 'filled_blue',
      size:'large',
      shape:'rectangle',
      width:200
    })
  }


  setData() {
   const userData:any =  localStorage.getItem('loggedInUser');
   if(userData) {
    const data = JSON.parse(userData);
    console.log(data.name)
    this.isUserLoggedIn = true;
    this.profileName = data.name;
    this.profileURL = data.picture;

   } else {
    this.isUserLoggedIn = false;
   }
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
    if(this.editor?.root) {
      this.editor.root.innerHTML = this.selectedAnswer;
    }

  }


  ngOnDestroy(): void {
    this.answerEditor?.destroy();
  }

  logout() {
    console.log('called')
    google.accounts.id.disableAutoSelect();
    localStorage.clear();
    window.location.reload();
  }
 

  addNewQuestion(){
    this.dialog.open(QuestionComponent, {
      width: '50%',
      maxHeight: '90vh',
      data:{
        type:'add'
      }
    }).afterClosed().subscribe((result) =>{
      if(result === 'success') {
        //  this.loadUsers();
      }
    });
  }

  addAnswer(){
    this.dialog.open(QuestionComponent, {
      width: '50%',
      maxHeight: '90vh',
      data:{
        type:'add'
      }
    }).afterClosed().subscribe((result) =>{
      if(result === 'success') {
        //  this.loadUsers();
      }
    });
  }

  getData() {
       // 1. Get Quill's Delta format (useful for saving structured data)
       const delta = this.editor?.getContents();
       console.log('Delta:', delta);
   
       // 2. Get the plain text without any formatting
       const plainText = this.editor?.getText();
       console.log('Plain Text:', plainText);
   
       // 3. Get the HTML content (with formatting)
       const htmlContent = this.editor?.root.innerHTML;
       console.log('HTML Content:', htmlContent);
  }
}
