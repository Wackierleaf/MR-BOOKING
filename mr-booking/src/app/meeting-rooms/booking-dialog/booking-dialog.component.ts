import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Room} from "../../shared/interfaces/room";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {checkIsTimePeriodFree, dateRangeValidator} from "../../shared/services/validators";
import {BookingService} from "../../shared/services/booking.service";
import {BookingData} from "../../shared/interfaces/booking-data";

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss']
})
export class BookingDialogComponent implements OnInit {
  bookingForm: FormGroup
  minDate = new Date()
  reservations: BookingData[]

  constructor(
    @Inject(MAT_DIALOG_DATA) public roomData: Room,
    private readonly formBuilder: FormBuilder,
    private readonly bookingService: BookingService
  ) { }
  private initForm() {
    this.bookingForm = this.formBuilder.group({
      roomId: [this.roomData.uid],
      date: [null, Validators.required],
      start: [null, Validators.required],
      end: [null, Validators.required],
      eventDescription: [null, Validators.required]
    }, {
      validators: [dateRangeValidator(), checkIsTimePeriodFree(this.reservations)]
    })
  }

  ngOnInit(): void {
    this.bookingService.getReservationsByRoomId(this.roomData.uid as string).subscribe(reservations => {
      this.reservations = reservations
      this.initForm()
    })
  }

}
