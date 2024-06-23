import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 url = "https://interview-lib-pwtn.onrender.com";

  constructor(private httpClient: HttpClient) { }

  logIn(request:any) {
    const loginURL = this.url+'/auth/signin'; 
    return this.httpClient.post(loginURL,request);
  }

}
