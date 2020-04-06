import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  EmailValidationPattern,
  PasswordValidationPattern,
  LoggedInUserModel,
  DefaultErrorMessage,
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
  constructor(
    private readonly formBuilder: FormBuilder,
    private restfullServices: RestfullServices,
    private router: Router,
    private globalServices: GlobalServices,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    const sessionData = sessionStorage.getItem('loggedInUserDetails');
    let loginAs = 'admin';
    if(sessionData){
      loginAs = JSON.parse(sessionData).loginAs;
    }
    this.loginForm = this.formBuilder.group({
      loginType: [loginAs, [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]]//, Validators.pattern(PasswordValidationPattern)
    });
    
  }

  onLogIn(): void {
    const loginData: LoggedInUserModel = { 
      LOGINNAME: this.loginForm.value.username,
      PASSWORD: this.loginForm.value.password
    };
    const type = this.loginForm.get('loginType').value;
    let payloadType = "LOGINQMGR";
    let redirectTo = "/quarantine-dashboard";
    if(type == 'admin') {
      payloadType = "LOGINBYADMIN";
      redirectTo = "/view-user";
    };
    this.loginSubscription = this.restfullServices.post(loginData, payloadType).subscribe(response => {
      //validation here
      const data = response[0].PAYLOAD[payloadType];
      const loginData: LoginResponse = {
        loginAs: type,
        phone: data.PHONE,
        firstName: data.FIRSTNAME,
        lastName: data.LASTNAME,
        pincode: data.PINCODE,
        email: data.EMAIL
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
