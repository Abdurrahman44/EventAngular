import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = 'http://localhost:8085/api/users';
  constructor(private  http:HttpClient) { }

  getUserDeatails(email:any,password:any){
    const url=`${this.baseUrl}/login/${email}/${password}`;
    return this.http.get(url);
  }

  postLogin(data:any) {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, data);
  }
}
