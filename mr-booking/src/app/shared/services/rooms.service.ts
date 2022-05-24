import {Injectable} from '@angular/core';
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

  get rooms(): Observable<Room[]> {
    return this.afs.collection<Room>('rooms').valueChanges({idField: 'uid'})
  }

  getRoom(id: string) {
    return this.afs.doc<Room>(`rooms/${id}`).valueChanges()
  }

  createMeetingRoom(newRoom: Room) {
    return this.afs.collection('rooms').add(newRoom)
  }

  deleteRoom(id: string) {
    return this.afs.doc<Room>(`rooms/${id}`).delete()
  }
}
