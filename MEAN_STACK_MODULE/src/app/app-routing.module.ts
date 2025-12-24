import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SuccessComponent } from "./success/success.component";


const routes: Routes = [
  { path: '', component:  DashboardComponent, canActivate: [AuthGuard]},
  { path: 'success', component:  SuccessComponent, canActivate: [AuthGuard]},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(
    m=> m.AuthModule
  )},
   { path: 'inspect', loadChildren: () => import('./inspect-image/inspect-image.module').then(
    m=> m.InspectModule
  )},
  { path: 'user', loadChildren: () => import('./users/user.module').then(
    m=> m.UserModule
  )},
  { path: 'appointment', loadChildren: () => import('./appointment/appointment.module').then(
    m=> m.AppointmentModule
  )},
  { path: 'consultation', loadChildren: () => import('./consultation/consultation.module').then(
    m=> m.ConsultationModule
  )},
  { path: 'patient_record', loadChildren: () => import('./patient-record/patient-record.module').then(
    m=> m.PRModule
  )},
  { path: 'prescription', loadChildren: () => import('./prescription/prescription.module').then(
    m=> m.PrescriptionModule
  )},
  { path: 'lab', loadChildren: () => import('./lab/lab-test.module').then(
    m=> m.LabModule
  )},
  { path: 'performance', loadChildren: () => import('./performance/performance.module').then(
    m=> m.PerformanceModule
  )}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
