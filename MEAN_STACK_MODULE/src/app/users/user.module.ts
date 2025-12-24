import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AngularMaterialModule } from "../angular-material.module";
import { UserCreateComponent } from "./create/create-user.component";
import { UserListComponent } from "./list/list-user.component";
import { UserRoleComponent } from "./role/user-role.component";

import { DoctorListComponent } from "./doctor/doctor.component";
import { PatientListComponent } from "./patient/patient.component";

import { PasswordComponent } from "./password/password.component";
import { UserRoutingModule } from "./user-routing.module";

@NgModule({
  declarations: [
    UserCreateComponent,
    UserListComponent,
    UserRoleComponent,
    DoctorListComponent,
    PatientListComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule,
    UserRoutingModule
  ]
})
export class UserModule {

}
