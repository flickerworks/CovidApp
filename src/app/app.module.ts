import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
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
  MatCheckboxModule,
  MAT_DATE_LOCALE
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
import { UserSectionComponent } from './user-section/user-section.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PopupComponent } from './popup/popup.component';
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
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { ReportsComponent } from './reports/reports.component';
import { MapComponent } from './patient-register/map/map.component';


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
    UserSectionComponent,
    PatientListComponent,
    LoaderComponent,
    MonitorDetailsComponent,
    QuarantineManagerDashboardComponent,
    QuarantineTableComponent,
    PatientRegisterComponent,
    PersonalDetailsStepperComponent,
    HealthStatusStepperComponent,
    AddressStepperComponent,
    AssignMonitorStepperComponent,
    ReportsComponent,
    MapComponent
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
    MatCheckboxModule,
    NgxChartsModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyA74VF_BOifDXzONZJIIWZZJA6QqkaqJxI",
      libraries: ['places']
    })
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
    DatePipe,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    { 
      provide: DateAdapter,
      useClass: NativeDateAdapter
    },
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
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
