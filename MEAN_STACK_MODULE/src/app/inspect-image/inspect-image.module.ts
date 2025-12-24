import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from "@angular/router";
import { MatTableModule } from '@angular/material/table';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AdvancedComponent } from "./advanced-test/advanced.component";
import { QuickTestComponent } from "./quick-test/quick.component";
import { ProcessComponent } from "./process/process.component";
import { ListResultsComponent } from "./list-results/list-results.component";

import { AngularMaterialModule } from "../angular-material.module";
import { InspectRoutingModule } from "./inspect-routing.module";


@NgModule({
  declarations: [
    ProcessComponent,
    ListResultsComponent,
    QuickTestComponent,
    AdvancedComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatIconModule,
    RouterModule,
    InspectRoutingModule,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,

  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ]
})
export class InspectModule {}
