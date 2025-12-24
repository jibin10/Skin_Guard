import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ConsultationListComponent } from "./list/list.component";
import { ArchivesComponent } from "./archives/archives.component";

import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
  { path: 'list', component: ConsultationListComponent, canActivate: [AuthGuard] },
  { path: 'archives', component: ArchivesComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ConsultationRoutingModule {}
