import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import {MaterialExModule} from "../shared/modules/material-ex.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    UserProfilePageComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MaterialExModule,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule
  ]
})
export class UserProfileModule { }
