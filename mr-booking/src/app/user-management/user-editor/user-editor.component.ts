import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../shared/services/ErrorStateMatcher";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../shared/interfaces/user";
import {Roles} from "../../shared/services/user.service";

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  // @ts-ignore
  editorForm: FormGroup;
  hide: boolean = true;
  roles = Roles
  selectedFile: File
  photoUrl: string

  constructor(
    @Inject(MAT_DIALOG_DATA) public userData: User,
    private readonly dialogRef: MatDialogRef<UserEditorComponent>,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.photoUrl = this.userData.photoURL as string
    this.editorForm = this.formBuilder.group({
      displayName: [this.userData.displayName, Validators.required],
      email: [this.userData.email, [Validators.required, Validators.email]],
      city: [this.userData.city, Validators.required],
      role: [this.userData.role, Validators.required],
      photo: [this.userData.photoURL]
    }, )
  }

  get newData() {
    return {formData: this.editorForm.value, photo: this.selectedFile}
  }

  onFileSelected($event: any) {
    this.selectedFile = $event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => this.photoUrl = reader.result as string;
    reader.readAsDataURL(this.selectedFile)
  }
}
