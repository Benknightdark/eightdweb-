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
  CampusPhotos
  constructor(private db: AngularFireDatabase, private ngZone: NgZone) { }

  ngOnInit() {

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
          setInterval(function () {
            $('.carousel.carousel-slider').carousel('next');
          }, 3000); // every 2 seconds
        });

      })
  }

  // tslint:disable-next-line:use-life-cycle-interface

  onShareGallary(url) {
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + url + ";src=sdkpreparse")
  }
  onGotoGallary(url) {
    window.open(url)
  }

}
