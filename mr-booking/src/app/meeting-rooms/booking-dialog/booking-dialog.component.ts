import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Room} from "../../shared/interfaces/room";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {checkIsTimePeriodFree, dateRangeValidator} from "../../shared/services/validators";
import {BookingService} from "../../shared/services/booking.service";
import {BookingData} from "../../shared/interfaces/booking-data";
import {UserService} from "../../shared/services/user.service";
import {map} from "rxjs";
import {User} from "../../shared/interfaces/user";
import {MatTableDataSource} from "@angular/material/table";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss']
})
export class BookingDialogComponent implements OnInit {
  bookingForm: FormGroup
  mode: string
  users = new MatTableDataSource<User>([])
  participantsIds: string[] = []
  columns = ['name']
  minDate = new Date()
  reservations: BookingData[]

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: Room | BookingData | any,
    private readonly formBuilder: FormBuilder,
    private readonly bookingService: BookingService,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
  }

  private initForm(initData: BookingData | any) {
    this.bookingForm = this.formBuilder.group({
      roomId: [initData.roomId],
      roomName: [initData.roomName],
      date: [initData.date, Validators.required],
      start: [initData.start, Validators.required],
      end: [initData.end, Validators.required],
      eventDescription: [initData.eventDescription, Validators.required],
      participantsIds: [initData.participantsIds, [Validators.required, Validators.maxLength(this.dialogData.seats)]]
    }, {
      validators: [dateRangeValidator(), checkIsTimePeriodFree(this.reservations)]
    })
  }

  ngOnInit(): void {
    this.mode = this.dialogData.mode
    this.participantsIds.push(this.authService.userData.uid)
    this.userService.users.pipe(
      map(users => users.filter(user => user.uid !== this.authService.userData.uid))
    ).subscribe(usersData => this.users.data = usersData)

    this.bookingService.getReservationsByRoomId(this.dialogData.uid as string).subscribe(reservations => {
      this.reservations = reservations
      if (this.mode === 'add') {
        const initialData: BookingData | any = {
          roomId: this.dialogData.uid,
          roomName: this.dialogData.name,
          date: null,
          start: null,
          end: null,
          eventDescription: null,
          participantsIds: null
        }
        this.initForm(initialData)
        return
      }
      if (this.mode === 'edit') {
        const {start, end} = this.dialogData
        this.dialogData.start = `${start.getHours()}:${start.getMinutes()}`
        this.dialogData.end = `${end.getHours()}:${end.getMinutes()}`
        this.initForm(this.dialogData)
        this.participantsIds = this.dialogData.participantsIds
        this.bookingForm.get('participantsIds')?.patchValue(this.dialogData.participantsIds)
      }
    })
  }

  addUserInParticipants(user: User) {
    if (this.participantsIds.find(participantsId => participantsId === user.uid)) {
      this.participantsIds = this.participantsIds.filter(participantsId => participantsId !== user.uid)
    } else {
      this.participantsIds.push(user.uid)
    }
    this.bookingForm.get('participantsIds')?.patchValue(this.participantsIds)
  }

  isUserInParticipants(user: User) {
    return this.dialogData.participantsIds.find((partId: string) => partId === user.uid)
  }
}
