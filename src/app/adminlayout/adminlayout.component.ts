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
  }
  onClick(){
  this.account.Logout()
  }

}
