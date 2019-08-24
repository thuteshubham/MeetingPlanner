import { AppService } from 'src/app/app.service';
import {Cookie} from 'ng2-cookies'
import {User} from './../user'
import {Router} from '@angular/router'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.scss']
})
export class AllUserComponent implements OnInit {

  users:User[];
  selectedUser

  constructor(private appService:AppService,
    public router:Router) { }

    async getAllUsers(){
      await this.appService.getUsers()
      .subscribe(response=>{
        console.log(response)
        this.users=response;
      })
    }
  

  ngOnInit() {
    this.getAllUsers()
  }

  onSelect(userId): void {
    this.router.navigate(['/dashboard'], { queryParams: {"userId": userId} } );
   
  }
  signOff() {
    Cookie.delete('AuthToken');
    Cookie.delete('userId');
    this.router.navigate(['/login']);
  }
  
}
