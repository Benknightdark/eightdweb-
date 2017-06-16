import { Component, OnInit } from '@angular/core';
import { AccountService } from "app/services/account.service";

@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.css']
})
export class AdminlayoutComponent implements OnInit {

  constructor(private account:AccountService) { }

  ngOnInit() {
      $('.collapsible').collapsible();
      $('.button-collapse').sideNav({
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
      });
  }
  onClick(){
  this.account.Logout()
  }

}
