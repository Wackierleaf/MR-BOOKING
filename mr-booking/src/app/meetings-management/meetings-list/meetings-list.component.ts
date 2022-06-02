import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {BookingData} from "../../shared/interfaces/booking-data";
import {BookingService} from "../../shared/services/booking.service";
import {AuthService} from "../../shared/services/auth.service";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Subscription} from "rxjs";

@Component({
  selector: 'app-meetings-list',
  templateUrl: './meetings-list.component.html',
  styleUrls: ['./meetings-list.component.scss']
})
export class MeetingsListComponent implements OnInit, OnDestroy {
  @Input() searchControl: FormControl
  displayedColumns = ['date', 'roomName', 'timePeriod', 'description', 'creatorName']
  meetings = new MatTableDataSource<BookingData>([])

  private readonly subList$ = new Subscription()
  constructor(
    private readonly bookingService: BookingService,
    private readonly authService: AuthService
  ) { }

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
        if(searchVal && searchVal.length >= 3) {
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

  ngOnDestroy() {
    this.subList$.unsubscribe()
  }
}
