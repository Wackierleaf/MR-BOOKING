import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingRoomsPageComponent } from './meeting-rooms-page/meeting-rooms-page.component';
import {MeetingRoomsRoutingModule} from "./meeting-rooms-routing.module";
import {MaterialExModule} from "../shared/modules/material-ex.module";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    MeetingRoomsPageComponent
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
