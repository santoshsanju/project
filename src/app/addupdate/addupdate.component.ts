import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
@Component({
  selector: 'app-addupdate',
  templateUrl: './addupdate.component.html',
  styleUrls: ['./addupdate.component.css']
})
export class AddupdateComponent implements OnInit {

  constructor(public obj:FormBuilder) { }

  ngOnInit(): void {
  }

  

  propertyUpdate=this.obj.group({
    propertyAddress:['',Validators.required],
    propertyType:['',Validators.required],
    bhkType:['',Validators.required],
    rent:['',Validators.required]
  })

  get property(){
    return this.propertyUpdate.get("propertyUpdate")
  }
  get propertyAddress(){
    return this.propertyUpdate?.get("propertyAddress")
  }
  get propertyType(){
    return this.propertyUpdate?.get("propertyType")
  }
  get bhkType(){
    return this.propertyUpdate?.get("bhkType")
  }
  get rent(){
    return this.propertyUpdate?.get("rent")
  }

  submit(){
    console.log(this.propertyUpdate.value)
  }
}
