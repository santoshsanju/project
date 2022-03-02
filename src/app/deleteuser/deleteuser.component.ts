import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { UsersService } from '../users.service';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css']
})
export class DeleteuserComponent implements OnInit {

  constructor(public obj:FormBuilder,public serviceObj:UsersService) { }

  ngOnInit(): void {
  }

  deleteuser=this.obj.group({
    password:['',Validators.required]
  })


  get password(){
    return this.deleteuser.get("password")
  }

  delete(){
    console.log(this.deleteuser.value)
    this.serviceObj.userdelete(this.deleteuser.value).subscribe({
      next:(res)=>{
        if(res.message=="user not found"){
          alert("user not found")
        }
        else if(res.message=="user already deleted"){
          alert("user already deleted")
        }
        else if(res.message=="user not existed.. signup to update user deatils"){
          alert("user not existed.. signup to update user deatils")
        }
        else if(res.message=="password is invalid"){
          alert("password is invalid")
        }
        else if(res.message=="user deleted"){
          alert("user deleted")
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
