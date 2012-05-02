(function($) {

  $.fn.jqSlider = function(options) {
    
    // default configuration properties
    var defaults = {      
      auto         :    false,    
      slideWidth   :    900
    }; 
    
    var options = $.extend(defaults, options);  
    

    this.each(function() { 

      var obj             =   $(this); // object
      var currentPosition =   0; // initial position
      var slideWidth      =   options.slideWidth; // assigned Slide Width
      var slides          =   $('.slide',obj); // slide variable
      var numberOfSlides  =   slides.length; // Number of Slides

      // Remove scrollbar in JS
      $('#slidesContainer',obj).css({'overflow':'hidden', 'width' : slideWidth});

      // Wrap all .slides with #slideInner div
      slides
        .wrapAll('<div id="slideInner"></div>')
        // Float left to display horizontally, readjust .slides width
    	.css({
          'float' : 'left',
          'width' : slideWidth
        });

      // Set #slideInner width equal to total width of all slides
      $('#slideInner').css('width', slideWidth * numberOfSlides);

      // Insert controls in the DOM
      obj
        .prepend('<span class="control" id="leftControl">left</span>')
        .append('<span class="control" id="rightControl">right</span>');

      // Hide left arrow control on first load
      manageControls(currentPosition);

      // Create event listeners for .controls clicks
      $('.control')
        .bind('click', function(){
        // Determine new position
    	currentPosition = ($(this).attr('id')=='rightControl') ? currentPosition+1 : currentPosition-1;
        
    	// Hide / show controls
        manageControls(currentPosition);
        // Move slideInner using margin-left
        $('#slideInner').animate({
          'marginLeft' : slideWidth*(-currentPosition)
        });
      });

      // manageControls: Hides and Shows controls depending on currentPosition
      function manageControls(position){
        // Hide left arrow if position is first slide
    	if(position==0){ $('#leftControl').hide() } else{ $('#leftControl').show() }
    	// Hide right arrow if position is last slide
        if(position==numberOfSlides-1){ $('#rightControl').hide() } else{ $('#rightControl').show() }
      }
    });
  };
})(jQuery);