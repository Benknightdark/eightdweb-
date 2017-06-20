import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UUID } from 'angular2-uuid';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs'
import * as moment from 'moment';
import { Page } from '../shared/serversidetable/page'
import { CampushphotosmanageService } from "app/services/campushphotosmanage.service";
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
  page = new Page();
  constructor(private http: CampushphotosmanageService) {

    this.page.pageNumber = 0;
    this.page.size = 1;
  }
  ngOnInit() {
 this.columns = [
        { prop: 'id' },
        { prop: 'Name' },
        { prop: 'CreateTime' },
        { prop: 'UpdateTime' },
      ];
    this.setPage({ offset: 0 });



  }
  onDetail(id) {console.log(id) }
  onEdit(id) { }
  onDelete(id) { }
  setPage(pageInfo) {
    console.log(pageInfo)
    this.page.pageNumber = pageInfo.offset;
    this.http.GetData(this.page).subscribe(data => {

      this.page = data[0].pagedata;
      this.rows = data[0].listdata;

      this.showtable = true;
      console.log(data)
    });
  }

}
