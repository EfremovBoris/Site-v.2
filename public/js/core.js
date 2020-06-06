    // Load const components /////////////////////////////////////////////////
    // $("#main-menu").load("components/menu.html");
    // $("#footer").load("components/footer.html");

    

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
                    scrollTop: target.offset().top
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
				$(this).children(".acc-header-btn").toggleClass("rotated90");
				$(this).toggleClass("_opened");
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
    });



// 	Chocolat(document.querySelectorAll('.chocolat-image'), {
// 		loop: false,
// 		imageSize: 'scale-down',
// 		linkImages: true,
// 		closeOnBackgroundClick: true,
// 		setTitle : function () { return 'set title' },
// 		fullScreen: false
// })