import { Component, OnInit } from '@angular/core';
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
  test = ["https://firebasestorage.googleapis.com/v0/b/eightdweb.appspot.com/o/f511cfb2-f9a3-f758-35b0-eb4e1ea2904e%2F1.jpg?alt=media&token=c327ceb3-1b7f-4dd2-ad80-c633636e6f4f"]
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {

    this.db.list("/CampusPhotos")

      .subscribe(data => {
        this.CampusPhotos = data;
        this.showphotos = true;


      })


    setTimeout(() => {
      $('.carousel').carousel();
      setInterval(function () {
        $('.carousel').carousel('next');
      }, 2000); // every 2 seconds
      console.log("fasdfadf")
    }, 1000);



  }
  // tslint:disable-next-line:use-life-cycle-interface

  onShareGallary(url) {
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + url + ";src=sdkpreparse")
  }
  onGotoGallary(url) {
    window.open(url)
  }

}
