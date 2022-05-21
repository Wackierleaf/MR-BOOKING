import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MeetingRoomsListComponent} from "./meeting-rooms-list/meeting-rooms-list.component";

const routes: Routes = [
  {path: '', component: MeetingRoomsListComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoomsRoutingModule { }
