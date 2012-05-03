/* Copyright 2011 Sanooj AH <sanooj007@gmail.com>
        
This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.
        
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
        
You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
MA 02110-1301, USA. */

(function($) {

  $.fn.jqSlider = function(options) {

    // default configuration properties
    var defaults = {
      auto        : false, // Auto slide onload
      slideWidth  : 900, // Slider Width
      clickPause  : false // slide pause onclick controls
    };

    var options   =  $.extend(defaults, options);


    this.each(function() {

      var obj             = $(this); // object
      var currentPosition = 0; // initial position
      var slideWidth      = options.slideWidth; // assigned Slide Width
      var slides          = $('.slide', obj); // slide variable
      var nos  = slides.length; // Number of Slides

      // Remove scrollbar in JS
      $('#slidePanel', obj).css({
        'overflow'  : 'hidden',
        'width'     :  slideWidth
      });

      // Wrap all .slides with #innerPanel div
      slides.
        wrapAll('<div id="innerPanel"></div>')
      // Float left to display horizontally, readjust .slides width
      .css({
        'float': 'left',
        'width': slideWidth
      });

      // Set #innerPanel width equal to total width of all slides
      $('#innerPanel').css('width', slideWidth * nos);

      // Insert controls in the DOM
      obj.
        prepend('<span class="control" id="leftControl">left</span>').append('<span class="control" id="rightControl">right</span>');

      // Hide left arrow control on first load
      manageControls(currentPosition);

      // Create event listeners for .controls clicks
      $('.control').bind('click', function() {
        // Determine new position
        currentPosition = ($(this).attr('id') == 'rightControl') ? currentPosition + 1 : currentPosition - 1;
        if(options.clickPause)
        {
          clearInterval(t)
        }
        // Hide / show controls
        manageControls(currentPosition);
        // Move innerPanel using margin-left
        $('#innerPanel').animate({
          'marginLeft': slideWidth * (-currentPosition)
        });
      });


      if(options.auto)
      {
        var t = setInterval(autoslide, 6000);
      }

      function autoslide() {
          currentPosition = currentPosition + 1;

          if (currentPosition == nos ) {
              currentPosition = 0;
          }

          // Hide / show controls
          manageControls(currentPosition);

          // Move innerPanel using margin-left
          $('#innerPanel').animate({
            'marginLeft': slideWidth * (-currentPosition)
          });
        }

      // manageControls: Hides and Shows controls depending on currentPosition
      function manageControls(position) {
        // Hide left arrow if position is first slide
        if (position == 0) {
          $('#leftControl').hide()
        } else {
          $('#leftControl').show()
        }
        // Hide right arrow if position is last slide
        if (position == nos - 1) {
          $('#rightControl').hide()
        } else {
          $('#rightControl').show()
        }
      }

    });
  };
})(jQuery);
