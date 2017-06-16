import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UUID } from 'angular2-uuid';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-campusphotosmanage',
  templateUrl: './campusphotosmanage.component.html',
  styleUrls: ['./campusphotosmanage.component.css']
})
export class CampusphotosmanageComponent implements OnInit {
  CampusEventPhotos = {
    id: '',
    Name: '',
    ImageArray: [],
    GallaryUrl:"",
    CreateTime:"",
    UpdateTime:""
  }
  ImageArray = [];
  constructor() { }

  ngOnInit() {
  }
  uploadtask() {
    for (let i = 0; i < this.ImageArray.length; i++) {
      firebase.storage().ref().child("/test/" + i + ".jpg").putString(this.ImageArray[i], 'base64').then((snapshot) => {
        console.log(snapshot)
      })

    }

  }
  imageUploaded(data) {
    //console.log(data)
    this.ImageArray.push(data["src"].replace("data:image/jpeg;base64,", ""));
    console.log(this.ImageArray)
    // console.log(this.DMImage)
  }
  imageRemoved(event) {
    // this.MetaFormDes.imageinfo = "";
    //console.log(event)
  }
  disableSendButton(event) {
    //console.log(event)
  }

}
