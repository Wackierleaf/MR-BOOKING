import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingRoomsListComponent } from './meeting-rooms-list/meeting-rooms-list.component';
import {MeetingRoomsRoutingModule} from "./meeting-rooms-routing.module";



@NgModule({
  declarations: [
    MeetingRoomsListComponent
  ],
  imports: [
    CommonModule,
    MeetingRoomsRoutingModule
  ]
})
export class MeetingRoomsModule { }
