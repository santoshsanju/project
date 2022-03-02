import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public obj:FormBuilder,public serviceObj:UsersService,public routerObj:Router) { }

  ngOnInit(): void {
  }

  userRegistration=this.obj.group({
    username:['',Validators.required],
    password:['',Validators.required],
    email:['',Validators.required],
    phoneNo:['',Validators.required]
  })


  fileName:string
  file:File
 
  imageUrl:string | ArrayBuffer="https://www.pngkey.com/png/full/202-2024792_user-profile-icon-png-download-fa-user-circle.png"
  //profile
  onFileSelect(x:File){
    //console.log(file)
    this.file = x;
    this.fileName=x.name

 
    //read file content  FileReader javascript constructor
    const reader = new FileReader
    reader.readAsDataURL(x)
 
    reader.onload=()=>{
      this.imageUrl = reader.result
    }
  }

  get username(){
    return this.userRegistration.get("username")
  }
  get password(){
    return this.userRegistration.get("password")
  }
  get email(){
    return this.userRegistration.get("email")
  }
  get phoneNo(){
    return this.userRegistration.get("phoneNo")
  }

  submit(){
    //add userObj and profile photo image and here we have formDataObj helps in sending multi media data
    let formData = new FormData()
 
    let userObj = this.userRegistration.value
 
   //add userObj to formData for append 2nd arg should be string or blob(binary large object)
    formData.append("userObj",JSON.stringify(userObj))
 
   //add image to formData
    formData.append("photo",this.file)
    console.log(this.userRegistration.value)
    this.serviceObj.postData(formData).subscribe({
      next:(res)=>{
        if(res.message=="user created"){
          alert("user created")
        }
        else if(res.message=="email already existed..plz try with different email"){
          alert("email already existed..plz try with different email")
        }
        else{
          alert("username is already existed")
        }
      },
      error:(err)=>{
        alert("error in creation")
      }
    })
  }

}
