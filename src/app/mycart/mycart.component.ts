import { Component, OnInit } from '@angular/core';
import { CartdataService } from '../cartdata.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {

  mycart=[];
  constructor(public cartObj:CartdataService) { }

  ngOnInit(): void {
    this.cartObj.getcart().subscribe({
      next:(res)=>{
      this.mycart=res.payload?.property
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  delete(index:any){
    this.cartObj.removecart(index).subscribe({
      next:(res)=>{
        // console.log(res)
        // // this.mycart.splice(index,1)
        if(res.message=="add not found"){
          alert("add not found")
        }
        else if(res.message=="add removed from cart"){
          alert("add removed from cart")
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  
}
