import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {marker as _} from '@biesbjerg/ngx-translate-extract-marker';
import {UserService} from "../../shared/services/user.service";
import {Observable, Subscription} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/services/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  @Output() sidenavOpen: EventEmitter<any> = new EventEmitter<any>()
  user$: Observable<User>

  isRuLang = true;

  private readonly subList$ = new Subscription()
  constructor(
    private readonly translationService: TranslateService,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
    this.subList$.add(
      this.authService.afAuth.authState.subscribe(data => {
        if(data){
          this.user$ = this.userService.getUser(data.uid) as Observable<User>
        }
      })
    )
  }

  get translationKey() {
    return this.isRuLang ? _('MAIN.LANGUAGES.RUSSIAN') : _('MAIN.LANGUAGES.ENGLISH');
  }

  switchLang() {
    this.isRuLang = !this.isRuLang;
    this.translationService.use(this.isRuLang ? 'ru' : 'en');
  }

  navigationToggle() {
    this.sidenavOpen.emit()
  }

  ngOnDestroy() {
    this.subList$.unsubscribe()
  }
}
