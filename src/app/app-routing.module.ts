import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { QuarantineManagerComponent } from './quarantine-manager/quarantine-manager.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AssignMonitorComponent } from './assign-monitor/assign-monitor.component';

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
    canActivate: [AuthGuard]
  },
  {
    path: 'quarantine-manager',
    component: QuarantineManagerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'assign-monitor/:name/:id',
    component: AssignMonitorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'patient-list',
    component: PatientListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: "view-user",
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
