import { Component, OnInit } from '@angular/core';
import {User} from './../user'
import {AppService} from './../../app.service';
import {Router} from '@angular/router'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public firstName:any;
  public lastName:any;
  public mobileNumber:any;
  public email:any;
  public password:any;
  public isAdmin: any;
  users:User[];

  constructor(private appService:AppService,
    private router: Router) { }

  async getAllUsers(){
    await this.appService.getUsers()
    .subscribe(response=>{
      console.log(response)
      this.users=response
    })
    
  }


  async signUpFunction(){
    let data = {
      firstName: this.firstName,
      lastName: this.lastName,
      mobileNumber: this.mobileNumber,
      email: this.email,
      password: this.password,
      isAdmin: this.isAdmin 
    }

    await this.appService.signUp(data)
    .subscribe(response=>{
      console.log(response)
      if(response.status===200){
        alert('signUp Succeffull');
       
     }
     });
  }


  ngOnInit() {
    this.getAllUsers()
  }

  navigateToLogin(){
    this.router.navigate(["/login"])
  }

}
