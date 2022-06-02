import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {BookingData} from "../../shared/interfaces/booking-data";
import {BookingService} from "../../shared/services/booking.service";
import {AuthService} from "../../shared/services/auth.service";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {
  CancellationConfirmationComponent
} from "../../general-components/cancellation-confirmation/cancellation-confirmation.component";
import {BookingDialogComponent} from "../../meeting-rooms/booking-dialog/booking-dialog.component";
import {TimeHelper} from "../../shared/services/TimeHelper";

@Component({
  selector: 'app-meetings-list',
  templateUrl: './meetings-list.component.html',
  styleUrls: ['./meetings-list.component.scss']
})
export class MeetingsListComponent implements OnInit, OnDestroy {
  @Input() searchControl: FormControl
  displayedColumns = ['date', 'roomName', 'timePeriod', 'description', 'creatorName', 'actions']
  meetings = new MatTableDataSource<BookingData>([])

  private readonly subList$ = new Subscription()

  constructor(
    private readonly bookingService: BookingService,
    public readonly authService: AuthService,
    private readonly dialog: MatDialog,
  ) {
  }

  private initDataSource() {
    const authSub$ = this.authService.afAuth.authState.subscribe(user => {
      this.subList$.add(
        this.bookingService.getMeetingsForUser(user?.uid as string)
          .subscribe(meetings => this.meetings.data = meetings)
      )
    })
    this.subList$.add(authSub$)
  }

  private initSearchField() {
    this.subList$.add(
      this.searchControl.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
      ).subscribe(searchVal => {
        if (searchVal && searchVal.length >= 3) {
          this.bookingService.searchMeetingByRoomNameAndDescription(searchVal)
            .subscribe(searchRes => this.meetings.data = searchRes)
        } else {
          this.initDataSource()
        }
      })
    )
  }

  ngOnInit(): void {
    this.initSearchField()
    this.initDataSource()
  }

  cancelMeeting(reservation: BookingData) {
    const dialogRef = this.dialog.open(CancellationConfirmationComponent)

    dialogRef.afterClosed().subscribe(async result => {
      if (result && reservation.uid) {
        await this.bookingService.deleteReservation(reservation.uid)
      }
    })
  }

  editMeeting(reservation: BookingData) {
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width: window.innerWidth < 500 ? '100%' : 'fit-content',
      maxWidth: window.innerWidth < 500 ? '100%' : 'fit-content',
      height: window.innerWidth < 500 ? '100%' : 'fit-content',
      data: {mode: 'edit', ...reservation}
    })

    this.subList$.add(
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          reservation.date = result.date.toLocaleString()
          reservation.start = TimeHelper.getDateObjectFromTimeStr(result.date, result.start).toLocaleString()
          reservation.end = TimeHelper.getDateObjectFromTimeStr(result.date, result.end).toLocaleString()
          reservation.participantsIds = result.participantsIds
          reservation.eventDescription = result.eventDescription
          await this.bookingService.updateReservation(reservation)
        }
      })
    )
  }

  ngOnDestroy() {
    this.subList$.unsubscribe()
  }
}
