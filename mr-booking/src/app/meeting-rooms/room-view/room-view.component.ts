import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomsService} from "../../shared/services/rooms.service";
import {Room} from "../../shared/interfaces/room";
import {MatDialog} from "@angular/material/dialog";
import {BookingDialogComponent} from "../booking-dialog/booking-dialog.component";
import {TimeHelper} from "../../shared/services/TimeHelper";
import {BookingData} from "../../shared/interfaces/booking-data";
import {BookingService} from "../../shared/services/booking.service";

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
    private readonly dialog: MatDialog,
    private readonly bookingService: BookingService
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

    this.subList$.add(
      dialogRef.afterClosed().subscribe(async result => {
        const booking: BookingData = {
          date: result.date,
          start: TimeHelper.getDateObjectFromTimeStr(result.date, result.start),
          end: TimeHelper.getDateObjectFromTimeStr(result.date, result.end),
          eventDescription: result.eventDescription
        }
        await this.bookingService.bookRoom(booking)
      })
    )
  }

  ngOnDestroy() {
    this.subList$.unsubscribe()
  }
}
