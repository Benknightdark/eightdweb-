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

    this.db.list("/CampusPhotos")

      .subscribe(data => {
        this.CampusPhotos = data;
        this.showphotos = true;
        this.ngZone.onMicrotaskEmpty.first().subscribe(() => {
          $('.carousel.carousel-slider').carousel({ fullWidth:true, indicators: true });
           $('.materialboxed').materialbox();
          // setInterval(function () {
          //   $('.carousel.carousel-slider').carousel('next');
          // }, 5000); // every 2 seconds
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
