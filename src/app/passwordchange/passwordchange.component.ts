import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { UsersService } from '../users.service';
@Component({
  selector: 'app-passwordchange',
  templateUrl: './passwordchange.component.html',
  styleUrls: ['./passwordchange.component.css']
})
export class PasswordchangeComponent implements OnInit {

  constructor(public obj:FormBuilder,public serviceObj:UsersService) { }

  ngOnInit(): void {
  }

  passwordChange=this.obj.group({
    username:['',Validators.required],
    oldpassword:['',Validators.required],
    newpassword:['',Validators.required],
    newpasswordmatch:['',Validators.required]
  })

  get username(){
    return this.passwordChange.get("username")
  }
  get oldpassword(){
    return this.passwordChange.get("oldpassword")
  }
  get newpassword(){
    return this.passwordChange.get("newpassword")
  }
  get newpasswordmatch(){
    return this.passwordChange.get("newpasswordmatch")
  }

  change(){
    console.log(this.passwordChange.value)
    this.serviceObj.changepassword(this.passwordChange.value).subscribe({
      next:(res)=>{
        if(res.message=="user not found login to changepassword"){
          alert("user not found login to changepassword")
        }
        else if(res.message=="user not existed.. signup to post"){
          alert("user not existed.. signup to post")
        }
        else if(res.message=="password is same"){
          alert("password is same")
        }
        else if(res.message=="password updated"){
          alert("password updated")
        }
        else if(res.message=="new password not matched"){
          alert("new password not matched")
        }
        else if(res.message=="oldpassword is invalid"){
          alert("oldpassword is invalid")
        }
        else{
          alert("username is invalid")
        }
      },
      error:(err)=>{
        alert("error in creation")
      }
    })
  }

}
