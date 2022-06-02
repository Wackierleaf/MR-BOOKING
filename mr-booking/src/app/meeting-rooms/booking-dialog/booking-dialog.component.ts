import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Room} from "../../shared/interfaces/room";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {checkIsTimePeriodFree, dateRangeValidator} from "../../shared/services/validators";
import {BookingService} from "../../shared/services/booking.service";
import {BookingData} from "../../shared/interfaces/booking-data";
import {UserService} from "../../shared/services/user.service";
import {map, Observable} from "rxjs";
import {User} from "../../shared/interfaces/user";
import {MatTableDataSource} from "@angular/material/table";
import {AuthService} from "../../shared/services/auth.service";
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss']
})
export class BookingDialogComponent implements OnInit {
  bookingForm: FormGroup
  users = new MatTableDataSource<User>([])
  participantsIds: string[] = []
  columns = ['name']
  minDate = new Date()
  reservations: BookingData[]

  constructor(
    @Inject(MAT_DIALOG_DATA) public roomData: Room,
    private readonly formBuilder: FormBuilder,
    private readonly bookingService: BookingService,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }
  private initForm() {
    this.bookingForm = this.formBuilder.group({
      roomId: [this.roomData.uid],
      roomName: [this.roomData.name],
      date: [null, Validators.required],
      start: [null, Validators.required],
      end: [null, Validators.required],
      eventDescription: [null, Validators.required],
      participantsIds: [null, [Validators.required, Validators.maxLength(this.roomData.seats)]]
    }, {
      validators: [dateRangeValidator(), checkIsTimePeriodFree(this.reservations)]
    })
  }

  ngOnInit(): void {
    this.participantsIds.push(this.authService.userData.uid)
    this.userService.users.pipe(
      map(users => users.filter(user => user.uid !== this.authService.userData.uid))
    ).subscribe(usersData => this.users.data = usersData)

    this.bookingService.getReservationsByRoomId(this.roomData.uid as string).subscribe(reservations => {
      this.reservations = reservations
      this.initForm()
    })
  }

  addUserInParticipants(user: User) {
    if(this.participantsIds.find(participantsId => participantsId === user.uid)) {
      this.participantsIds = this.participantsIds.filter(participantsId => participantsId !== user.uid)
    } else {
      this.participantsIds.push(user.uid)
    }
    this.bookingForm.get('participantsIds')?.patchValue(this.participantsIds)
  }
}
