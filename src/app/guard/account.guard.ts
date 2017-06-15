import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AccountGuard implements CanActivate {
  u;
  constructor(private router: Router, private afAuth: AngularFireAuth) {
    if (localStorage.getItem("token")) {
      this.router.navigate(['/'])
    }
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {//: Observable<boolean> | Promise<boolean> | boolean




    if (localStorage.getItem("token")) {
      return true
    } else {
      this.router.navigate(['/'])
    }
  }
}
