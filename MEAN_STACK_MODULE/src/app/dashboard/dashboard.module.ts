import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "../angular-material.module";
import { DashboardComponent } from "./dashboard.component";

import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    AngularMaterialModule,
    MatGridListModule,
    CommonModule
  ]
})
export class DashboardModule {}
