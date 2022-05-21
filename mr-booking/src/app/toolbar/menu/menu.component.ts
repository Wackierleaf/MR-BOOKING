import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {UserService} from "../../shared/services/user.service";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  userName: Observable<string>

  constructor(
    public readonly authService: AuthService,
    private readonly userService: UserService
  ) {


    this.authService.afAuth.authState.subscribe(data => {
        if (data) {
          this.userName = this.userService.getUser(data.uid).pipe(
            // @ts-ignore
            map(user => user.displayName as string)
          )
        }
      }
    )
  }

  ngOnInit(): void {
  }

}
