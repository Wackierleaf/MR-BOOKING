import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoomsService} from "../../shared/services/rooms.service";

@Component({
  selector: 'app-add-new-room',
  templateUrl: './add-new-room.component.html',
  styleUrls: ['./add-new-room.component.scss']
})
export class AddNewRoomComponent implements OnInit {
  @Output() tabIdxChanged = new EventEmitter<number>()

  roomCreationForm: FormGroup

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly roomsService: RoomsService
  ) { }

  private initForm() {
    this.roomCreationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(80)]],
      seats: [0, [Validators.required, Validators.max(100), Validators.min(1)]],
      whiteboard: [false],
      projector: [false],
      description: ['', Validators.maxLength(200)]
    })
  }

  ngOnInit(): void {
    this.initForm()
  }

  closeAddForm() {
    this.tabIdxChanged.emit(0)
    this.roomCreationForm.reset()
  }

  async submit() {
    await this.roomsService.createMeetingRoom(this.roomCreationForm.value)
    this.closeAddForm()
  }
}
