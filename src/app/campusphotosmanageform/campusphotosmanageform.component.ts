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

  isFinishSubmit: boolean = true;
  uploadcount = 0
  title = "";
  DisableButton: boolean = false;
  RouteName = "";
  RouteParm = "";

  ReadytoRemoveImageArray = []
  EditPageUploadImagesCount = 0;
  EditPageUploadImagesArray = [];
  EditPageUploadImages = [];
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
          this.EditPageUploadImages = [];
        }
        if (this.RouteName == "edit") {
          this.title = "營隊花絮編輯頁面";
          this.DisableButton = false;
          this.ReadytoRemoveImageArray = [false, false, false]
          this.EditPageUploadImages = [{
            no: 0,
            IsEdit: "",
            src: ""
          },
          {
            no: 1,
            IsEdit: "",
            src: ""
          },
          {
            no: 2,
            IsEdit: "",
            src: ""
          },
          ];
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
      this.EditPageUploadImages[i]["IsEdit"] = selectedImage

    } else {
      this.EditPageUploadImagesCount--
      console.log(selectedImage)
      this.EditPageUploadImages[i]["IsEdit"] = selectedImage
      this.EditPageUploadImages[i]["src"] = ""
    }
    console.log(this.ReadytoRemoveImageArray)
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
                  confirm("成功建立營隊花絮")
                  //  console.log(af)
                  this.isFinishSubmit = !this.isFinishSubmit;
                }
                ).catch(e => { console.log(e) })
            }
            this.uploadcount = this.uploadcount + 1
          }).catch(error => console.log(error))

      }
    } else if (this.RouteName == 'edit') {
      const ListReadytoRemoveImageArraylength = (new List<any>(this.ReadytoRemoveImageArray))
        .Where(x => x === true)
        .Select(y => y).ToArray().length;

       this.EditPageUploadImages= (new List<any>(this.EditPageUploadImages))
        .Where(x => x.IsEdit === true)
        .Select(y => y).ToArray();
        console.log(test)
      //判斷是否更新圖片
      if (this.EditPageUploadImagesArray.length != 0) {
        if (this.EditPageUploadImagesArray.length == ListReadytoRemoveImageArraylength) {
          //插入更新圖片
          for (let j = 0; j < this.EditPageUploadImages.length; j++) {
            if (this.EditPageUploadImages[j].IsEdit == true && this.EditPageUploadImages[j].src == "") {
              this.EditPageUploadImages[j].src = this.EditPageUploadImagesArray[j]
            }
          }
          console.log(this.EditPageUploadImages)
          //更新圖片
          //console.log( this.ReadytoRemoveImageArray.length)
          for (let i = 0; i < this.EditPageUploadImages.length; i++) {
            console.log(this.EditPageUploadImages[i].IsEdit)
            if (this.EditPageUploadImages[i].IsEdit == true) {
              console.log(this.EditPageUploadImages[i])
              firebase.storage().ref().child("/" + this.CampusEventPhotos.id + "/" + i + ".jpg")
                .putString(this.EditPageUploadImages[i].src, 'base64')
                .then((snapshot) => {
                  console.log(snapshot)
                  console.log(snapshot.metadata.downloadURLs)
                  this.CampusEventPhotos.ImageUrlArray[i] = snapshot.metadata.downloadURLs[0];
                  console.log(this.CampusEventPhotos.ImageUrlArray)
                  this.db.object('/CampusPhotos/' + this.CampusEventPhotos.id)
                    .update({
                      Name: this.CampusEventPhotos.Name,
                      UpdateTime: Date.now().toString(),
                      ImageUrlArray: this.CampusEventPhotos.ImageUrlArray
                    })
                })
                .catch(function (error) {
                  console.log(error.message)
                  // Uh-oh, an error occurred!
                });
              // console.log(this.EditPageUploadImagesArray[i])
            }
          }
        } else {
          confirm("更新圖片數量不對")
        }
      } else {
        this.db.object('/CampusPhotos/' + this.CampusEventPhotos.id)
          .update({
            Name: this.CampusEventPhotos.Name,
            UpdateTime: Date.now().toString()

          })
      }
    }
    else {
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
