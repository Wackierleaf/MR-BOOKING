import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsPageComponent } from './meetings-page/meetings-page.component';
import {MeetingsManagementRoutingModule} from "./meetings-management-routing.module";
import {MaterialExModule} from "../shared/modules/material-ex.module";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import { MeetingsListComponent } from './meetings-list/meetings-list.component';



@NgModule({
  declarations: [
    MeetingsPageComponent,
    MeetingsListComponent
  ],
  imports: [
    CommonModule,
    MeetingsManagementRoutingModule,
    MaterialExModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class MeetingsManagementModule { }
