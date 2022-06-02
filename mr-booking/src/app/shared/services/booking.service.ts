import {Injectable} from '@angular/core';
import {BookingData} from "../interfaces/booking-data";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, zip} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly collectionName = 'mr-reservations'
  constructor(
    private afs: AngularFirestore,
  ) { }
  private fixDates(reservations: BookingData[]) {
    return reservations.map(reservation => {
      reservation.date = new Date(reservation.date)
      reservation.start = new Date(reservation.start)
      reservation.end = new Date(reservation.end)
      return reservation
    })
  }

  bookRoom(data: BookingData) {
    return this.afs.collection<BookingData>(this.collectionName).add(data)
  }

  getReservationsByRoomId(roomId: string) {
    return this.afs.collection<BookingData>(this.collectionName, ref => ref
      .where('roomId', '==', roomId)).valueChanges({idField: 'uid'}).pipe(
        map(reservations => this.fixDates(reservations))
    )
  }

  deleteReservation(id: string) {
    return this.afs.doc<BookingData>(`${this.collectionName}/${id}`).delete()
  }

  getMeetingsForUser(id: string) {
    return this.afs.collection<BookingData>(this.collectionName, ref => ref
      .where('participantsIds', 'array-contains', id))
      .valueChanges({idField: 'uid'})
      .pipe(map(meetings => this.fixDates(meetings)))
  }

  updateReservation(newReservationData: BookingData) {
    return this.afs.doc<BookingData>(`${this.collectionName}/${newReservationData.uid}`).set(newReservationData, {merge: true})
  }

  searchMeetingByRoomNameAndDescription(searchStr: string) {
    const searchResByRName = this.afs.collection(this.collectionName, ref => ref
      .orderBy('roomName')
      .startAt(searchStr)
      .endAt(searchStr + '\uf8ff'))
      .valueChanges({idField: 'uid'})
    const searchResByDesc = this.afs.collection(this.collectionName, ref => ref
      .orderBy('eventDescription')
      .startAt(searchStr)
      .endAt(searchStr + '\uf8ff'))
      .valueChanges({idField: 'uid'})

    return zip(searchResByRName, searchResByDesc).pipe(
      map(searchRes => {
        const combinedRes = [...searchRes[0], ...searchRes[1]]
        return this.fixDates(combinedRes as BookingData[])
      })
    )
  }
}
