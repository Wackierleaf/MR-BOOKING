import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "./user";
import {finalize, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
  }

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

  searchUser(searchStr: string) {
    return this.afs.collection('users', ref => ref
      .orderBy('displayName')
      .startAt(searchStr)
      .endAt(searchStr + '\uf8ff'))
      .valueChanges()
  }

  uploadUserPhotoAndUpdateData(userData: User, file: File) {
    const filePath = `images/${Date.now()}_${file.name}`
    const fileRef = this.storage.ref(filePath)
    return this.storage.upload(filePath, file).snapshotChanges().pipe(
      finalize(() => {
          fileRef.getDownloadURL().subscribe(async resp => {
            userData.photoURL = resp
            await this.updateUser(userData)
          })
        }
      )
    )
  }
}
