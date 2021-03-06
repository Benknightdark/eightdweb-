import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs'
import { Page } from '../shared/serversidetable/page'

@Injectable()
export class CampuseventmanageService {

  constructor(private db: AngularFireDatabase) { }
  GetData(page: Page) {
    page.totalPages = page.totalElements / page.size;
    const start = page.pageNumber * page.size;
    const end = Math.min((start + page.size), page.totalElements);
    return this.db.list('/EventData', {
      query: {
        limitToFirst: start,
        limitToLast: end,
        orderByChild: 'UpdateTime',
      }
    }).map(
      data => {
        const listdata = []
        for (let i = 0; i < data.length; i++) {
          listdata.push({
            title: data[i].title,
            imagepath:data[i].imagepath,
            CreateTime: moment.unix(data[i].CreateTime / 1000).format("YYYY/MM/DD hh:mm:ss"),
            UpdateTime: moment.unix(data[i].UpdateTime / 1000).format("YYYY/MM/DD hh:mm:ss"),
            id: data[i].id
          })
        }
        const ReturnData = [];
        ReturnData.push({ listdata: listdata.reverse(), pagedata: page })
        return ReturnData;
      }
      ).share()
  }
  GetAllDataCounts() {
    return this.db.object('/EventData').map(a => Object.keys(a).length).share()
  }

}
