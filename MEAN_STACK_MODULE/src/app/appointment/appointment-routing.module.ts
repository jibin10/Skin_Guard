import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BookAppointmentComponent } from "./book-appointment/book-appointment.component";
import {AppointmentListComponent } from "./list-appointment/list-appointment.component";

import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
  { path: 'list', component: AppointmentListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: BookAppointmentComponent, canActivate: [AuthGuard] },
  { path: 'edit_role/:userId', component: BookAppointmentComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppointmentRoutingModule {}
