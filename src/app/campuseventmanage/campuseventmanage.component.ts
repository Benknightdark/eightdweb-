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
    imagepath: "",
    enable: true,
    CreateTime: "",
    UpdateTime: "",

  };

  ShowEventData: Observable<any>
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {

    // if (confirm("aaa")) {
    //     console.log("yes")
    // }else{
    //   console.log("NO")
    // }
    this.ShowEventData = this.db.list("/EventData")

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
