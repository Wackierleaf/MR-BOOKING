import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "./user";
import {Observable} from "rxjs";

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

  get users(): Observable<User[]> {
    return this.afs.collection<User>('users').valueChanges()
  }

  deleteUser(id: string) {
    return this.afs.doc<User>(`users/${id}`).delete()
  }

  updateUser(user: User) {
    return this.afs.doc<User>(`users/${user.uid}`).set(user, {merge: true})
  }
}
