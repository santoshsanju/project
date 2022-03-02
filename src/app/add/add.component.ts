import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { UsersService } from '../users.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(public obj:FormBuilder,public serviceObj:UsersService) { }
  
  ngOnInit(): void {

  }


  addRegistration=this.obj.group({
    OwnerName:['',Validators.required],
    email:['',Validators.required],
    phoneNo:['',Validators.required],
    property:this.obj.group({
      propertyAddress:['',Validators.required],
      propertyType:['',Validators.required],
      bhkType:['',Validators.required],
      rent:['',Validators.required]
    }),
    // file:[''],
    // fileSource:['']
  })

  images=[]
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

  get OwnerName(){
    return this.addRegistration.get("OwnerName")
  }
  get email(){
    return this.addRegistration.get("email")
  }
  get phoneNo(){
    return this.addRegistration.get("phoneNo")
  }
  get property(){
    return this.addRegistration.get("property")
  }
  get propertyAddress(){
    return this.property?.get("propertyAddress")
  }
  get propertyType(){
    return this.property?.get("propertyType")
  }
  get bhkType(){
    return this.property?.get("bhkType")
  }
  get rent(){
    return this.property?.get("rent")
  }

  submit(){
        //add userObj and profile photo image and here we have formDataObj helps in sending multi media data
        let formData = new FormData()
 
        let userObj = this.addRegistration.value
     
       //add userObj to formData for append 2nd arg should be string or blob(binary large object)
        formData.append("userObj",JSON.stringify(userObj))
     
       //add image to formData
        formData.append("photo",this.file)
    console.log(this.addRegistration.value)
    this.serviceObj.addpostData(formData).subscribe({
      next:(res)=>{
        if(res.message=="apartment added"){
          alert("apartment added")
        }
        else if(res.message=="apartment already added"){
          alert("apartment already added")
        }
        else if(res.message=="new appartment added to list"){
          alert("new appartment added to list")
        }
        else if(res.message=="user not existed.. signup to post"){
          alert("user not existed.. signup to post")
        }
      },
      error:(err)=>{
        alert("error in creation")
      }
    })
  }
}
