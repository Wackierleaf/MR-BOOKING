import {Component, Input} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/interfaces/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() userData: User | null

  constructor(
    public readonly authService: AuthService,
    private readonly router: Router
  ) {}

  async openUserProfile() {
    await this.router.navigate(['user-profile', this.userData?.uid])
  }
}
