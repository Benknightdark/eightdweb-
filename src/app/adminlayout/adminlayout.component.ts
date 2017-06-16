import { Component, OnInit } from '@angular/core';
import { AccountService } from "app/services/account.service";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.css']
})
export class AdminlayoutComponent implements OnInit {

  constructor(private account: AccountService) { }
ScreenWidth;
  ngOnInit() {
    $('.collapsible').collapsible();
    $('.button-collapse').sideNav({
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    });
    Observable.fromEvent(window, 'resize')
      .map(() => {
        return document.documentElement.clientWidth;
      })
      .subscribe(data => {
        console.log(data)
        this.ScreenWidth=data
        //this.BrowserElement(data)
      });

    Observable.fromEvent(window, 'load')
      .map(() => {
        return document.documentElement.clientWidth;
      })
      .subscribe(data => {
         this.ScreenWidth=data
        //this.BrowserElement(data)
      });

  }

  onClick() {
    this.account.Logout()
  }

}
