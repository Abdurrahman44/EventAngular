import { Injectable } from '@angular/core';
import {LoginService} from "./views/pages/login/login.service";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$=new BehaviorSubject<boolean>(false);
  isLoggedIn$=this._isLoggedIn$.asObservable();


  constructor(private loginService:LoginService,private router: Router) {
    const token=localStorage.getItem('user_auth');
    this._isLoggedIn$.next(!!token);
  }



  login(data:any)
  {
    return this.loginService.postLogin(data).subscribe(
      (response:any)=>{
        localStorage.setItem('user_auth',response.token);
        this._isLoggedIn$.next(true);

        if(response.token){
          this.router.navigate(['./dashboard'], {
              queryParams: {
                data: null,
              }

            }
          )

        }
      },
      (error:any)=>{

        console.error("başarısız");
      }



    );


  }
}
