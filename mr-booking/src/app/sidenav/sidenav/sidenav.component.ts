import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild('nav', {static: true}) public sidenav: MatSidenav;
  constructor(
    public readonly auth: AuthService
  ) {}

  ngOnInit(): void {
  }

  openSidenav() {
    this.sidenav.toggle()
  }

}
