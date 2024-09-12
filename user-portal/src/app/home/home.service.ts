import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {}

  technologyList(): Observable<any> {
    return this.http.get(AppConstants.url+'technology/list');
  }

  questionsList(id:number) { 
    if(id == -1) {
      return this.http.get(AppConstants.url+'review/list');
    }
    return this.http.get(AppConstants.url+'review/list/'+id);
  }
}
