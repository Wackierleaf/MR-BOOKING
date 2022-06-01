import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {User} from "../interfaces/user";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: User

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public userService: UserService
  ) {

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userService.getUser(user.uid).subscribe(userData => this.userData = userData as User)
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  async signIn(email: string, password: string) {
    await this.afAuth.signInWithEmailAndPassword(email, password)
    await this.router.navigate([''])
  }

  async signUp(email: string, password: string, name: string, city: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.setUserData(result.user, name, city)
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  async sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  setUserData(user: any, name: string, city: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: name,
      role: 'USER',
      city: city,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  async signOut() {
    await this.afAuth.signOut()
    localStorage.removeItem('user');
    await this.router.navigate(['login']);
  }
}
