import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  constructor() { }

  ngOnInit() {
     // Grab the current date
    let currentDate = new Date();
    // Set some date in the past. In this case, it's always been since Jan 1
    let pastDate  = new Date(currentDate.getFullYear(), 0, 1);
    // Calculate the difference in seconds between the future and current date
    let diff = currentDate.getTime() / 1000 - pastDate.getTime() / 1000;
    // Instantiate a coutdown FlipClock
    $('.clock').FlipClock( {
      clockFace: 'TwentyFourHourClock'
    });
  }

}
