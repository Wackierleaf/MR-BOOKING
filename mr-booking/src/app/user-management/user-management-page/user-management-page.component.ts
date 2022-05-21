import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {Subscription} from "rxjs";
import {User} from "../../shared/services/user";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfirmationComponent} from "../../general-components/delete-confirmation/delete-confirmation.component";
import {UserEditorComponent} from "../user-editor/user-editor.component";

@Component({
  selector: 'app-user-management-page',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.scss']
})
export class UserManagementPageComponent implements OnInit, OnDestroy {
  displayedCols: string[] = ['name', 'email', 'city', 'role', 'actions']
  private readonly subList$ = new Subscription()
  users: MatTableDataSource<User> = new MatTableDataSource<User>()

  constructor(
    public userService: UserService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
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

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        userData.displayName = result.displayName
        userData.email = result.email
        userData.city = result.city
        userData.role = result.role
        await this.userService.updateUser(userData)
      }
    })
  }
}
