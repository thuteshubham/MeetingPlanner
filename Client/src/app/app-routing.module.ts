import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './User/login/login.component';
import { SignupComponent } from './User/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AllUserComponent} from './User/all-user/all-user.component'


const routes: Routes = [
  {path:'login',component: LoginComponent, pathMatch:'full'},
  {path:'signup',component: SignupComponent, pathMatch:'full'},
  {path:'dashboard',component: DashboardComponent, pathMatch:'full'},
  {path:'',redirectTo:'signup',pathMatch:'full'},
  {path:'all-user',component:AllUserComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]
})
export class AppRoutingModule { }
