import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {VerifyEmailComponent} from "./verify-email/verify-email.component";
import {TranslateModule} from "@ngx-translate/core";
import {MaterialExModule} from "../shared/modules/material-ex.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    TranslateModule,
    MaterialExModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule { }
