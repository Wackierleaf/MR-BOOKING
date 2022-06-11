import {Injectable} from '@angular/core';
import {map, Observable, zip} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Room} from "../interfaces/room";

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
    return this.afs.doc<Room>(`rooms/${id}`).valueChanges({idField: 'uid'})
  }

  createMeetingRoom(newRoom: Room) {
    return this.afs.collection('rooms').add(newRoom)
  }

  deleteRoom(id: string) {
    return this.afs.doc<Room>(`rooms/${id}`).delete()
  }

  searchRoom(searchStr: string) {
    const searchResByName = this.afs.collection('rooms', ref => ref
      .orderBy('name')
      .startAt(searchStr)
      .endAt(searchStr + '\uf8ff'))
      .valueChanges({idField: 'uid'})
    const searchResByDesc = this.afs.collection('rooms', ref => ref
      .orderBy('description')
      .startAt(searchStr)
      .endAt(searchStr + '\uf8ff'))
      .valueChanges({idField: 'uid'})

    return zip(searchResByName, searchResByDesc).pipe(
      map(searchRes => {
        const combinedRes = [...searchRes[0], ...searchRes[1]]
        return combinedRes as Room[]
      })
    )
  }

  updateRoom(roomData: Room) {
    return this.afs.doc<Room>(`rooms/${roomData.uid}`).set(roomData, {merge: true})
  }
}
