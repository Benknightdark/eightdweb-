import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  DefaultDate
  addevents = []
  addevent;
  StartDate;
  AddEventData;
  Calenderloading: boolean = false;
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.DefaultDate = moment().format("YYYY-MM")
    this.ShowCal();


  }
  GetNewEvents() {
    console.log((moment(this.DefaultDate).format("YYYY-MM")))

  }
  ShowCal() {
    //  this.Calenderloading = !this.Calenderloading
    this.db.list("AdminEvents/" + moment(this.DefaultDate).format("YYYY-MM")).subscribe(events => {

      console.log(events)
      $('#calendar').fullCalendar({
        header: {
          left: '',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        selectable: true,
        selectHelper: true,
        select: function (start, end) {
          const title = prompt('Event Title:');
          const startdate = prompt('startdate:', moment(start._d).format("YYYY-MM-DD"));
          const enddate = prompt('enddate:', moment(end._d).format("YYYY-MM-DD"));
          let eventData
          if (title) {
            eventData = {
              title: title,
              start: startdate,
              end: enddate
            };
            events.push(eventData)
            console.log( moment(eventData.start).format("YYYY-MM"))
            firebase.database().ref("AdminEvents" + "/" + moment(eventData.start).format("YYYY-MM")).set(
              events
            ).then( $('#calendar').fullCalendar('renderEvent', eventData, true)); // stick? = true)

          }
          $('#calendar').fullCalendar('unselect');
        },
        title: moment(this.DefaultDate).format("YYYY-MM"),
        defaultDate: moment(this.DefaultDate).format("YYYY-MM-DD"),
        navLinks: true,

        editable: true,
        eventLimit: true,
        events: events
      });



      //   this.Calenderloading = !this.Calenderloading
    })

  }
  NavigaeMonth(m) {
    this.DefaultDate = moment(this.DefaultDate).add(m, "months").format("YYYY-MM")
    $('#calendar').fullCalendar('destroy')
    this.ShowCal();
  }




}
