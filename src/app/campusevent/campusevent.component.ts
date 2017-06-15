import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import 'rxjs'
@Component({
  selector: 'app-campusevent',
  templateUrl: './campusevent.component.html',
  styleUrls: ['./campusevent.component.css']
})
export class CampuseventComponent implements OnInit {
  ShowEventData: Observable<any>
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.ShowEventData = this.db.list("/EventData", {
      query: {
        orderByChild: 'CreateTime',
      }
    }).map((arr) => arr.reverse()).share();
  }
  onShareEvent(url) {
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + url + ";src=sdkpreparse")
  }
  onSignUpEvent(url) {
    window.open(url)
  }

}
