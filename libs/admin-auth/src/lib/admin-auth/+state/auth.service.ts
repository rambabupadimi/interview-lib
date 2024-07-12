import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

//  url = "https://interview-lib-pwtn.onrender.com";

url = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  logIn(request:any) {
    const loginURL = this.url+'/auth/signin'; 
    return this.httpClient.post(loginURL,request);
  }

}
