import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { CartdataService } from '../cartdata.service';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public obj:FormBuilder,public serviceObj:UsersService,public carddataObj:CartdataService,public routerObj:Router) { }

  ngOnInit(): void {
  }

  userLogin=this.obj.group({
    usernameoremail:['',Validators.required],
    password:['',Validators.required]
  })

  get usernameoremail(){
    return this.userLogin.get("usernameoremail")
  }
  get password(){
    return this.userLogin.get("password")
  }

  login(){
    console.log(this.userLogin.value)
    this.serviceObj.loginData(this.userLogin.value).subscribe({
      next:(res)=>{
        if(res.message=="username or email invalid"){
          alert("username or email invalid")
        }
        else if(res.message=="password is invalid"){
          alert("password is invalid")
        }
        else if(res.message=="login success"){
          alert("login success")
          localStorage.setItem("token",res.token)
          this.serviceObj.getbhSubject().next(res.user)
          // this.carddataObj.getcartBhSubject().next(res.user)
        }
        else{
          alert("username temporarily in deleted status")
        }
      },
      error:(err)=>{
        alert("error in creation")
      }
    })
  }


}
