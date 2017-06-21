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
  DMImage;
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
  IsImageReadyToChange:boolean=false;
  constructor(private db: AngularFireDatabase,private route: ActivatedRoute) { }

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
    this.DMImage ="";
  }
  disableSendButton(event) {
  }
  onSubmit(f) {
    if (this.DMImage != "") {
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
      // f.reset();
            }
            ).catch(e => { console.log(e); confirm(e.message) })
        }).catch((e) => { console.log(e); confirm(e.message) });
      }).catch((e) => { console.log(e); confirm(e.message) });



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
