import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AllUserComponent } from './all-user/all-user.component';


@NgModule({
  declarations: [
    SignupComponent,
     LoginComponent, 
     ForgotPasswordComponent,
      AllUserComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports:[SignupComponent,LoginComponent]
})
export class UserModule { }
