import { NgModule } from "@angular/core";
import { AuthGuard } from "../auth/auth.guard";
import { RouterModule, Routes } from "@angular/router";

import { AdvancedComponent } from "./advanced-test/advanced.component";
import { QuickTestComponent } from "./quick-test/quick.component";
import { ProcessComponent } from "./process/process.component";
import { ListResultsComponent } from "./list-results/list-results.component";


const routes: Routes = [
  { path: 'list', component: ListResultsComponent, canActivate: [AuthGuard] },
  { path: 'process', component: ProcessComponent, canActivate: [AuthGuard] },
  { path: 'quick/:userId/:appId', component: QuickTestComponent, canActivate: [AuthGuard] },
  { path: 'advanced/:userId/:appId', component: AdvancedComponent, canActivate: [AuthGuard] },
  { path: 'edit/:recordId', component: ProcessComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InspectRoutingModule {}
