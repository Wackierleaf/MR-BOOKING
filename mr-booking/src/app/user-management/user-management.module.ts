import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserManagementRoutingModule} from "./user-management-routing.module";
import { UserManagementPageComponent } from './user-management-page/user-management-page.component';
import {MaterialExModule} from "../shared/modules/material-ex.module";
import {TranslateModule} from "@ngx-translate/core";
import { UserEditorComponent } from './user-editor/user-editor.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    UserManagementPageComponent,
    UserEditorComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MaterialExModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class UserManagementModule { }
