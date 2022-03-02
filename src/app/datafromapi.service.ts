import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatafromapiService {

  constructor(public Obj:HttpClient) { }

  getDataFromapi():Observable<any>{
    return this.Obj.get("http://localhost:4200/add/getadds")
  }
  
}
