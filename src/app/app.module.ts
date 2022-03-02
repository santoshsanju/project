import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AddComponent } from './add/add.component';
import { PasswordchangeComponent } from './passwordchange/passwordchange.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { UserpersonaldataComponent } from './userpersonaldata/userpersonaldata.component';
import { AddupdateComponent } from './addupdate/addupdate.component';
import {HttpClientModule} from '@angular/common/http';
import { DatacardComponent } from './datacard/datacard.component';
import { MycartComponent } from './mycart/mycart.component';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';
import { RestoreaccountComponent } from './restoreaccount/restoreaccount.component';
import { MyaddsComponent } from './myadds/myadds.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    AddComponent,
    PasswordchangeComponent,
    ForgetpasswordComponent,
    UserpersonaldataComponent,
    AddupdateComponent,
    DatacardComponent,
    MycartComponent,
    DeleteuserComponent,
    RestoreaccountComponent,
    MyaddsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
