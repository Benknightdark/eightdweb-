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
  addevents = []
  addevent;
  StartDate;
  AddEventData;
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.DefaultDate = new Date()
    this.ShowCal();


  }
  GetNewEvents() {
    console.log((moment(this.DefaultDate).format("YYYY-MM")))
    $('#calendar').fullCalendar('destroy')
    this.ShowCal();
  }
  ShowCal() {
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

          //
          // $('#modal1').modal('open');
          //console.log(this.AddEventData)
          console.log(start)
          const title = prompt('Event Title:');
          const startdate = prompt('startdate:', moment(start._d).format("YYYY-MM-DD"));
          const enddate = prompt('enddate:',moment(end._d).format("YYYY-MM-DD"));
          let eventData
          if (title) {
            eventData = {
              title: title,
              start: startdate,
              end: enddate
            };
            $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
          }
          $('#calendar').fullCalendar('unselect');

          //$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
          //$('#calendar').fullCalendar('unselect');

        },
        title: moment(this.DefaultDate).format("YYYY-MM"),
        defaultDate: moment(this.DefaultDate).format("YYYY-MM-DD"),
        navLinks: true, // can click day/week names to navigate views

        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: events
      });
      this.addevents = events
    })

  }
  HandleAddEvent(AddEvent) {
    //  console.log(this.StartDate)
    // console.log(AddEvent)
    // this.AddEventData=AddEvent
    console.log(this.AddEventData)
    // const monthSource = { title: "", start: start, end: end }
    // monthSource.title = 'MONTH'; // this should be string
    // monthSource.start = moment(this.DefaultDate).format("YYYY-MM-DD"); // this should be date object
    // monthSource.end = moment(this.DefaultDate).format("YYYY-MM-DD")
    // this.addevents.push(monthSource)
    // $('#calendar').fullCalendar('addEventSource', this.addevents);

    // $('#calendar').fullCalendar('rerenderEvents');
  }



}
