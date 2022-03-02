import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public Obj:HttpClient) { }

  userBhSubject=new BehaviorSubject(null)

  getbhSubject(){
    return this.userBhSubject
  }
  loginObj:any;
  postData(userObj:any):Observable<any>{
    return this.Obj.post("http://localhost:4200/user/createuser",userObj)
  }
  loginData(userObj:any):Observable<any>{
    return this.Obj.post("http://localhost:4200/user/userLogin",userObj)
  }
  addpostData(userObj:any):Observable<any>{

    this.userBhSubject.subscribe({
      next:(res)=>{
        if(res==null){
          this.loginObj={"username":"nouser"}
        }
        else{
          this.loginObj=res
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
    return this.Obj.post(`http://localhost:4200/add/${this.loginObj.username}/postadd`,userObj)
  }
  mypostadds():Observable<any>{

    this.userBhSubject.subscribe({
      next:(res)=>{
        if(res==null){
          this.loginObj={"username":"nouser"}
        }
        else{
          this.loginObj=res
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
    return this.Obj.get(`http://localhost:4200/add/${this.loginObj.username}/myadds`)
  }
  forgotpassword(userObj:any):Observable<any>{
    return this.Obj.put("http://localhost:4200/user/forgotpassword",userObj)
  }

  changepassword(userObj:any):Observable<any>{
    this.userBhSubject.subscribe({
      next:(res)=>{
        if(res==null){
          this.loginObj={"username":"nouser"}
        }
        else{
          this.loginObj=res
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
    return this.Obj.put(`http://localhost:4200/user/${this.loginObj.username}/changepassword`,userObj)
  }

  updateprofile(userObj:any):Observable<any>{
    this.userBhSubject.subscribe({
      next:(res)=>{
        if(res==null){
          this.loginObj={"username":"nouser"}
        }
        else{
          this.loginObj=res
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
    return this.Obj.put(`http://localhost:4200/user/${this.loginObj.username}/updateuserdetails`,userObj)
  }

  userdelete(userObj:any):Observable<any>{
    this.userBhSubject.subscribe({
      next:(res)=>{
        if(res==null){
          this.loginObj={"username":"nouser"}
        }
        else{
          this.loginObj=res
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
    return this.Obj.put(`http://localhost:4200/user/${this.loginObj.username}/deleteuser`,userObj)
  }

  restoreUser(userObj:any):Observable<any>{
    return this.Obj.put("http://localhost:4200/user/restoreuser",userObj)
  }
}
