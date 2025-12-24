import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserCreateComponent } from "./create/create-user.component";
import { UserListComponent } from "./list/list-user.component";
import { UserRoleComponent } from "./role/user-role.component";
import { DoctorListComponent } from "./doctor/doctor.component";
import { PatientListComponent } from "./patient/patient.component";

import { PasswordComponent } from "./password/password.component";
import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
  { path: 'list', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'doctor', component: DoctorListComponent, canActivate: [AuthGuard] },
  { path: 'patient', component: PatientListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: UserCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit_role/:userId', component: UserRoleComponent, canActivate: [AuthGuard] },
  { path: 'change_password/:userId', component: PasswordComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule {}
