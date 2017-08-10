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
      console.log("version:", event.version)
      if (event.type === 'pending') {
        // caches.keys().then(k => {
        //   for (let i = 0; i < k.length; i++) {
        //     caches.delete(k[i]).then(d => { console.log('delete:', k[i]) })
        //   }
        // })

        this.sw.activateUpdate(event.version).subscribe(au => {
          console.log("activateupdate:", au)
          location.reload(true)
        });
      }

    });


  }
}
