import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {User} from "./user";
import {collection} from "@angular/fire/firestore";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
 userCollection: Observable<any>;

  constructor(
    private afs: AngularFirestore,
  ) {}

  getUser(id: string) {
    return this.userCollection = this.afs.collection('users', ref =>
      ref.where('uid', '==', id)
    ) .valueChanges()
      .pipe(map(user => user[0] as User))
  }
}
