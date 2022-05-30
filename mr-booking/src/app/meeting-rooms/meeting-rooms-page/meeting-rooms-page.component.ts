import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTabGroup} from "@angular/material/tabs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-meeting-rooms-page',
  templateUrl: './meeting-rooms-page.component.html',
  styleUrls: ['./meeting-rooms-page.component.scss']
})
export class MeetingRoomsPageComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup: MatTabGroup
  searchControl: FormControl = new FormControl()

  constructor() { }

  ngOnInit(): void {
    
  }

  switchTab(tabIdx: number) {
    this.tabGroup.selectedIndex = tabIdx
  }
}
