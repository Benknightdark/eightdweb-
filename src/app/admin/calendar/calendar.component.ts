import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  DefaultDate
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    //     $('.datepicker').pickadate({
    //   selectMonths: true, // Creates a dropdown to control month
    //   selectYears: 15 // Creates a dropdown of 15 years to control year
    // });
    // const DefaultDate = '2017-05-12'
    this.DefaultDate = new Date()
    this.ShowCal();

  }
  GetDate() {
    console.log((moment(this.DefaultDate).format("YYYY-MM")))
    $('#calendar').fullCalendar('destroy')
    this.ShowCal();
  }
  ShowCal() {
    this.db.list("AdminEvents/" + moment(this.DefaultDate).format("YYYY-MM")).subscribe(events => {
      console.log(events)
      $('#calendar').fullCalendar({
        defaultDate: moment(this.DefaultDate).format("YYYY-MM-DD"),
        navLinks: true, // can click day/week names to navigate views
        viewRender: function (view, element) {
          console.log(view.currentRange.start._i)
        },
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: events
      });
    })
  }



}
