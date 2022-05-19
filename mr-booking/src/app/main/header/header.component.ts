import {Component, Input} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import {User} from "../../shared/services/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isRuLang = true;

  constructor(
    private readonly translationService: TranslateService
  ) { }

  get translationKey() {
    return this.isRuLang ? _('MAIN.LANGUAGES.RUSSIAN') : _('MAIN.LANGUAGES.ENGLISH');
  }

  switchLang() {
    this.isRuLang = !this.isRuLang;
    this.translationService.use(this.isRuLang ? 'ru' : 'en');
  }

}
