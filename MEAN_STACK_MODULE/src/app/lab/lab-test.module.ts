import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from "@angular/router";
import { MatTableModule } from '@angular/material/table';

import { LabTestListComponent } from "./lab-test-list/lab-test-list.component";
import { UpdateLabComponent } from "./update-lab-result/update-lab-result.component";

import { AngularMaterialModule } from "../angular-material.module";
import { LabRoutingModule } from "./lab-test-routing.module";

@NgModule({
  declarations: [
    LabTestListComponent,
    UpdateLabComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatIconModule,
    RouterModule,
    LabRoutingModule,
    MatTableModule,
  ]
})
export class LabModule {}
