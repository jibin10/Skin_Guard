import { NgModule } from "@angular/core";
import { AuthGuard } from "../auth/auth.guard";
import { RouterModule, Routes } from "@angular/router";

import { LabTestListComponent } from "./lab-test-list/lab-test-list.component";
import { UpdateLabComponent } from "./update-lab-result/update-lab-result.component";


const routes: Routes = [
  { path: 'list', component: LabTestListComponent, canActivate: [AuthGuard] },
  { path: ':patientId', component: LabTestListComponent, canActivate: [AuthGuard] },
  { path: 'edit_result/:testId', component: UpdateLabComponent, canActivate: [AuthGuard] },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LabRoutingModule {}
