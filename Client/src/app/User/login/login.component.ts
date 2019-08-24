import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import {User} from './../user'
import { AppService } from 'src/app/app.service';
import {Cookie} from 'ng2-cookies';
import {Router} from '@angular/router';
import io from "socket.io-client";
import { ToastrService } from 'ngx-toastr';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [SocketService]
})
export class LoginComponent implements OnInit {

  public email:any;
  public password:any;
  public isAdmin:any;

  @Output() getLoginStatus =  new EventEmitter<boolean>();

  constructor(private appService:AppService,
    public router:Router, private toastr: ToastrService, private socketService: SocketService) {
        this.socketService.getNotification().subscribe(data => {
          this.toastr.toastrConfig.timeOut=5000;
          this.toastr.success('New meeting schedule', data);   
        });
     }

  
  async loginFunction(){
    let data = {
      email: this.email,
      password: this.password
      
    }
    
  await  this.appService.signIn(data)
    .subscribe(response=>{
      console.log(response);
      this.isAdmin=response.data.userDetails.isAdmin;
      if(response.status===200){
        this.toastr.toastrConfig.timeOut=5000;
        this.toastr.success('login successfull');
        this.getLoginStatus.emit(true);
        if(this.isAdmin) {
          this.router.navigate(['/all-user']);
        }
        else{
          
          this.socketService.join(response.data.userDetails.userId);
          
          this.router.navigate(['/dashboard'], { queryParams: {"userId": response.data.userDetails.userId} });
        }
            
        Cookie.set('AuthToken',response.data.authToken);
        Cookie.set('userId',response.data.userDetails.userId);
        Cookie.set('receiverName',response.data.userDetails.firstName+ ''+response.data.userDetails.lastName);
        Cookie.set('email',response.data.userDetails.email);
        Cookie.set('IS_ADMIN',response.data.userDetails.isAdmin);
       
      }
      else if(response.status===400){
        console.log('status',response.status)
        alert('Wrong password');   
      }
      else{
        alert('No user details found');
      }
    });

    
  }
  

  public goToSignUp: any = () => {

    this.router.navigate(['/signup']);

  } 

  public resetPassword: any=()=>{
    this.router.navigate(['/forgot-password']);
  }




  ngOnInit() {
    

  }

  

}
