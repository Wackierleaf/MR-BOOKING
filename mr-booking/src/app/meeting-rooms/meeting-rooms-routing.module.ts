import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MeetingRoomsPageComponent} from "./meeting-rooms-page/meeting-rooms-page.component";
import {RoomEditorComponent} from "./room-editor/room-editor.component";
import {RoomViewComponent} from "./room-view/room-view.component";

const routes: Routes = [
  {path: '', component: MeetingRoomsPageComponent},
  {path: 'edit-room', component: RoomEditorComponent},
  {path: 'room-view/:id', component: RoomViewComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoomsRoutingModule { }
