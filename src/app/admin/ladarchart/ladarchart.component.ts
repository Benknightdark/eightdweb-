import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ladarchart',
  templateUrl: './ladarchart.component.html',
  styleUrls: ['./ladarchart.component.css']
})
export class LadarchartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
// PolarArea
  public polarAreaChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData:number[] = [300, 500, 100, 40, 120];
  public polarAreaLegend:boolean = true;

  public polarAreaChartType:string = 'polarArea';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
