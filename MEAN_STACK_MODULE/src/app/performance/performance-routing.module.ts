import { NgModule } from "@angular/core";
import { AuthGuard } from "../auth/auth.guard";
import { RouterModule, Routes } from "@angular/router";

import { PerfListComponent } from "./performance-list/performance-list.component";

const routes: Routes = [
  { path: 'list', component: PerfListComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PerfRoutingModule {}
