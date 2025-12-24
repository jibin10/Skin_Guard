import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CreatePrescriptionComponent } from "./create/create-prescription.component";

import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
  { path: 'create/:appointmentId/:patientId', component: CreatePrescriptionComponent, canActivate: [AuthGuard] },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PrescriptionRoutingModule {}
