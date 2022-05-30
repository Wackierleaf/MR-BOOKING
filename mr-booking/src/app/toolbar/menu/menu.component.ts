import {Component, Input} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/services/user";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() userData: User | null

  constructor(
    public readonly authService: AuthService,
  ) {}

}
