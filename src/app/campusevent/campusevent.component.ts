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
  ShowEventData//: Observable<any[]>
  isShowEvent: boolean;
  ScreenWidth
  //EventCount;
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.ScreenWidth = document.documentElement.clientWidth;
    this.db.list("/EventData", {
      query: {
        orderByChild: 'CreateTime'
      }
    })
      .map((arr) => {
        const narr = []
        arr = arr.reverse()
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].enable === true) {
            narr.push(arr[i])
          }
        }
        return narr
      })
      .share()
      .subscribe(data => {
        this.ShowEventData = data;
        // this.EventCount=this.ShowEventData.length;
        this.isShowEvent = true;

      })

    Observable.fromEvent(window, 'resize')
      .map(() => {
        return document.documentElement.clientWidth;
      })
      .subscribe(data => {
        this.ScreenWidth = data
      });

  }
  onShareEvent(url) {
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + url + ";src=sdkpreparse")
  }
  onSignUpEvent(url) {
    window.open(url)
  }

}
