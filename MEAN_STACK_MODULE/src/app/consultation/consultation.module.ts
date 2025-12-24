import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "../angular-material.module";

import { ConsultationListComponent } from "./list/list.component";
import { ArchivesComponent } from "./archives/archives.component";
import { ConsultationRoutingModule } from "./consultation-routing.module";

@NgModule({
  declarations: [
    ConsultationListComponent,
    ArchivesComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule,
    ConsultationRoutingModule
  ]
})
export class ConsultationModule {

}
