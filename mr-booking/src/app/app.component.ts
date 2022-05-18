import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mr Booking';
  constructor(
    public readonly translate: TranslateService,
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('ru');
  }
}
