import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsListComponent } from './meetings-list/meetings-list.component';
import {MeetingsManagementRoutingModule} from "./meetings-management-routing.module";



@NgModule({
  declarations: [
    MeetingsListComponent
  ],
  imports: [
    CommonModule,
    MeetingsManagementRoutingModule
  ]
})
export class MeetingsManagementModule { }
