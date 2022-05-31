import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Room} from "../../shared/services/room";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {dateRangeValidator} from "../../shared/services/validators";

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss']
})
export class BookingDialogComponent implements OnInit {
  bookingForm: FormGroup
  minDate = new Date()

  constructor(
    @Inject(MAT_DIALOG_DATA) public roomData: Room,
    private readonly formBuilder: FormBuilder
  ) { }
  private init() {
    this.bookingForm = this.formBuilder.group({
      date: [null, Validators.required],
      start: [null, Validators.required],
      end: [null, Validators.required],
      eventDescription: [null, Validators.required]
    }, {
      validators: [dateRangeValidator()]
    })
  }

  ngOnInit(): void {
    this.init()
  }

}
