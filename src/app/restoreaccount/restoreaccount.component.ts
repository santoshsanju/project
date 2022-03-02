import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { UsersService } from '../users.service';
@Component({
  selector: 'app-restoreaccount',
  templateUrl: './restoreaccount.component.html',
  styleUrls: ['./restoreaccount.component.css']
})
export class RestoreaccountComponent implements OnInit {

  constructor(public obj:FormBuilder,public serviceObj:UsersService) { }

  ngOnInit(): void {
  }

  userRestore=this.obj.group({
    usernameoremail:['',Validators.required],
    password:['',Validators.required]
  })

  get usernameoremail(){
    return this.userRestore.get("usernameoremail")
  }
  get password(){
    return this.userRestore.get("password")
  }

  restore(){
    console.log(this.userRestore.value)
    this.serviceObj.restoreUser(this.userRestore.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.message=="username or email invalid"){
          alert("username or email invalid")
        }
        else if(res.message=="password is invalid"){
          alert("password is invalid")
        }
        else if(res.message=="user get back in and login success"){
          alert("user get back in and login success")
          localStorage.setItem("token",res.token)
          this.serviceObj.getbhSubject().next(res.user)
          // this.carddataObj.getcartBhSubject().next(res.user)
        }
        else if(res.message=="user can access their account"){
          alert("user can access their account")
        }
        else{
          alert("asknokasn")
        }
      },
      error:(err)=>{
        alert("error in creation")
      }
    })
  }
}
