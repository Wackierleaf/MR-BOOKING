import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Room} from "../../shared/services/room";
import {Subscription} from "rxjs";
import {RoomsService} from "../../shared/services/rooms.service";

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit, OnDestroy {
  rooms = new MatTableDataSource<Room>([])
  displayedColumns = ['name', 'seats', 'description', 'tools', 'actions']

  private readonly subList$ = new Subscription()
  constructor(
    private readonly roomsService: RoomsService
  ) { }

  private initDataSource() {
    this.subList$.add(
      this.roomsService.rooms.subscribe(roomsData => this.rooms.data = roomsData)
    )
  }

  ngOnInit(): void {
    this.initDataSource()
  }

  ngOnDestroy() {
    this.subList$.unsubscribe()
  }

  async deleteRoom(uid: string) {
    await this.roomsService.deleteRoom(uid)
  }
}
