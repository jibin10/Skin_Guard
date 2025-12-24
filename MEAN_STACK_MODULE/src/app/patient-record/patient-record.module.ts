import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from "@angular/router";
import { MatTableModule } from '@angular/material/table';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';

import { PRListComponent } from "./patient-record-list/patient-record-list.component";

import { AngularMaterialModule } from "../angular-material.module";
import { PRRoutingModule } from "./patient-record-routing.module";


@NgModule({
  declarations: [
    PRListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatIconModule,
    RouterModule,
    PRRoutingModule,
    MatTableModule,
  ]
})
export class PRModule {}
