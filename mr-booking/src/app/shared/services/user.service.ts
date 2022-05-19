import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {User} from "./user";
import {collection} from "@angular/fire/firestore";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afs: AngularFirestore,
  ) {}

  getUser(id: string) {
    return this.afs.doc<User>(`users/${id}`).valueChanges()
  }
}
