import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: firebase.User | null = null;

  constructor(private firebaseAuth: AngularFireAuth) {
    firebaseAuth.authState.subscribe((auth) => {
      this.user = auth;
    });
  }

  login() {
    this.firebaseAuth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  logout() {
    this.firebaseAuth.signOut();
  }

  isAuthenticated(): boolean {
    return this.user !== null;
  }
}
