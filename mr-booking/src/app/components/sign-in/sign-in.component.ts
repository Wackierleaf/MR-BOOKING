import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SignUpComponent} from "../sign-up/sign-up.component";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  hide: boolean = true;
  // @ts-ignore
  loginForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  openRegistrationWindow() {
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: 'fit-content',
      height: 'fit-content'
    })
  }

  login() {

  }
}
