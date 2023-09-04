import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
data={
  email:'',
  password:'',
};
  constructor(private router:Router,private auth:AuthService) { }


  ngOnInit(){}

  onClickSubmit(){
    this.auth.login(this.data)

  }




}
