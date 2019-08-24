import { Component, OnInit } from '@angular/core';
//import for toastr
import { ToastrService } from 'ngx-toastr';
//for Service
import { AppService } from '../../app.service';
//for routing
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public email : String;

  constructor(
    public appService: AppService,
    public _route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  public sendResetLinkFunction : any = () => {

    if (!this.email) {
      this.toastr.warning('enter email address')
    }
    this.appService.sendResetLink(this.email)
      .subscribe((apiResponse) => {
        if (apiResponse.status == 200) {
          this.toastr.success("Reset Link Sent SuccessFully", "Success!");
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
        else {
          this.toastr.error(apiResponse.message, "Error! Try Again");
        }
      },
        (error) => {
          this.toastr.error("Some Error Occurred", "Error!");
        });

  }//end of sendResetLink 

 
}