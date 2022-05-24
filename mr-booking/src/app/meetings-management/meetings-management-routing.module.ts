import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MeetingsPageComponent} from "./meetings-page/meetings-page.component";

const routes: Routes = [
  {path: '', component: MeetingsPageComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingsManagementRoutingModule { }
