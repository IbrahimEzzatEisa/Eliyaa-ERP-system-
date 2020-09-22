import { Component, OnInit } from '@angular/core';
import { UserLogin, LoginService } from 'app/shared/services/api';
import { Router, ActivatedRoute } from '@angular/router';
import { SwalService } from 'app/shared/services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user : UserLogin = new UserLogin();
 
  forgetMe() {
    localStorage.removeItem(this.userId);
  } userId;
  username;
  userPassword;
  redirectUrl: string;
  redirectMessage:string;
  busyLoggingIn: boolean = false;
  isRememberMeChecked: boolean = false;

  valideUser;
  busy;
  firstRequestDone;
  constructor(  private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private swalService: SwalService,
    private spinner: NgxSpinnerService

    ) { }

    login() {
      this.busyLoggingIn = true;
this.spinner.show();
      this.loginService.login(this.user).subscribe(
        res => {
          if(res.token) {
  
            if(this.redirectUrl) {
              this.router.navigateByUrl(this.redirectUrl);
            } else  {
              this.spinner.hide();
               this.router.navigate(['/pages/dashboard']);
           
            }
           
          } else{ 
          this.busyLoggingIn = false;
          this.spinner.hide();

          this.swalService.NotifierError('عفوا ، حدث خطا في البريد الآلكتروني او الرقم السري .. حاول مرة آخري ')   
               

        }
        err => {
          this.busyLoggingIn = false;
          this.spinner.hide();

          this.swalService.NotifierError('من فضلك ادخل الحقول الممطلوبة')        }
        });
    }

  ngOnInit(): void {
    if(this.route.snapshot.queryParams) {
      this.redirectUrl = this.route.snapshot.queryParams.redirect || '';
      this.redirectMessage = this.route.snapshot.queryParams.redirectMessage || '';
    }
  }
 


}
