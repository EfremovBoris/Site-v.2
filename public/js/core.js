    // Load const components /////////////////////////////////////////////////
    // $("#main-menu").load("components/menu.html");
    // $("#footer").load("components/footer.html");

    // check selector existance
    // if ( $( "#myDiv" ).length ) {"do smth"}



    // Tabs select login /////////////////////////////////////////////////
    // may be it's better to parameterize class Tablinks
    function openDayInfo(evt, tabName, childClass) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName(childClass);
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



    // viewMode of prog description
    function ChangeViewMode(cb) {

      var scroll_menu = document.getElementsByClassName('scrollmenu');
      scroll_menu[0].style.display = (scroll_menu[0].style.display == 'none') ? 'block' : 'none';
      document.getElementById('label_tabview').innerHTML = (scroll_menu[0].style.display == 'none') ? 'Список' : 'Вкладки';
    

      if (cb.checked === true) {
        var pdays = document.getElementsByClassName("day-item");
        for (i = 1; i < pdays.length; i++) {
          pdays[i].style.display = "none";
        }  
        // restore last active tab
        openDayInfo(event, 'tday'+splide.index.toString(),'day-item');

      } else {
        var pdays = document.getElementsByClassName("day-item");
        for (i = 0; i < pdays.length; i++) {
          pdays[i].style.display = "block";
        }  
      }
    }






    // Form input validation /////////////////////////////////////////////////
    function check_input(e) {
      let input_src = document.getElementById(e.id)
      let input_regexp = "";

      switch(e.id) {
      case "form_fio":
          input_regexp = /([А-Яа-я]{2,} +){2}[А-Яа-я]{2,}/g;
      break;
      case "form_email":
          input_regexp = /^[^ ]+@[^ ]+\.[a-z]{2,}/g;
      break;
      default:
      }

      if (input_src.value.match(input_regexp)) {
          input_src.style.borderColor = "#108339"; //OK color
      } else
      {
          input_src.style.borderColor = "#DF1515"; //Wrong color
      }
      if (input_src.value == "") {
          input_src.style.borderColor = "#AAA9A9";
      }
  }

  // Mask for cellphone /////////////////////////////////////////////////
  var element = document.getElementById("form_phone");
  if (typeof(element) != 'undefined' && element != null){
      var phoneMask = IMask(document.getElementById('form_phone'), {
        mask: '+{7} (000) 000-00-00'
        }).on('accept', function() {
        document.getElementById('phone-complete').style.display = '';
        document.getElementById('phone-unmasked').innerHTML = phoneMask.unmaskedValue;
        }).on('complete', function() {
        document.getElementById('phone-complete').style.display = 'inline-block';
        });
  };
  
    // InstagramFeed init /////////////////////////////////////////////////

    element = document.getElementById("instafeed");
    if (typeof(element) != 'undefined' && element != null){
      var feed = new Instafeed({
        // token last for 60 days? may be less so i need to change it...HOW TO AUTOMATE IT?
        // START working 10 nov 2021
        accessToken: 'IGQVJXamhPT2hPS19NblBJbGJhTWQ5UTlUV2tNSDNIQTJCazRYNTc4YmpJU0o2ZA2RJc0NvVUhiSjk3Q1NjZAjZAHUU9ERVBWVm9MclhLa0ZAUeC1Jc05YRjVNMUVKQmdFbnJGeGpkZAGhUX0wwZAWtDMFMtWAZDZD',
        limit: 8,
        target: 'instafeed',
        template: '<a href="{{link}}" target="_blank"><img title="{{caption}}" src="{{image}}" /></a>'
      });
      feed.run();
    };





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
            $('.header__button').toggleClass('disabled');
        });

        //  GO to TOP button activation  /////////////////////////////////////////////////
        $(document).scroll(function() {
            var y = $(this).scrollTop();
            if (y > 500) {
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

                // need to use headerHeight
                // headerHeight = $(".header__body").height(); // Get fixed header height

                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                  // Only prevent default if animation is actually gonna happen
                  event.preventDefault();
                  $('html, body').animate({
                    scrollTop: target.offset().top // - 80 fixed header height
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
					$(this).next('.acc-content').css('max-height', '700px');
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


        
        //   Slick init /////////////////////////////////////////////////////
        if ( $( ".slider" ).length ) {
            $('.slider').slick({
                //accessibility:true,
                // variableWidth:true,
                // lazyLoad: 'ondemand',
                arrows: true,
                // dots: true,
                // adaptiveHeight: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                speed: 500,
                easing:'_ease_',
                infinite:false,
                responsive: [

                  {
                    breakpoint: 2000,
                    settings: {
                        // arrows: false,
                        // centerMode: true,
                        // centerPadding: '40px',
                        // variableWidth:true,
                        slidesToShow: 4
                    }
                },

                {
                    breakpoint: 1400,
                    settings: {
                        // arrows: false,
                        // centerMode: true,
                        // centerPadding: '40px',
                        // variableWidth:true,
                        slidesToShow: 3
                    }
                },
                    {
                    breakpoint: 1000,
                    settings: {
                        // arrows: false,
                        // centerMode: true,
                        // centerPadding: '40px',
                        slidesToShow: 4
                    }

                },
                {
                  breakpoint: 450,
                  settings: {
                      // arrows: false,
                      // centerMode: true,
                      // centerPadding: '30px',
                      slidesToShow: 1
                  }

              }

                ]
                
                //initialSlide: 2,
                //centerMode: true,
                //variableWidth: true
                //draggable:false
            });
            
      }; //end if exist





      if ( $( ".slider-tour" ).length ) {
        $('.slider-tour').slick({
            //accessibility:true,
            // variableWidth:true,
            // lazyLoad: 'ondemand',
            arrows: true,
            // dots: true,
            // adaptiveHeight: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            easing:'_ease_',
            infinite:false,
            // autoplay:true,
            autoplayspeed: 4000,
            pauseOnHover:true
            //initialSlide: 2,
            //centerMode: true,
            //variableWidth: true
            //draggable:false
        });


  }; //end if exist




        //   FEEDBACK owl init /////////////////////////////////////////////////////
        if ( $( ".owl-carousel" ).length ) {
                $('.owl-carousel').owlCarousel({
                  items: 1,
                  // center: true,
                  loop:true,
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
        }; // end IF
    });


    //   Form on Submit handler /////////////////////////////////////////////////////
    function clearBox(elementID)
    {
        let itemx = document.getElementById(elementID);
        itemx.innerHTML = "";
        itemx.classList.remove("success");
        itemx.classList.remove("error");
    }

    $("#reqst_form").submit(function(e){
      e.preventDefault();
      // set hidden value
      $("input[id=src-page]").val(window.location.href);
      $.ajax({
          type: "POST",
          url: "components/wdh_send_form.php",
          data: $("#reqst_form").serialize(),
          success: function(data) {
              $("#wdh_result_form").html(data);
              $("#wdh_result_form").toggleClass('success');
              document.getElementById('reqst_form').reset();
              setTimeout(clearBox, 5000, "wdh_result_form");

              // debug - open popup "ThankYou" page on submit
              $.fancybox.open([ $('#thank-you-page') ]);
          },
          error: function (xhr, ajaxOptions, thrownError) {
              $("#wdh_result_form").html(xhr.status + '; '+ thrownError);
              $("#wdh_result_form").toggleClass('error');
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