import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UUID } from 'angular2-uuid';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-campuseventmanage',
  templateUrl: './campuseventmanage.component.html',
  styleUrls: ['./campuseventmanage.component.css']
})
export class CampuseventmanageComponent implements OnInit {

  isFinishSubmit = true;
  DMImage;
  EventData = {
    id: "",
    title: "",
    content: "",
    websignurl: "",
    imageinfo: "",
    imageurl: "",
    enable: true,
    CreateTime: "",
    UpdateTime: "",

  };
  ShowEventData: Observable<any>
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.ShowEventData = this.db.list("/EventData")
  }
  imageUploaded(data) {
    //console.log(data)
    this.DMImage = data["src"].replace("data:image/jpeg;base64,", "");
    // console.log(this.DMImage)
  }
  imageRemoved(event) {
    // this.MetaFormDes.imageinfo = "";
    //console.log(event)
  }
  disableSendButton(event) {
    //console.log(event)
  }
  onSubmit(f) {
    if (this.DMImage != "") {
      const ImageName = (Date.now() + ".jpg")
      this.isFinishSubmit = !this.isFinishSubmit;
      firebase.storage().ref().child("/DM/" + ImageName).putString(this.DMImage, 'base64').then((snapshot) => {
        this.EventData.imageurl = snapshot.metadata.fullPath;
        firebase.storage().ref().child("/DM/" + ImageName).getDownloadURL().then(a => {
          const id = UUID.UUID();
          this.EventData.id = id;
          this.EventData.imageinfo = a;

          this.EventData.CreateTime = Date.now().toString();
          this.EventData.UpdateTime = Date.now().toString();
          this.db.object('/EventData/' + this.EventData.id).set(this.EventData)
            .then(a => {
              confirm("成功建立新營隊訊息")
              this.isFinishSubmit = !this.isFinishSubmit;
            }
            ).catch(e => { console.log(e); confirm(e.message) })
        }).catch((e) => { console.log(e); confirm(e.message) });
      }).catch((e) => { console.log(e); confirm(e.message) });
    } else {
      confirm("沒有上傳圖片")
    }

  }
  onRemove(item) {
    // Create a reference to the file to delete
    const desertRef = firebase.storage().ref().child(item.imageurl);

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
