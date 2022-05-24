import { Injectable } from '@angular/core';
import {User} from "./user";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Room} from "./room";

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  get rooms(): Observable<User[]> {
    return this.afs.collection<User>('rooms').valueChanges({idField: 'uid'})
  }

  getRoom(id: string) {
    return this.afs.doc<User>(`rooms/${id}`).valueChanges()
  }

  createMeetingRoom(newRoom: Room) {
    return this.afs.collection('rooms').add(newRoom)
  }
}
