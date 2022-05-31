import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomsService} from "../../shared/services/rooms.service";
import {Room} from "../../shared/services/room";
import {MatDialog} from "@angular/material/dialog";
import {BookingDialogComponent} from "../booking-dialog/booking-dialog.component";

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss']
})
export class RoomViewComponent implements OnInit, OnDestroy {
  room$: Observable<Room>
  roomData: Room

  private subList$ = new Subscription()
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly roomService: RoomsService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.subList$.add(
      this.route.params.subscribe(params => {
        const {id} = params
        this.room$ = this.roomService.getRoom(id) as Observable<Room>
        this.room$.subscribe(data => this.roomData = data)
      })
    )
  }

  goBack() {
    window.history.back()
  }

  openBookingDialog() {
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: {...this.roomData}
    })
  }

  ngOnDestroy() {
    this.subList$.unsubscribe()
  }
}
