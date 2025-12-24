import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AngularMaterialModule } from "../angular-material.module";

import { CreatePrescriptionComponent } from "./create/create-prescription.component";

import { PrescriptionRoutingModule } from "./prescription-routing.module";

@NgModule({
  declarations: [
    CreatePrescriptionComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule,
    PrescriptionRoutingModule
  ]
})
export class PrescriptionModule {

}
