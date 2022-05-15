import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any

  private tokenName = 'user'
  constructor(
    public readonly afs: AngularFirestore,
    public readonly afAuth: AngularFireAuth,
    public readonly router: Router,
    public readonly ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user
        localStorage.setItem(this.tokenName, JSON.stringify(this.userData))
        JSON.parse(localStorage.getItem(this.tokenName)!)
      }
    })
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate(['main'])
        });
        this.setUserData(result.user)
      }).catch(error => {
        window.alert(error.message)
      })
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user')
      this.router.navigate(['sign-in'])
    })
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.id}`
    )

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }

    return userRef.set(userData, {
      merge: true
    })
  }
}
