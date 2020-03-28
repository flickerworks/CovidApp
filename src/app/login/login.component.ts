import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
    private restfullServices: RestfullServices,
    private router: Router,
    private globalServices: GlobalServices,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(EmailValidationPattern)]],
      password: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(PasswordValidationPattern)]]
    });
  }

  onLogIn(): void {
    const loginData: LoggedInUserModel = { 
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    let response: LoggedInUserModel = {
      id: 123,
      email: 'test@gmail.com',
      password: '12345'
    };
    sessionStorage.setItem('loggedInUserDetails', JSON.stringify(response));
    this.globalServices.checkUserLoggedIn();
    this.router.navigate(['/view-user']);
    // this.restfullServices.loginUser(loginData)
    // .subscribe((response: LoggedInUserModel[]) => {
    //   if (response && response.length > 0) {
    //     sessionStorage.setItem('loggedInUserDetails', JSON.stringify(response[0]));
    //     this.globalServices.checkUserLoggedIn();
    //     this.router.navigate(['/view-user']);
    //   } else {
    //     this.openDialog('Invalid credentials. Please try again.');
    //   }
    // }, (err) => {
    //   this.openDialog(DefaultErrorMessage);
    // });
  }

  openDialog(message: string, action?: boolean): void {
    this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: {
        message: message
      }
    });
  }

}
