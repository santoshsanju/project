import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-myadds',
  templateUrl: './myadds.component.html',
  styleUrls: ['./myadds.component.css']
})
export class MyaddsComponent implements OnInit {

  myadds=[]
  constructor(public obj:UsersService) { }

  ngOnInit(): void {
    this.obj.mypostadds().subscribe({
      next:(res)=>{
          console.log(res)
          this.myadds=res.payload?.property 
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  delete(index:any){
    
  }
  update(index:any){

  }

}
