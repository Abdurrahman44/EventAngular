import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  baseUrl = 'http://localhost:8085/api/users'; // Değişen adres
  constructor(private http: HttpClient) {}

  updateUser(data:any){
    const  url=`${this.baseUrl}/update`;
    return this.http.put(url,data);//buraya veri güncellemede kullanılacak
  }
  getAllUsers(){//Users çağırır
    const url=`${this.baseUrl}/alluser`;
    return this.http.get(url);
  }
  deleteUser(userId: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${userId}`; // Adresleme noktası
    return this.http.delete(url);
  }
}
