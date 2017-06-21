import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UUID } from 'angular2-uuid';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { CampuseventmanageService } from '../services/campuseventmanage.service';
import { Router } from '@angular/router';
import { Page } from '../shared/serversidetable/page';
@Component({
  selector: 'app-campuseventmanage',
  templateUrl: './campuseventmanage.component.html',
  styleUrls: ['./campuseventmanage.component.css']
})
export class CampuseventmanageComponent implements OnInit {
isFinishSubmit: boolean = true;
  uploadcount = 0
  rows;
  columns;
  showtable: boolean = false;
  page = new Page();
  loading: boolean = false;

  ShowEventData: Observable<any>
  constructor(private http: CampuseventmanageService, private router: Router,private db: AngularFireDatabase) { }

  ngOnInit() {
    this.ShowEventData = this.db.list("/EventData")

      this.http.GetAllDataCounts().subscribe(
      totalElements => {
        this.page.pageNumber = 0;
        this.page.size = 10;
        this.page.totalElements = totalElements;
        this.columns = [
          { prop: 'id' },
          { prop: 'title', sortable: true },
          { prop: 'CreateTime', sortable: true },
          { prop: 'UpdateTime', sortable: true },
        ];
        this.setPage({ offset: 0 });
      }
    );
  }

  onRemove(item) {
    if (confirm("Are you sure to delete ?")) {
      const desertRef = firebase.storage().ref().child(item.imagepath);
      desertRef.delete().then(function () {
        console.log("delete file")
      }).catch(function (error) {
        console.log(error)
      });
      this.db.object('/EventData/' + item.id).remove();
    }
  }
  onDetail(id) { this.router.navigate(['/admin/campuseventmanageform/detail/' + id]) }
  onEdit(id) { this.router.navigate(['/admin/campuseventmanageform/edit/' + id]) }
  onDelete(id) {
    if (confirm("Are you sure to delete ?")) {
      const PhotoCount = 3;
      for (let i = 0; i < PhotoCount; i++) {
        firebase.storage().ref().child("/" + id + "/" + i + ".jpg").delete().then(function () {
          console.log("delete file")
        }).catch(function (error) {
          console.log(error)
        });
      }
      this.db.object('/CampusPhotos/' + id).remove().then(d => console.log(d)).catch(errors => console.log(errors));
    }
  }
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
    if(str!="title"){
 return str.charAt(0).toUpperCase() + str.slice(1);
    }else {
      return str;
    }

  }
}
