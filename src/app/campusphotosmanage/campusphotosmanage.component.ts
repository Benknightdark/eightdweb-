import {Router} from '@angular/router';
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
  loading: boolean = false;
  constructor(private http: CampushphotosmanageService,private router:Router) {
  }
  ngOnInit() {
    this.http.GetAllDataCounts().subscribe(
      totalElements => {
        this.page.pageNumber = 0;
        this.page.size = 10;
        this.page.totalElements = totalElements;
        this.columns = [
          { prop: 'id' },
          { prop: 'Name', sortable: true },
          { prop: 'CreateTime', sortable: true },
          { prop: 'UpdateTime', sortable: true },
        ];
        this.setPage({ offset: 0 });
      }
    );
  }
  onDetail(id) {this.router.navigate(['/admin/campusphotosmanageform/detail/'+id]) }
  onEdit(id) { this.router.navigate(['/admin/campusphotosmanageform/edit/'+id])}
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


  onSort(event) {
    // event was triggered, start sort sequence
    console.log('Sort Event', event);
    this.loading = true;
    // emulate a server request with a timeout
    setTimeout(() => {
      const rows = [...this.rows];
      // this is only for demo purposes, normally
      // your server would return the result for
      // you and you would just set the rows prop
      const sort = event.sorts[0];

      const sortprop = this.fistLetterUpper(sort.prop)
      rows.sort((a, b) => {
        return a[sortprop].localeCompare(b[sortprop]) * (sort.dir === 'desc' ? -1 : 1);
      });

      this.rows = rows;
      this.loading = false;
    }, 1000);
  }
  fistLetterUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
