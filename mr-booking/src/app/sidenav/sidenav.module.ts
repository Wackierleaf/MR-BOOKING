import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavRoutingModule } from './sidenav-routing.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MaterialExModule} from "../shared/modules/material-ex.module";
import {ToolbarModule} from "../toolbar/toolbar.module";


@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    SidenavRoutingModule,
    MaterialExModule,
    ToolbarModule
  ]
})
export class SidenavModule { }
