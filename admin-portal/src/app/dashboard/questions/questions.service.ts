import { Injectable } from '@angular/core';
import { AddQuestionRequest, EditQuestionRequest } from './questions.model';
import { HttpClient } from '@angular/common/http';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppConstants } from 'admin-portal/src/app-constants';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  addQuestion(request: AddQuestionRequest) {
    return this.http.post(AppConstants.url+'review/create',request);
  }

  editQuestion(request: EditQuestionRequest) {
    return this.http.put(AppConstants.url+'review/update',request);
  }

  deleteQuestion(id:number){
    return this.http.delete(AppConstants.url+'review/delete/'+id);
  }  

  questionsList(id:number) { 
    if(id == -1) {
      return this.http.get(AppConstants.url+'review/list');
    }
    return this.http.get(AppConstants.url+'review/list/'+id);
  }

}
