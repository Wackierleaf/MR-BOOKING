import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {MyErrorStateMatcher} from "../../shared/services/ErrorStateMatcher";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  // @ts-ignore
  registrationForm: FormGroup;
  hide: boolean = true;
  hideRepeatedPassword: boolean = true;
  errorMatcher = new MyErrorStateMatcher();

  constructor(
    private readonly dialogRef: MatDialogRef<SignUpComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: [],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      repeatedPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      isAdmin: [false]
    }, {validators: this.checkPasswords})
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('repeatedPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  submitRegisterForm() {
    const {name, email, city, password} = this.registrationForm.value
    this.authService.signUp(email, password, name, city).then(() => this.close())
  }

  close() {
    this.dialogRef.close();
  }
}
