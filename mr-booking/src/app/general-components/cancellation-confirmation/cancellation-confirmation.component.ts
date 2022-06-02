import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-cancellation-confirmation',
  templateUrl: './cancellation-confirmation.component.html',
  styleUrls: ['./cancellation-confirmation.component.scss']
})
export class CancellationConfirmationComponent implements OnInit {
  reason = new FormControl(null, Validators.required)

  constructor() { }

  ngOnInit(): void {
  }

}
