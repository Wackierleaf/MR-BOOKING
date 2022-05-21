import {Component, EventEmitter, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {marker as _} from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() sidenavOpen: EventEmitter<any> = new EventEmitter<any>()

  isRuLang = true;

  constructor(
    private readonly translationService: TranslateService,
  ) { }

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

}
