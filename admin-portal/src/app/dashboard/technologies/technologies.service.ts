import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppConstants } from 'admin-portal/src/app-constants';
import { Observable } from 'rxjs';
import { AddTechnologyRequest, EditTechnologyRequest } from './technologies.model';

@Injectable({
  providedIn: 'root'
})
export class TechnologiesService {

  constructor(private http: HttpClient) {}


  addTechnology(request: AddTechnologyRequest) {
    return this.http.post(AppConstants.url+'technology/create',request);
  }

  editTechnology(request: EditTechnologyRequest) {
    return this.http.put(AppConstants.url+'technology/update',request);
  }

  deleteTechnology(id:number){
    return this.http.delete(AppConstants.url+'technology/delete/'+id);
  }  

  technologyList() {
    return this.http.get(AppConstants.url+'technology/list');
  }

}
