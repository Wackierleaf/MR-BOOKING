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
import {AuthService} from "../../shared/services/auth.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss']
})
export class RoomViewComponent implements OnInit, OnDestroy {
  room$: Observable<Room>
  roomData: Room
  roomReservations = new MatTableDataSource<BookingData>([]);
  displayedColumns = ['date', 'timePeriod', 'creatorName']

  private subList$ = new Subscription()
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly roomService: RoomsService,
    private readonly dialog: MatDialog,
    private readonly bookingService: BookingService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {


    this.subList$.add(
      this.route.params.subscribe(params => {
        const {id} = params
        this.room$ = this.roomService.getRoom(id) as Observable<Room>
        this.room$.subscribe(data => this.roomData = data)
        this.bookingService.getReservationsByRoomId(id)
          .subscribe(reservations => this.roomReservations.data = reservations)
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
        if (!result) {
          return
        }
        const booking: BookingData = {
          roomId: result.roomId,
          roomName: result.roomName,
          creatorId: this.authService.userData.uid,
          creatorName: this.authService.userData.displayName as string,
          date: result.date.toISOString(),
          start: TimeHelper.getDateObjectFromTimeStr(result.date, result.start).toISOString(),
          end: TimeHelper.getDateObjectFromTimeStr(result.date, result.end).toISOString(),
          eventDescription: result.eventDescription,
        }
        await this.bookingService.bookRoom(booking)
      })
    )
  }

  ngOnDestroy() {
    this.subList$.unsubscribe()
  }
}
