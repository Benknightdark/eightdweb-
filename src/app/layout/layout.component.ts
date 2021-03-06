import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('.collapsible').collapsible();
      $('.button-collapse').sideNav({
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
      });
      $('.parallax').parallax();

      $('.slider').slider({
        height:"100%",
        indicators:false

      });


      // setTimeout(() => {
      //   $('.carousel.carousel-slider').carousel({ fullWidth: true, indicators: true });
      //   setInterval(function () {
      //     $('.carousel.carousel-slider').carousel('next');
      //   }, 5000); // every 2 seconds
      // }, 0);
      $('.tlt').textillate({// the default selector to use when detecting multiple texts to animate
        selector: '.texts',

        // enable looping
        loop: true,

        // sets the minimum display time for each text before it is replaced
        minDisplayTime: 2000,

        // sets the initial delay before starting the animation
        // (note that depending on the in effect you may need to manually apply
        // visibility: hidden to the element before running this plugin)
        initialDelay: 0,

        // set whether or not to automatically start animating
        autoStart: true,

        // custom set of 'in' effects. This effects whether or not the
        // character is shown/hidden before or after an animation
        inEffects: [],

        // custom set of 'out' effects
        outEffects: ['fadeOut'],

        // in animation settings
        in: {
          // set the effect name
          effect: 'fadeInLeftBig',

          // set the delay factor applied to each consecutive character
          delayScale: 1.5,

          // set the delay between each character
          delay: 50,

          // set to true to animate all the characters at the same time
          sync: false,

          // randomize the character sequence
          // (note that shuffle doesn't make sense with sync = true)
          shuffle: false,

          // reverse the character sequence
          // (note that reverse doesn't make sense with sync = true)
          reverse: false,

          // callback that executes once the animation has finished
          callback: function () { }
        },

        // out animation settings.
        out: {
          effect: 'fadeOut',
          delayScale: 1.5,
          delay: 50,
          sync: false,
          shuffle: false,
          reverse: false,
          callback: function () { }
        },

        // callback that executes once textillate has finished
        callback: function () { },

        // set the type of token to animate (available types: 'char' and 'word')
        type: 'char'
      });

    })


  }

}
