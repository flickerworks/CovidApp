import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AssignMonitorComponent } from './assign-monitor/assign-monitor.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { MonitorDetailsComponent } from './monitor-details/monitor-details.component';
import { QuarantineManagerDashboardComponent } from './quarantine-manager-dashboard/quarantine-manager-dashboard.component';
import { MgrAuthGuardService } from './mgr-auth-guard.service';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { AuthGuardService } from './auth.guard.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'view-user',
    component: ViewUserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'personal-details',
    component: PersonalDetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'assign-monitor/:name/:id',
    component: AssignMonitorComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-user/:isEdit',
    component: AddUserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'patient-list',
    component: PatientListComponent,
    canActivate: [MgrAuthGuardService]
  },
  {
    path: 'monitor-details',
    component: MonitorDetailsComponent,
    canActivate: [MgrAuthGuardService]
  },
  {
    path: 'quarantine-dashboard',
    component: QuarantineManagerDashboardComponent,
    canActivate: [MgrAuthGuardService]
  },
  {
    path: 'register-patient',
    component: PatientRegisterComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: "view-user",
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
