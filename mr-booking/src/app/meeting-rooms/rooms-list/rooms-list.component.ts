import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Room} from "../../shared/services/room";
import {debounceTime, distinctUntilChanged, Subscription} from "rxjs";
import {RoomsService} from "../../shared/services/rooms.service";
import {DeleteConfirmationComponent} from "../../general-components/delete-confirmation/delete-confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit, OnDestroy {
  @Input() searchControl: FormControl
  rooms = new MatTableDataSource<Room>([])
  displayedColumns = ['name', 'seats', 'description', 'tools', 'actions']

  private readonly subList$ = new Subscription()

  constructor(
    private readonly roomsService: RoomsService,
    public dialog: MatDialog
  ) {
  }

  private initDataSource() {
    this.subList$.add(
      this.roomsService.rooms.subscribe(roomsData => this.rooms.data = roomsData)
    )
  }

  private initSearchField() {
    this.subList$.add(
      this.searchControl.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
      ).subscribe(searchVal => {
        if(searchVal && searchVal.length >= 3) {
          this.roomsService.searchRoom(searchVal)
            .subscribe(searchResult => this.rooms.data = searchResult as Room[])
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

  deleteRoom(uid: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: 'fit-content',
      height: 'fit-content'
    })
    this.subList$.add(
      dialogRef.afterClosed().subscribe(async res => {
        if(res) {
          await this.roomsService.deleteRoom(uid)
        }
      })
    )
  }

  ngOnDestroy() {
    this.subList$.unsubscribe()
  }
}
