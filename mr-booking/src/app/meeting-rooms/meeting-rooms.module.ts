import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingRoomsPageComponent } from './meeting-rooms-page/meeting-rooms-page.component';
import {MeetingRoomsRoutingModule} from "./meeting-rooms-routing.module";
import {MaterialExModule} from "../shared/modules/material-ex.module";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { AddNewRoomComponent } from './add-new-room/add-new-room.component';
import { RoomEditorComponent } from './room-editor/room-editor.component';
import { RoomViewComponent } from './room-view/room-view.component';
import { BookingDialogComponent } from './booking-dialog/booking-dialog.component';



@NgModule({
  declarations: [
    MeetingRoomsPageComponent,
    RoomsListComponent,
    AddNewRoomComponent,
    RoomEditorComponent,
    RoomViewComponent,
    BookingDialogComponent
  ],
  imports: [
    CommonModule,
    MeetingRoomsRoutingModule,
    MaterialExModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class MeetingRoomsModule { }
