import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoomsService} from "../../shared/services/rooms.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Room} from "../../shared/services/room";

@Component({
  selector: 'app-room-editor',
  templateUrl: './room-editor.component.html',
  styleUrls: ['./room-editor.component.scss']
})
export class RoomEditorComponent implements OnInit, OnDestroy {

  roomEditingForm: FormGroup
  room: Room

  private readonly subList$ = new Subscription()
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly roomsService: RoomsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  private initForm(roomData: Room) {
    this.roomEditingForm = this.formBuilder.group({
      name: [roomData.name, [Validators.required, Validators.maxLength(80)]],
      seats: [roomData.seats, [Validators.required, Validators.max(100), Validators.min(1)]],
      whiteboard: [roomData.whiteboard],
      projector: [roomData.projector],
      description: [roomData.description, Validators.maxLength(200)]
    })
  }

  ngOnInit(): void {
    this.subList$.add(
      this.route.queryParams.subscribe(queryParams => {
        this.room = JSON.parse(queryParams['roomData'])
        this.initForm(this.room)
      })
    )
  }

  async submit() {
    const {name, seats, whiteboard, projector, description} = this.roomEditingForm.value
    this.room.name = name
    this.room.seats = seats
    this.room.whiteboard = whiteboard
    this.room.projector = projector
    this.room.description = description
    await this.roomsService.updateRoom(this.room)
    await this.router.navigate(['mr-management'])
  }

  ngOnDestroy() {
    this.subList$.unsubscribe()
  }
}
