import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {debounceTime, distinctUntilChanged, Subscription} from "rxjs";
import {User} from "../../shared/interfaces/user";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfirmationComponent} from "../../general-components/delete-confirmation/delete-confirmation.component";
import {UserEditorComponent} from "../user-editor/user-editor.component";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-user-management-page',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.scss']
})
export class UserManagementPageComponent implements OnInit, OnDestroy {
  displayedCols: string[] = ['name', 'email', 'city', 'role', 'actions']
  users: MatTableDataSource<User> = new MatTableDataSource<User>()
  searchControl: FormControl = new FormControl()

  private readonly subList$ = new Subscription()
  constructor(
    public userService: UserService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.init()

    this.subList$.add(
      this.searchControl.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
      ).subscribe(searchVal => {
        if(searchVal && searchVal.length >= 3) {
          this.userService.searchUser(searchVal)
            .subscribe(searchResult => this.users.data = searchResult as User[])
        } else {
          this.init()
        }
      })
    )
  }

  init() {
    this.subList$.add(
      this.userService.users
        .subscribe(usersData => this.users.data = usersData)
    )
  }

  ngOnDestroy() {
    this.subList$.unsubscribe()
  }

  deleteUser(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: 'fit-content',
      height: 'fit-content'
    })

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.userService.deleteUser(id)
      }
    })
  }

  openUserEditor(userData: User) {
    const dialogRef = this.dialog.open(UserEditorComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: userData
    })

    dialogRef.afterClosed().subscribe( async result => {
      if (result) {
        userData.displayName = result.formData.displayName
        userData.email = result.formData.email
        userData.city = result.formData.city
        userData.role = result.formData.role
        if (result.photo) {
          this.userService.uploadUserPhotoAndUpdateData(userData, result.photo)
            .subscribe()
          return
        }
        await this.userService.updateUser(userData)
      }
    })
  }
}
