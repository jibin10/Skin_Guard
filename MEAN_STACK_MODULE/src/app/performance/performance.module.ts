import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from "@angular/router";
import { MatTableModule } from '@angular/material/table';

import { PerfListComponent } from "./performance-list/performance-list.component";

import { AngularMaterialModule } from "../angular-material.module";
import { PerfRoutingModule } from "./performance-routing.module";

@NgModule({
  declarations: [
    PerfListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatIconModule,
    RouterModule,
    PerfRoutingModule,
    MatTableModule
  ]
})
export class PerformanceModule {}
