import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { UsersService } from '../users.service';
@Component({
  selector: 'app-userpersonaldata',
  templateUrl: './userpersonaldata.component.html',
  styleUrls: ['./userpersonaldata.component.css']
})
export class UserpersonaldataComponent implements OnInit {

  constructor(public obj:FormBuilder,public serviceObj:UsersService) { }

  ngOnInit(): void {
  }

  userPersonalData=this.obj.group({
    username:['',Validators.required],
    password:['',Validators.required],
    email:['',Validators.required],
    phoneNo:['',Validators.required]
  })

  get username(){
    return this.userPersonalData.get("username")
  }
  get password(){
    return this.userPersonalData.get("password")
  }
  get email(){
    return this.userPersonalData.get("email")
  }
  get phoneNo(){
    return this.userPersonalData.get("phoneNo")
  }


  check(){
    console.log(this.userPersonalData.value)
    this.serviceObj.updateprofile(this.userPersonalData.value).subscribe({
      next:(res)=>{
        if(res.message=="user not found signup to update user deatils"){
          alert("user not found signup to update user deatils")
        }
        else if(res.message=="data is same"){
          alert("data is same")
        }
        else if(res.message=="user details updated"){
          alert("user details updated")
        }
        else if(res.message=="data not matched"){
          alert("data not matched")
        }
        else if(res.message=="user not existed.. signup to update user deatils"){
          alert("user not existed.. signup to update user deatils")
        }
      },
      error:(err)=>{
        alert("error in creation")
      }
    })
  }


}
