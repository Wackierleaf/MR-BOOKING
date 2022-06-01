import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Roles, UserService} from "../../shared/services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {User} from "../../shared/interfaces/user";

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit, OnDestroy {
// @ts-ignore
  editorForm: FormGroup;
  isEditableStateActive: boolean = false
  hide: boolean = true;
  roles = Roles
  selectedFile: File
  photoUrl: string
  userData: User

  private subList$ = new Subscription()

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService
  ) {
  }

  private init(userData: User) {
    this.photoUrl = userData.photoURL as string
    this.editorForm = this.formBuilder.group({
      displayName: [userData.displayName, Validators.required],
      email: [userData.email, [Validators.required, Validators.email]],
      city: [userData.city, Validators.required],
      role: [userData.role, Validators.required],
      photo: [userData.photoURL]
    },)
    this.editorForm.disable()
  }

  ngOnInit(): void {
    this.subList$.add(
      this.route.params.subscribe(params => {
        const {id} = params
        this.subList$.add(
          this.userService.getUser(id).subscribe(data => {
            this.userData = data as User
            this.init(data as User)
          })
        )
      })
    )
  }

  get newData() {
    return {formData: this.editorForm.value, photo: this.selectedFile}
  }

  onFileSelected($event: any) {
    this.editorForm.markAsTouched()
    this.selectedFile = $event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => this.photoUrl = reader.result as string;
    reader.readAsDataURL(this.selectedFile)
  }

  ngOnDestroy() {
    this.subList$.unsubscribe()
  }

  activateEditing() {
    this.isEditableStateActive = true
    if (this.userData.role === Roles.USER) {
      this.editorForm.get('displayName')?.enable()
      this.editorForm.get('city')?.enable()
      this.editorForm.get('photo')?.enable()
      return
    }

    if (this.userData.role === Roles.ADMIN) {
      this.editorForm.enable()
    }
  }

  deactivateEditing() {
    if (this.editorForm.untouched) {
      this.isEditableStateActive = false
      this.editorForm.disable()
    } else {
      this.init(this.userData)
      this.isEditableStateActive = false
    }
  }

  async updateProfile() {
    const formValue = this.editorForm.getRawValue()
    this.userData.displayName = formValue.displayName
    this.userData.role = formValue.role
    this.userData.city = formValue.city
    this.userData.email = formValue.email
    this.isEditableStateActive = false
    if (this.selectedFile) {
      this.userService.uploadUserPhotoAndUpdateData(this.userData, this.selectedFile).subscribe()
      return
    }
    await this.userService.updateUser(this.userData)
  }
}
