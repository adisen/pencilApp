import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<firebase.User | null>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  login() {
    this.firebaseAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.firebaseAuth.signOut();
  }

  isLoggedIn() {
    if (this.user) {
      return true;
    } else {
      return false;
    }
  }
}
