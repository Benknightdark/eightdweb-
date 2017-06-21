import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UUID } from 'angular2-uuid';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campuseventmanageform',
  templateUrl: './campuseventmanageform.component.html',
  styleUrls: ['./campuseventmanageform.component.css']
})
export class CampuseventmanageformComponent implements OnInit {
  isFinishSubmit = true;
  DMImage = null;
  EventData = {
    id: "",
    title: "",
    content: "",
    websignurl: "",
    imageinfo: "",
    imagepath: "",
    enable: true,
    CreateTime: "",
    UpdateTime: "",

  };
  title = "";
  DisableButton: boolean = false;
  RouteName = "";
  RouteParm = "";
  IsImageReadyToChange: boolean = false;
  constructor(private db: AngularFireDatabase, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(a => {
      this.RouteName = a[1].path;
      if (a[1].path == "create")
      { this.title = "營隊活動建立頁面" }
      else {
        this.RouteParm = a[2].path;
        if (this.RouteName == "detail") {
          this.title = "營隊活動明細頁面";
          this.DisableButton = true;
        }
        if (this.RouteName == "edit") {
          this.title = "營隊活動編輯頁面";
          this.DisableButton = false;
        }
        this.db.object('/EventData/' + this.RouteParm).subscribe(data => {
          this.EventData = data;
        })
      }
    })

  }
  imageUploaded(data) {
    this.DMImage = data["src"].replace("data:image/jpeg;base64,", "");
  }
  imageRemoved(event) {
    this.DMImage = null;
  }
  disableSendButton(event) {
  }
  onSubmit(f) {
    if (this.RouteName == "create") {
      if (this.DMImage != null) {
        const ImageName = (Date.now() + ".jpg")
        this.isFinishSubmit = !this.isFinishSubmit;
        firebase.storage().ref().child("/DM/" + ImageName).putString(this.DMImage, 'base64').then((snapshot) => {
          this.EventData.imagepath = snapshot.metadata.fullPath;
          firebase.storage().ref().child("/DM/" + ImageName).getDownloadURL().then(a => {
            const id = UUID.UUID();
            this.EventData.id = id;
            this.EventData.imageinfo = a;
            this.EventData.CreateTime = Date.now().toString();
            this.EventData.UpdateTime = Date.now().toString();
            this.db.object('/EventData/' + this.EventData.id).set(this.EventData)
              .then(af => {
                confirm("成功建立新營隊訊息")
                this.isFinishSubmit = !this.isFinishSubmit;
                this.DMImage = null;
                this.EventData = {
                  id: "",
                  title: "",
                  content: "",
                  websignurl: "",
                  imageinfo: "",
                  imagepath: "",
                  enable: true,
                  CreateTime: "",
                  UpdateTime: "",
                }
                this.IsImageReadyToChange = false;
              }
              ).catch(e => { console.log(e); confirm(e.message) })
          }).catch((e) => { console.log(e); confirm(e.message) });
        }).catch((e) => { console.log(e); confirm(e.message) });



      } else {
        confirm("沒有上傳圖片")
      }
    } else if (this.RouteName == "edit") {
         this.isFinishSubmit = !this.isFinishSubmit;
      if (this.DMImage != null) {
        console.log("sdf")
        const ImageName = (Date.now() + ".jpg")
        firebase.storage().ref().child(this.EventData.imagepath).delete()
          .then(a => {
            console.log(a)
            firebase.storage().ref().child("/DM/" + ImageName)
              .putString(this.DMImage, 'base64')
              .then((snapshot) => {
                this.EventData.imagepath = snapshot.metadata.fullPath;
                firebase.storage().ref()
                  .child("/DM/" + ImageName)
                  .getDownloadURL()
                  .then(DownloadURL => {
                    this.EventData.imageinfo = DownloadURL;
                    this.db.object('/EventData/' + this.EventData.id).update({
                      imagepath: this.EventData.imagepath,
                      imageinfo: this.EventData.imageinfo,
                      UpdateTime: Date.now().toString(),
                      title: this.EventData.title,
                      content: this.EventData.content,
                      websignurl: this.EventData.websignurl,
                    }).then(callback => { this.isFinishSubmit = !this.isFinishSubmit})
                  }).catch(errors => console.log(errors))
              }).catch(errors => console.log(errors))



          })
          .catch(errors => console.log(errors))
        //更新dm
      } else {
        this.db.object('/EventData/' + this.EventData.id).update({
          UpdateTime: Date.now().toString(),
          title: this.EventData.title,
          content: this.EventData.content,
          websignurl: this.EventData.websignurl,
        }).then(a => { this.isFinishSubmit = !this.isFinishSubmit;})
      }
    } else {
      confirm("沒有上傳圖片")
    }


  }
  onRemove(item) {
    if (confirm("Are you sure to delete ?")) {
      // Create a reference to the file to delete
      const desertRef = firebase.storage().ref().child(item.imagepath);

      // Delete the file
      desertRef.delete().then(function () {
        console.log("delete file")
        // File deleted successfully
      }).catch(function (error) {
        console.log(error)
        // Uh-oh, an error occurred!
      });
      this.db.object('/EventData/' + item.id).remove();
      //    this.ShowEventData= this.db.list("/EventData")
    }

  }

}
