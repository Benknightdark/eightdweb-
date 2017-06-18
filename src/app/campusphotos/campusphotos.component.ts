import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { GalleryService } from "ng-gallery";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-campusphotos',
  templateUrl: './campusphotos.component.html',
  styleUrls: ['./campusphotos.component.css']
})
export class CampusphotosComponent implements OnInit {
  zone: any;
  showphotos: boolean = false;
  CampusPhotos;
  ScreenWidth
  constructor(private db: AngularFireDatabase, private ngZone: NgZone) { }

  ngOnInit() {
    this.ScreenWidth = document.documentElement.clientWidth;

    this.db.list("/CampusPhotos", {
      query: {
        orderByChild: 'CreateTime'
      }
    }).map((arr) => {
      const narr = []
      arr = arr.reverse()
      for (let i = 0; i < arr.length; i++) {
        // if (arr[i].enable === true) {
        narr.push(arr[i])
        //  }
      }
      return narr
    }).share()
      .subscribe(data => {
        this.CampusPhotos = data;
        this.showphotos = true;
        this.ngZone.onMicrotaskEmpty.first().subscribe(() => {
          $('.carousel.carousel-slider').carousel({ fullWidth: true, indicators: true });
        });
      })

    Observable.fromEvent(window, 'resize')
      .map(() => {
        return document.documentElement.clientWidth;
      })
      .subscribe(data => {

        this.ScreenWidth = data
        console.log(this.ScreenWidth)
        $('.carousel.carousel-slider').carousel({ fullWidth: true, indicators: true });
      });
  }

  onShareGallary(url) {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + url + ';src=sdkpreparse')
  }
  onGotoGallary(url) {
    window.open(url)
  }

}
