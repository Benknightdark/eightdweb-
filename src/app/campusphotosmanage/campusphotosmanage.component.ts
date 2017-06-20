import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UUID } from 'angular2-uuid';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs'
import * as moment from 'moment';
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
  ImageArray = []
  isFinishSubmit: boolean = true;
  uploadcount = 0
  rows;
  columns;
  showtable: boolean = false;
  constructor(private db: AngularFireDatabase) { }
  ngOnInit() {

    this.db.list('/CampusPhotos')
      .map(
      data => {
        const listdata = []
        for (let i = 0; i < data.length; i++) {
          listdata.push({
            Name: data[i].Name,
            CreateTime: moment.unix(data[i].CreateTime / 1000).format("YYYY/MM/DD hh:mm:ss"),
            UpdateTime: moment.unix(data[i].UpdateTime / 1000).format("YYYY/MM/DD hh:mm:ss"),
            id: data[i].id
          })
        }
        return listdata;
      }
      ).share().subscribe(data => {
        this.columns = [
          { prop: 'id' },
          { prop: 'Name' },
          { prop: 'CreateTime' },
          { prop: 'UpdateTime' },
        ];
        this.rows = data;
        console.log(data)
        this.showtable = true;
      });


  }
  onSubmit(f) {
    if (this.ImageArray.length != 0) {
      this.uploadcount = 0;
      this.isFinishSubmit = !this.isFinishSubmit;
      this.CampusEventPhotos.id = UUID.UUID();
      this.CampusEventPhotos.CreateTime = Date.now().toString();
      this.CampusEventPhotos.UpdateTime = Date.now().toString();
      for (let i = 0; i < this.ImageArray.length; i++) {
        firebase.storage().ref().child("/" + this.CampusEventPhotos.id + "/" + i + ".jpg")
          .putString(this.ImageArray[i], 'base64').then((snapshot) => {
            this.CampusEventPhotos.ImageUrlArray.push(snapshot.metadata.downloadURLs[0]);
            if (this.uploadcount == 2) {
              this.db.object('/CampusPhotos/' + this.CampusEventPhotos.id).set(this.CampusEventPhotos)
                .then(af => {
                  confirm("成功建立新營隊花絮")
                  //  console.log(af)
                  this.isFinishSubmit = !this.isFinishSubmit;
                }
                ).catch(e => { console.log(e) })
            }
            this.uploadcount = this.uploadcount + 1
          }).catch(error => console.log(error))
      }
    } else {
      confirm("沒有上傳圖片")
    }
  }
  imageUploaded(data) {
    this.ImageArray.push(data["src"].replace("data:image/jpeg;base64,", ""));
  }
  imageRemoved(event) {
    console.log(event)
  }
  disableSendButton(event) {
  }

}
