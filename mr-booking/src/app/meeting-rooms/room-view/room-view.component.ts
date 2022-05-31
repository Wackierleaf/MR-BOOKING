import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomsService} from "../../shared/services/rooms.service";
import {Room} from "../../shared/services/room";

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss']
})
export class RoomViewComponent implements OnInit, OnDestroy {
  room$: Observable<Room>

  private subList$ = new Subscription()
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly roomService: RoomsService
  ) { }

  ngOnInit(): void {
    this.subList$.add(
      this.route.params.subscribe(params => {
        const {id} = params
        this.room$ = this.roomService.getRoom(id) as Observable<Room>
      })
    )
  }

  ngOnDestroy() {
    this.subList$.unsubscribe()
  }

  goBack() {
    window.history.back()
  }
}
