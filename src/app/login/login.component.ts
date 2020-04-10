import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  LoggedInUserModel,
  LoginResponse
} from '../shared/models/shared.model';
import { RestfullServices } from '../shared/services/restfull.services';
import { Router } from '@angular/router';
import { GlobalServices } from '../shared/services/global.services';
import { AlertDialogComponent } from '../shared/components/alert-dialog/alert-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginSubscription: Subscription;
  loginError: boolean = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private restfullServices: RestfullServices,
    private router: Router,
    private globalServices: GlobalServices,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.globalServices.lastSelectedAdminTab = 0;         
    this.globalServices.QMDashboardIndex = 0;        
    const sessionData = sessionStorage.getItem('loggedInUserDetails');
    let loginAs = 'admin';
    if(sessionData){
      loginAs = JSON.parse(sessionData).loginAs;
    }
    this.loginForm = this.formBuilder.group({
      loginType: [loginAs, [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), this.globalServices.noWhitespaceValidator]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), this.globalServices.noWhitespaceValidator]]//, Validators.pattern(PasswordValidationPattern)
    });

    this.loginForm.valueChanges.subscribe(fg => {
      this.loginError = false;
    })
    
  }

  onLogIn(): void {
    const loginData: LoggedInUserModel = { 
      LOGINNAME: this.loginForm.value.username.trim(),
      PASSWORD: this.loginForm.value.password.trim()
    };
    const type = this.loginForm.get('loginType').value;
    let payloadType = "LOGINQMGR";
    let redirectTo = "/quarantine-dashboard";
    if(type == 'admin') {
      payloadType = "LOGINBYADMIN";
      redirectTo = "/view-user";
    };
    this.loginSubscription = this.restfullServices.post(loginData, payloadType).subscribe(response => {
      
      if(response[0].PAYLOAD.STATUSMESSAGE.CODE == 101){
        this.loginError = true;
        return;
      }

      const data = response[0].PAYLOAD[payloadType];
      const loginData: LoginResponse = {
        loginAs: type,
        phone: data.PHONE,
        firstName: data.FIRSTNAME,
        lastName: data.LASTNAME,
        pincode: data.PINCODE,
        email: data.EMAIL,
        zone: data.ZONE
      }
      sessionStorage.setItem('loggedInUserDetails', JSON.stringify(loginData));
      this.globalServices.checkUserLoggedIn();
      this.router.navigate([redirectTo]);
    })   
  }

  openDialog(message: string, action?: boolean): void {
    this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: {
        message: message
      }
    });
  }

  ngOnDestroy(){
    if(this.loginSubscription){
      this.loginSubscription.unsubscribe();
    }
  }

}
