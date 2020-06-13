    // Load const components /////////////////////////////////////////////////
    // $("#main-menu").load("components/menu.html");
    // $("#footer").load("components/footer.html");

    // Tabs select login /////////////////////////////////////////////////
    // may be it's better to parameterize classes Day-item & Tablinks
    function openDayInfo(evt, tabName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("day-item");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(tabName).style.display = "block";
      evt.currentTarget.className += " active";
    }    


    
    $(document).ready(function(){

        // Pregress bar init /////////////////////////////////////////////////
        window.onscroll = function() {myFunction()};
        function myFunction() {
            var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrolled = (winScroll / height) * 100;
            document.getElementById("myBar").style.width = scrolled + "%";
        }				


        // init BURGER menu /////////////////////////////////////////////////
        $('.header__burger').click(function (event) {
            // alert('hello');
            $('.header__burger, .header__menu').toggleClass('active');
            $('body').toggleClass('lock');
        });

        //  GO to TOP button activation  /////////////////////////////////////////////////
        $(document).scroll(function() {
            var y = $(this).scrollTop();
            if (y > 200) {
              $('.scroll-top-btn').fadeIn();
            } else {
              $('.scroll-top-btn').fadeOut();
            }
          });
          
              // Select all links with hashes
          $('a[href*="#"]')
            // Remove links that don't actually link to anything
            .not('[href="#"]')
            .not('[href="#0"]')
            .click(function(event) {
              // On-page links
              if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
                && 
                location.hostname == this.hostname
              ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                  // Only prevent default if animation is actually gonna happen
                  event.preventDefault();
                  $('html, body').animate({
                    scrollTop: target.offset().top  // -80 //fixed header height
                  }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                      return false;
                    } else {
                      $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                      $target.focus(); // Set focus again
                    };
                  });
                }
              }
            });


			// Accordion component onClick handler /////////////////////////////////////////////////
			$(".acc-header").click(function(){
				var isopen = $(this).hasClass("_opened");
				if (isopen == false) {
					// $(this).children(".acc-header-btn").toggleClass("rotated90");
					$(this).next('.acc-content').css('max-height', '500px');
				} else {
					// $(this).children(".acc-header-btn").toggleClass("rotated90");
					$(this).next('.acc-content').css('max-height', '0');
				}
        // $(this).children(".acc-header-btn").toggleClass("rotated90");
        $(this).find("img").toggleClass("rotated45");
				$(this).toggleClass("_opened");
			});


		// "More" text block onClick handler /////////////////////////////////////////////////
		$('.show-more-block').click(function(e) {  
			$(this).toggleClass('expanded');
		});


        // InstagramFeed init /////////////////////////////////////////////////
        (function($){
            $(window).on('load', function(){
                $.instagramFeed({
                    'username': 'boris.efremov',
                    'container': "#instagram-feed-demo",
                    'display_profile': true,
                    'display_biography': true,
                    'display_gallery': true,
                        'get_raw_json': false,
                    'callback': null,
                    'styling': true,
                    'items': 8,
                    'items_per_row': 4,
                    'margin': 1 
                });
            });
        })(jQuery);

        //   Slick init /////////////////////////////////////////////////////
        // $('.slider').css('height', $(window).height() + 'px'); //test LINE

        $('.slider').slick({
            //accessibility:true,
            //variableWidth:true,
            // lazyLoad: 'ondemand',
            arrows: true,
            // dots: true,
            // adaptiveHeight: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            easing:'_ease_',
            infinite:false,
            responsive: [
            {
                breakpoint: 1050,
                settings: {
                    // arrows: false,
                    // centerMode: true,
                    // centerPadding: '40px',
                    slidesToShow: 1
                }
            },
                {
                breakpoint: 700,
                settings: {
                    // arrows: false,
                    //centerMode: true,
                    // centerPadding: '40px',
                    slidesToShow: 1
                }
            }
            ]
            
            //initialSlide: 2,
            //centerMode: true,
            //variableWidth: true
            //draggable:false
            // slidesToScroll: 1
        });



        //   FEEDBACK Slick init /////////////////////////////////////////////////////
        $('.owl-carousel').owlCarousel({
          items: 1,
          // center: true,
          loop:false,
          // margin:10,
           nav:true,
        dots:true,
        autoHeight:true
        // navContainer:'#gallery',
          // responsive:{
          //     0:{
          //         items:1
          //     },
          //     600:{
          //         items:2
          //     },
          //     1000:{
          //         items:3
          //     }
          // }
      });

    });


    //   Form on Submit handler /////////////////////////////////////////////////////
    $("#reqst_form").submit(function(e){
      e.preventDefault();
      $.ajax({
          type: "POST",
          url: "wdh_send_form.php",
          data: $("#reqst_form").serialize(),
          success: function(data) {
              $("#wdh_result_form").html(data);
              document.getElementById('reqst_form').reset();
          }
      });
  });

// 	Chocolat(document.querySelectorAll('.chocolat-image'), {
// 		loop: false,
// 		imageSize: 'scale-down',
// 		linkImages: true,
// 		closeOnBackgroundClick: true,
// 		setTitle : function () { return 'set title' },
// 		fullScreen: false
// })