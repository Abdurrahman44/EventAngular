import { Component } from '@angular/core';
import {RegisterService} from "./register.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private registerService:RegisterService,private router:Router) { }
  registers= {
    name: '',
    lastName: '',
    email: '',
    password: ''
  };

  register() {
    this.registerService.postRegist(this.registers).subscribe(
      (res)=>{
        this.router.navigate(['login'])
      },
    (error)=>{
  console.log('Registration error',error)
    }
    );

    //
    // this.registerService. postRegist(this.registers).subscribe(
    //   (response) => {
    //     console.log('Registration successful:', response);
    //     // İşlem başarılı olduğunda yapılacaklar
    //   },
    //   (error) => {
    //     console.error('Registration error:', error);
    //     // Hata durumunda yapılacaklar
    //   }
    // );
  }






}
