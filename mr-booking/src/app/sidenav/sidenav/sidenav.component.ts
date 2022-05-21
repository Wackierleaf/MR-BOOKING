import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild('nav', {static: true}) public sidenav: MatSidenav;
  constructor(
  ) {}

  ngOnInit(): void {
  }

  openSidenav() {
    console.log('sdf')
    this.sidenav.toggle()
  }

}
