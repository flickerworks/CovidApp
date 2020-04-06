import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatSnackBarModule,
  MatSelectModule,
  MatDatepickerModule,
  DateAdapter,
  NativeDateAdapter,
  MatNativeDateModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCardModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatSlideToggleModule,
  MatCheckboxModule
  } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalServices } from './shared/services/global.services';
import { LoginComponent } from './login/login.component';
import { AlertDialogComponent } from './shared/components/alert-dialog/alert-dialog.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { NoDataAvailableComponent } from './no-data-available/no-data-available.component';
import { HeaderComponent } from './header/header.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { QuarantineManagerComponent } from './quarantine-manager/quarantine-manager.component';
import { MonitorCardComponent } from './quarantine-manager/monitor-card/monitor-card.component';
import { UserSectionComponent } from './user-section/user-section.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AssignMonitorComponent } from './assign-monitor/assign-monitor.component';
import { CaseDetailComponent } from './assign-monitor/case-detail/case-detail.component';
import { PopupComponent } from './popup/popup.component';
import { InterceptService } from './shared/services/intercept.service';
import { LoaderComponent } from './loader/loader.component';
import { MonitorDetailsComponent } from './monitor-details/monitor-details.component';
import { QuarantineManagerDashboardComponent } from './quarantine-manager-dashboard/quarantine-manager-dashboard.component';
import { QuarantineTableComponent } from './quarantine-manager-dashboard/quarantine-table/quarantine-table.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { PersonalDetailsStepperComponent } from './patient-register/personal-details-stepper/personal-details-stepper.component';
import { HealthStatusStepperComponent } from './patient-register/health-status-stepper/health-status-stepper.component';
import { AddressStepperComponent } from './patient-register/address-stepper/address-stepper.component';
import { AssignMonitorStepperComponent } from './patient-register/assign-monitor-stepper/assign-monitor-stepper.component';
import { AuthGuardService } from './auth.guard.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ReportsComponent } from './reports/reports.component';


@NgModule({
  declarations: [
    AppComponent,
    AlertDialogComponent,
    LoginComponent,
    ViewUserComponent,
    AddUserComponent,
    NoDataAvailableComponent,
    HeaderComponent,
    PopupComponent,
    PersonalDetailsComponent,
    QuarantineManagerComponent,
    MonitorCardComponent,
    UserSectionComponent,
    PatientListComponent,
    AssignMonitorComponent,
    CaseDetailComponent,
    LoaderComponent,
    MonitorDetailsComponent,
    QuarantineManagerDashboardComponent,
    QuarantineTableComponent,
    PatientRegisterComponent,
    PersonalDetailsStepperComponent,
    HealthStatusStepperComponent,
    AddressStepperComponent,
    AssignMonitorStepperComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatRadioModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatCheckboxModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatRadioModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatTabsModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatCheckboxModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    { 
      provide: DateAdapter,
      useClass: NativeDateAdapter
    },
    /* {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    }, */
    GlobalServices, AuthGuardService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertDialogComponent
  ]
})
export class AppModule { }
