import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// firebase
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
// rxjs
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// model
import { User } from './_user.model';
//import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })

export class AuthService {
  user$:Observable<any>;
  constructor(
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private router:Router,
  ) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user)
          // if true switch to observable of user
          { return this.afs.doc<User>(`users/${user.uid}`).valueChanges(); }
        else {
          // return observable of null ; to remain the return as observable
          return of(null);
        }
      })
    )
  }
  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
  async googleSignin() {
    let provider = new auth.GoogleAuthProvider();
    let credential = await this.afAuth.auth.signInWithPopup(provider);
    this.updateUserData(credential.user);
    this.router.navigate(['/members']);
  }
  private updateUserData(user) {
    // sets user data to firestore on login
    let userRef:AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    let data = {
      uid: user.uid, 
      email: user.email, 
      photoURL: user.photoURL, 
      displayName: user.displayName,
    }
    return userRef.set(data, { merge: true });
  }
}
