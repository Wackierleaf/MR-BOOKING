import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../shared/services/ErrorStateMatcher";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/services/user";

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  // @ts-ignore
  editorForm: FormGroup;
  hide: boolean = true;
  errorMatcher = new MyErrorStateMatcher();

  constructor(
    @Inject(MAT_DIALOG_DATA) public userData: User,
    private readonly dialogRef: MatDialogRef<UserEditorComponent>,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.editorForm = this.formBuilder.group({
      displayName: [this.userData.displayName, Validators.required],
      email: [this.userData.email, [Validators.required, Validators.email]],
      city: [this.userData.city, Validators.required],
      role: [this.userData.role, Validators.required]
    }, )
  }

  get newData() {
    return this.editorForm.value
  }
}
