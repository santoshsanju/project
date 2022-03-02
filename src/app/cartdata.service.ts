import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CartdataService {

  userObj:any;
  cartBhSubject=new BehaviorSubject(null)
  getcartBhSubject(){
    return this.cartBhSubject
  }
  constructor(public Obj:HttpClient,public userServiceObj:UsersService) { }

  addtocart(data:any):Observable<any>{
    let cartdataobj={"userName":"","property":""};
    this.userServiceObj.userBhSubject.subscribe({
      next:(res)=>{
        if(res==null){
          this.userObj={"username":"nouser"}
        }
        else{
          cartdataobj.userName=res.username
          this.userObj=res
          let property=data
          cartdataobj.property=property
          // console.log(cartdataobj)
          // console.log(this.userObj)
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
    console.log(cartdataobj)
    return this.Obj.post(`http://localhost:4200/cart/${this.userObj.username}/addcart`,cartdataobj)
  }

  getcart():Observable<any>{
    let cartdataobj={"userName":"","property":""};
    this.userServiceObj.userBhSubject.subscribe({
      next:(res)=>{
        if(res==null){
          this.userObj={"username":"nouser"}
        }
        else{
          this.userObj=res
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
    return this.Obj.get(`http://localhost:4200/cart/${this.userObj.username}/getcart`)
  }

  removecart(index):Observable<any>{
    this.userServiceObj.userBhSubject.subscribe({
      next:(res)=>{
        if(res==null){
          this.userObj={"username":"nouser"}
        }
        else{
          this.userObj=res
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
    return this.Obj.delete(`http://localhost:4200/cart/${this.userObj.username}/${index}/deleteadd`)
  }
}
