import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "../angular-material.module";
import { SuccessComponent } from "./success.component";
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    SuccessComponent
  ],
  imports: [
    AngularMaterialModule,
    MatGridListModule,
    CommonModule
  ]
})
export class SuccessModule {}
