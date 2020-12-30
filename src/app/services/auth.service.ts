import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: firebase.User | null;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    firebaseAuth.authState.subscribe((user) => {
      this.user = user;
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  login() {
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(
          (res) => {
            this.user = res.user;
            localStorage.setItem('user', JSON.stringify(this.user));
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  // Logout user and redirect to auth page
  logout() {
    this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/auth']);
    });
  }

  isAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    return user != null;
  }
}
