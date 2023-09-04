import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl = 'http://localhost:8085/api/users';

  constructor(private http: HttpClient) {}

  getUserDetails(name:any,lastName:any,Email:any,password:any){
    const url=`${this.baseUrl}/create/${name}/${lastName}/${Email}/${password}`
    return this.http.get(url);
  }
  postRegist(regist:any){
    const url = `${this.baseUrl}/create`;
    return this.http.post(url,regist);

  }
}
