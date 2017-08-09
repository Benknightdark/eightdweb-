import { Component } from '@angular/core';
// tslint:disable-next-line:import-spacing
import 'textillate'
import { NgServiceWorker } from '@angular/service-worker'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private sw: NgServiceWorker) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.sw.updates.subscribe(event => {
      console.log('sw.updates:', event.type);


      if (event.type === 'pending') {

        this.sw.activateUpdate(event.version);

      } else {
        // event type === 'activation
        // MGSW is now serving a new version
        location.reload();
      }


    });


  }
}
