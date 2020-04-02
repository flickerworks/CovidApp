import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  EmailValidationPattern,
  PasswordValidationPattern,
  LoggedInUserModel,
  DefaultErrorMessage
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
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]]//, Validators.pattern(PasswordValidationPattern)
    });
  }

  onLogIn(): void {
    const loginData: LoggedInUserModel = { 
      USERNAME: this.loginForm.value.username,
      PASSWORD: this.loginForm.value.password
    };

    this.loginSubscription = this.restfullServices.post(loginData, "LOGINBYADMIN").subscribe(response => {
      //validation here
      
      sessionStorage.setItem('loggedInUserDetails', JSON.stringify(response));
      this.globalServices.checkUserLoggedIn();
      this.router.navigate(['/view-user']);
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
