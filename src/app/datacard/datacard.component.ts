import { Component, OnInit } from '@angular/core';
import { CartdataService } from '../cartdata.service';
import { DatafromapiService } from '../datafromapi.service';

@Component({
  selector: 'app-datacard',
  templateUrl: './datacard.component.html',
  styleUrls: ['./datacard.component.css']
})
export class DatacardComponent implements OnInit {

  constructor(public obj:DatafromapiService,public cartobj:CartdataService) { }

  alladds:any;
  propertydetails=[];
  ngOnInit(): void {
    this.obj.getDataFromapi().subscribe({
      next:(res)=>{
        this.alladds=res.payload
        for(let v of this.alladds){
          for(let u of v.property){
            u.OwnerName=v.OwnerName
            u.email=v.email
            u.phoneNo=v.phoneNo
            this.propertydetails.push(u)
            // console.log(this.propertydetails)
          }
        }
      },
      error:(err)=>{
        alert("something error")
      }
    })
  }

  mycart=[];
  add(data:any){
    // console.log(data)
    this.cartobj.addtocart(data).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.message=="user not existed.. signup to post"){
          alert("user not existed.. signup to post")
        }
        else if(res.message=="add added to cart"){
          this.mycart.push(data)
          console.log("mycart",this.mycart)
          alert("add added to cart")
        }
        else if(res.message=="add already existed in cart"){
          alert("add already existed in cart")
        }
        else if(res.message=="next add is added to cart"){
          alert("next add is added to cart")
        }
      },
      error:(err)=>{
        alert(err)
      }
    })
  }
}
