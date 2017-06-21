import { Component, OnInit, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { UUID } from 'angular2-uuid';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs'
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { List } from 'linqts';
@Component({
  selector: 'app-campusphotosmanageform',
  templateUrl: './campusphotosmanageform.component.html',
  styleUrls: ['./campusphotosmanageform.component.css']
})
export class CampusphotosmanageformComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private ngZone: NgZone) { }
  CampusEventPhotos = {
    id: '',
    Name: '',
    ImageUrlArray: [],
    GallaryUrl: "",
    CreateTime: "",
    UpdateTime: ""
  }
  ImageArray = [];
  ReadytoRemoveImageArray = []
  isFinishSubmit: boolean = true;
  uploadcount = 0
  title = "";
  DisableButton: boolean = false;
  RouteName = "";
  RouteParm = "";
  EditPageUploadImagesCount = 0;
  EditPageUploadImagesArray = [];
  ngOnInit() {

    this.route.url.subscribe(a => {
      this.RouteName = a[1].path;


      if (a[1].path == "create")
      { this.title = "營隊花絮建立頁面" }
      // tslint:disable-next-line:one-line
      else {
        this.RouteParm = a[2].path;
        if (this.RouteName == "detail") {
          this.title = "營隊花絮明細頁面";
          this.DisableButton = true;
          this.ReadytoRemoveImageArray = []
          this.EditPageUploadImagesArray = [];
        }
        if (this.RouteName == "edit") {
          this.title = "營隊花絮編輯頁面";
          this.DisableButton = false;
          this.ReadytoRemoveImageArray = [false, false, false]

          this.EditPageUploadImagesArray = [];
        }
        this.db.object('/CampusPhotos/' + this.RouteParm).subscribe(data => {
          this.CampusEventPhotos = data;
          // this.ngZone.onMicrotaskEmpty.first().subscribe(() => {
          //   $('.materialboxed').materialbox();

        })
      }
    })
  }
  onChange(i, selectedImage) {
    if (selectedImage) {

      this.EditPageUploadImagesCount++
      console.log(selectedImage)

    } else {
      this.EditPageUploadImagesCount--
      console.log(selectedImage)
    }
  }
  onSubmit(f) {
    if (this.ImageArray.length != 0) {

      if (this.RouteName == "create") {
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

      }else{

      }


    } else {
      confirm("沒有上傳圖片")
    }
  }
  imageUploaded(data) {
    if (this.RouteName == "create") {
      this.ImageArray.push(data["src"].replace("data:image/jpeg;base64,", ""));
    } else {
      this.EditPageUploadImagesArray.push(data["src"].replace("data:image/jpeg;base64,", ""))
      console.log(this.EditPageUploadImagesArray)
    }

  }
  imageRemoved(event) {
    const idx = this.EditPageUploadImagesArray.indexOf(event["src"].replace("data:image/jpeg;base64,", ""))
    this.EditPageUploadImagesArray.splice(idx, 1)
    console.log(this.EditPageUploadImagesArray)
  }
  disableSendButton(event) {
  }

}
