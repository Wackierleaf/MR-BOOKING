import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingRoomsPageComponent } from './meeting-rooms-page/meeting-rooms-page.component';
import {MeetingRoomsRoutingModule} from "./meeting-rooms-routing.module";
import {MaterialExModule} from "../shared/modules/material-ex.module";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { AddNewRoomComponent } from './add-new-room/add-new-room.component';



@NgModule({
  declarations: [
    MeetingRoomsPageComponent,
    RoomsListComponent,
    AddNewRoomComponent
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
