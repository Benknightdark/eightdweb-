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
  onDetail(id) { }
  onEdit(id) {}
  onDelete(id) { }


}
