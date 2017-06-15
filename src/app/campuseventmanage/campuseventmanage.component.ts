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

  isFinishSubmit = false;
  DMImage;
  EventData = {
    id: "",
    title: "",
    content: "",
    websignurl: "",
    imageinfo: "",
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
    this.DMImage = data["src"].replace("data:image/jpeg;base64,", "")
  }
  imageRemoved(event) {
    // this.MetaFormDes.imageinfo = "";
    //console.log(event)
  }
  disableSendButton(event) {
    //console.log(event)
  }
  onSubmit(f) {

    const ImageName = (Date.now() + ".jpg")
    this.isFinishSubmit = !this.isFinishSubmit;
    firebase.storage().ref().child("/DM/" + ImageName).putString(this.DMImage, 'base64').then((snapshot) => {
      firebase.storage().ref().child("/DM/" + ImageName).getDownloadURL().then(a => {
        const id = UUID.UUID();
        this.EventData.id = id;
        this.EventData.imageinfo = a;
        this.EventData.CreateTime = Date.now().toString();
        this.EventData.UpdateTime = Date.now().toString();
        //console.log(this.EventData);
        this.isFinishSubmit = !this.isFinishSubmit;
        this.db.object('/EventData/' + this.EventData.id).set(this.EventData)
          .then(a => confirm("成功建立新營隊訊息")).catch(e => console.log(e))
      }).catch((e) => { console.log(e) });
    }).catch((e) => { console.log(e) });
  }
  onRemove(id) {
    this.db.object('/EventData/' + id).remove();
    //    this.ShowEventData= this.db.list("/EventData")
  }

}
