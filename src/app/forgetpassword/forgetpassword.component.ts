import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { UsersService } from '../users.service';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  constructor(public obj:FormBuilder,public serviceObj:UsersService) { }

  ngOnInit(): void {
  }

  forgetpassword=this.obj.group({
    email:['',Validators.required],
    phoneNo:['',Validators.required],
    newpassword:['',Validators.required],
    newpasswordmatch:['',Validators.required]
  })

  get email(){
    return this.forgetpassword.get("email")
  }
  get phoneNo(){
    return this.forgetpassword.get("phoneNo")
  }
  get newpassword(){
    return this.forgetpassword.get("newpassword")
  }
  get newpasswordmatch(){
    return this.forgetpassword.get("newpasswordmatch")
  }

  check(){
    console.log(this.forgetpassword.value)
    this.serviceObj.forgotpassword(this.forgetpassword.value).subscribe({
      next:(res)=>{
        if(res.message=="user not found"){
          alert("user not found")
        }
        else if(res.message=="password is same try to login with same password"){
          alert("password is same try to login with same password")
        }
        else if(res.message=="password updated"){
          alert("password updated")
        }
        else if(res.message=="password not matched"){
          alert("password not matched")
        }
        else if(res.message=="data not matched"){
          alert("data not matched")
        }
        else{
          alert(res.payload)
        }
      },
      error:(err)=>{
        alert("error in creation")
      }
    })
  }

}
