import { Injectable } from '@angular/core';
import {BookingData} from "../interfaces/booking-data";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  bookRoom(data: BookingData) {
    return this.afs.collection('mr-reservations').add(data)
  }
}
