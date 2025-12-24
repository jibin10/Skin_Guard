import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { AngularMaterialModule } from "../angular-material.module";
import { BookAppointmentComponent } from "./book-appointment/book-appointment.component";
import {AppointmentListComponent } from "./list-appointment/list-appointment.component";

import { AppointmentRoutingModule } from "./appointment-routing.module";

@NgModule({
  declarations: [
    BookAppointmentComponent,
    AppointmentListComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule,
    AppointmentRoutingModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ]
})
export class AppointmentModule {

}
