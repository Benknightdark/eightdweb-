import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private  afAuth: AngularFireAuth,private db: AngularFireDatabase ,private account:AccountService,private router:Router) {
  }

  // tslint:disable-next-line:member-ordering
  user: Observable<firebase.User>;
  // tslint:disable-next-line:member-ordering
  email = "";
  // tslint:disable-next-line:member-ordering
  password = "";

  ngOnInit() {
 if (localStorage.getItem("token")) {
      this.router.navigate(['/admin'])
    }

  }

  onSubmit(f) {
    this.account.Login(this.email, this.password);
    // this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
    // .then(a => console.log(a.uid))
    // .catch(err => console.log(err));

  }


}
