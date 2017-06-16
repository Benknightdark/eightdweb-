import { Component, OnInit } from '@angular/core';
import { AccountService } from "app/services/account.service";
import { Observable } from 'rxjs/Observable';
import { Event, Router, Route } from '@angular/router';

@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.css']
})
export class AdminlayoutComponent implements OnInit {
  ScreenWidth = 0;
  constructor(private account: AccountService, private router: Router) { }

  ngOnInit() {
    $('.collapsible').collapsible();
    $('.button-collapse').sideNav({
      closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    });

    Observable.fromEvent(window, 'resize')
      .map(() => {
        return document.documentElement.clientWidth;
      })
      .subscribe(data => {
        this.ScreenWidth = data
        this.isCloseOnClick();
      });

    Observable.fromEvent(window, 'load')
      .map(() => {
        return document.documentElement.clientWidth;
      })
      .subscribe(data => {
        this.ScreenWidth = data
        this.isCloseOnClick();
      });
  }

  isCloseOnClick() {
    if (this.ScreenWidth < 992) {
      $('.button-collapse').sideNav({
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
      });
    } else {
      $('.button-collapse').sideNav({
        closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
      });
    }
  }
  onClick() {
    this.account.Logout()
  }

}
