import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-meeting-rooms-page',
  templateUrl: './meeting-rooms-page.component.html',
  styleUrls: ['./meeting-rooms-page.component.scss']
})
export class MeetingRoomsPageComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup: MatTabGroup

  constructor() { }

  ngOnInit(): void {
  }

  switchTab(tabIdx: number) {
    this.tabGroup.selectedIndex = tabIdx
  }
}
