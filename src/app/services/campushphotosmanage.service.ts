import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs'
import { Page } from '../shared/serversidetable/page'
@Injectable()
export class CampushphotosmanageService {

  constructor(private db: AngularFireDatabase) { }
  GetData(page: Page) {
    page.totalPages = page.totalElements / page.size;
    const start = page.pageNumber * page.size;
    const end = Math.min((start + page.size), page.totalElements);
    return this.db.list('/CampusPhotos', {
      query: {
        limitToFirst: start,
        limitToLast: end
      }
    }).map(
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
        const ReturnData = [];
        ReturnData.push({ listdata: listdata, pagedata: page })
        return ReturnData;
      }
      ).share()
  }
  GetAllDataCounts() {
    return this.db.object('/CampusPhotos').map(a => Object.keys(a).length).share()
  }

}
