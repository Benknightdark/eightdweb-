import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: 'app-campusphotos',
  templateUrl: './campusphotos.component.html',
  styleUrls: ['./campusphotos.component.css']
})
export class CampusphotosComponent implements OnInit {
  showphotos:boolean=false;
CampusPhotos
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
this.db.list("/CampusPhotos").subscribe(data=>{
  this.CampusPhotos=data;
  this.showphotos=true;
})
  }
  onShareGallary(url) {
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + url + ";src=sdkpreparse")
  }
  onGotoGallary(url) {
    window.open(url)
  }

}
