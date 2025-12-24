import { NgModule } from "@angular/core";
import { AuthGuard } from "../auth/auth.guard";
import { RouterModule, Routes } from "@angular/router";

import { PRListComponent } from "./patient-record-list/patient-record-list.component";


const routes: Routes = [
  { path: 'list', component: PRListComponent, canActivate: [AuthGuard] },
  { path: ':patientId', component: PRListComponent, canActivate: [AuthGuard] },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PRRoutingModule {}
