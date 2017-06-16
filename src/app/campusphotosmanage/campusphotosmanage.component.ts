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
    ImageUrlArray: [],
    GallaryUrl: "",
    CreateTime: "",
    UpdateTime: ""
  }
  ImageArray= []
  isFinishSubmit: boolean = true;
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
  }
  onSubmit(f) {
    if (this.ImageArray.length != 0) {
      //console.log(f)

      this.CampusEventPhotos.id = UUID.UUID();


      this.CampusEventPhotos.CreateTime = Date.now().toString();
      this.CampusEventPhotos.UpdateTime = Date.now().toString();
      console.log(this.CampusEventPhotos)

      for (let i = 0; i < this.ImageArray.length; i++) {
        firebase.storage().ref().child("/" + this.CampusEventPhotos.id + "/" + i + ".jpg")
        .putString(this.ImageArray[i], 'base64').then((snapshot) => {
          console.log(snapshot)
        })

      }

    } else {
      confirm("沒有上傳圖片")
    }
  }

  imageUploaded(data) {
    console.log(data)
    //console.log(data)
    this.ImageArray.push(data["src"].replace("data:image/jpeg;base64,", ""));
    console.log(this.ImageArray)
    // console.log(this.DMImage)
  }
  imageRemoved(event) {
    // this.MetaFormDes.imageinfo = "";
    //console.log(event)
    console.log(event)
  }
  disableSendButton(event) {
    //console.log(event)
  }

}
