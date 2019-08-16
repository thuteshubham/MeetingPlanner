import { Component, OnInit } from '@angular/core';
import {User} from './../user'
import { AppService } from 'src/app/app.service';
import {Cookie} from 'ng2-cookies'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email:any;
  public password:any;
  public isAdmin:any;

  constructor(private appService:AppService,
    public router:Router) { }

  
  async loginFunction(){
    let data = {
      email: this.email,
      password: this.password
      
    }

    await this.appService.signIn(data)
    .subscribe(response=>{
      console.log(response);
      this.isAdmin=response.data.userDetails.isAdmin;
      if(response.status===200){
        alert('signIn succesfull');
        console.log(this.isAdmin);
        if(this.isAdmin){
          this.router.navigate(['/all-user']);
        }
        else{
          console.log('routed towards user hasboard');
          this.router.navigate(['/dashboard'], { queryParams: {"userId": response.data.userDetails.userId} });
        }

        Cookie.set('AuthToken',response.data.authToken);
        Cookie.set('userId',response.data.userDetails.userId);
        Cookie.set('receiverName',response.data.userDetails.firstName+ ''+response.data.userDetails.lastName);
        Cookie.set('email',response.data.userDetails.email);
        Cookie.set('IS_ADMIN',response.data.userDetails.isAdmin);
       
      }
    });

    
  }
  

  public goToSignUp: any = () => {

    this.router.navigate(['/signup']);

  } 



  ngOnInit() {
    

  }

  

}
