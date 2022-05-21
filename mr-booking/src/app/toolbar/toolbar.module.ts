import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {MaterialExModule} from "../shared/modules/material-ex.module";
import {TranslateModule} from "@ngx-translate/core";
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialExModule,
    TranslateModule
  ]
})
export class ToolbarModule { }
