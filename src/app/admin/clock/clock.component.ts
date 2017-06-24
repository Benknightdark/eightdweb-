import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.clock').FlipClock(new Date().getTime() / 1000 - new Date(new Date().getFullYear(), 0, 1).getTime() / 1000, {
      clockFace: 'TwentyFourHourClock'
    });
  }

}
