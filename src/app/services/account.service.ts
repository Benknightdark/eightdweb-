import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from "@angular/router";
import 'rxjs'

@Injectable()
export class AccountService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }
  Login(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(a => {
        if (a.uid) {
          localStorage.setItem("token",a.uid)
          this.router.navigate(["/admin"])
        } else {
          confirm(a.message)
        }
      }

      )
      .catch(err => confirm(err.message));
  }
  Logout() {
    this.afAuth.auth.signOut();
    localStorage.removeItem("token")
    this.router.navigate(["/"])

  }

}
