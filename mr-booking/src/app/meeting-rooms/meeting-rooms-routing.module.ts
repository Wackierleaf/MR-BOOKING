import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MeetingRoomsPageComponent} from "./meeting-rooms-page/meeting-rooms-page.component";

const routes: Routes = [
  {path: '', component: MeetingRoomsPageComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoomsRoutingModule { }
