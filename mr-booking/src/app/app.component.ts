import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "./shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  state : 'authorized' | 'welcome'

  title = 'Mr Booking';
  constructor(
    public readonly translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('ru');
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.state = this.authService.isLoggedIn ? 'authorized' : 'welcome'
    })
  }
}
