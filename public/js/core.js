    // Load const components /////////////////////////////////////////////////
    // $("#main-menu").load("components/menu.html");
    // $("#footer").load("components/footer.html");



    // Tabs select login /////////////////////////////////////////////////
    // may be it's better to parameterize class Tablinks


    console.log('=== Core executing...');
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


    // GLOBAL VARs
    let iti; //var tel-input
    let errorMsg;
    


    // Document Ready
    $(document).ready(function(){

        console.log('=== Document ready...===');

        // FAQ accordion open|close
            const accordionGroups = document.querySelectorAll('.faqZ');
            
            accordionGroups.forEach(group => {
                const detailsInGroup = group.querySelectorAll('.faq_it');
                
                detailsInGroup.forEach(detail => {
                    detail.addEventListener('toggle', function() {
                        if (this.open) {
                            detailsInGroup.forEach(otherDetail => {
                                if (otherDetail !== this) {
                                    otherDetail.open = false;
                                }
                            });
                        }
                    });
                });
            });



        // Pregress bar init /////////////////////////////////////////////////
        window.onscroll = function() {myFunction()};
        function myFunction() {
            var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrolled = (winScroll / height) * 100;
            document.getElementById("myBar").style.width = scrolled + "%";
        }				

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

      console.log('Menu building');
      // new MENU start
      const burger = document.querySelector('.header__burger');
      const menu = document.querySelector('.header__list');
      const header_btn = document.querySelector('.header__button');

      // Создаём оверлей
      const overlay = document.createElement('div');
      overlay.className = 'menu-overlay';
      document.body.appendChild(overlay);

      // Открытие/закрытие мобильного меню
      burger.addEventListener('click', function() {
          this.classList.toggle('active');
          menu.classList.toggle('active');
          overlay.classList.toggle('active');
          header_btn.classList.toggle('disabled');
          document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
      });

      // Закрытие по клику на оверлей
      overlay.addEventListener('click', function() {
          burger.classList.remove('active');
          menu.classList.remove('active');
          overlay.classList.remove('active');
          document.body.style.overflow = '';
      });

      // Аккордеон для подменю на мобильных
      const submenus = document.querySelectorAll('.has-submenu');

      submenus.forEach(item => {
          const link = item.querySelector(':scope > .header__link');
          
          link.addEventListener('click', function(e) {
              // Только на мобильных
              if (window.innerWidth <= 992) {
                  e.preventDefault();
                  
                  // Закрываем другие подменю
                  submenus.forEach(other => {
                      if (other !== item) {
                          other.classList.remove('active');
                      }
                  });
                  
                  item.classList.toggle('active');
              }
          });
      });

      // Сброс состояния при ресайзе
      window.addEventListener('resize', function() {
          if (window.innerWidth > 992) {
              burger.classList.remove('active');
              menu.classList.remove('active');
              overlay.classList.remove('active');
              document.body.style.overflow = '';
              submenus.forEach(item => item.classList.remove('active'));
          }
      });      
      // new MENU finish


      console.log('=== Tel-Inp building');
      // new Tel-input start
      const input = document.querySelector("#form_phone");
      if (input) {
        console.log("✅ Элемент #form_phone найден:", input);
      } else {
    console.warn("⚠️ Элемент #form_phone не найден!");
    }


      try {
        iti = window.intlTelInput(input, {
                  initialCountry: 'auto',
                    geoIpLookup: function(callback) {
                    fetch('https://ipapi.co/json/')
                    .then(res => res.json())
                    .then(data => callback(data.country_code))
                    .catch(() => callback('ru'));
                  },
                  strictMode: true,
                  // loadUtils: () => import("/js/utils.js")
                  loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.12.5/build/js/utils.js")
      });
      
      } catch (error) {
          console.error('Ошибка инициализации intlTelInput:', error);
      }
      // new Tel-input finish



        
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
              infinite:true,
              autoplay:true,
              autoplayspeed: 3000,
              pauseOnHover:false
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
                // dots:true,
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


              // После инициализации добавляем доступные имена для кнопок-точек
              $('.owl-dot').each(function(index) {
                  // Нумерация для пользователя обычно начинается с 1
                  $(this).attr('aria-label', 'Перейти к отзыву ' + (index + 1));
              });

              // refresh carousel trigger  MOD 27-05-24
              // может стоит указывать чтобы детайлс искались только в карусели???
              var details = document.querySelectorAll("details")
              details.forEach(details => {
                  details.addEventListener("toggle", function() {
                          var owl = $('.owl-carousel');
                          owl.owlCarousel();
                          owl.trigger('refresh.owl.carousel');
                      })
                  });


              
        }; // end IF
    });


    //   Form on Submit handler /////////////////////////////////////////////////////
    function clearBox(elementID)
    {
        let itemx = document.getElementById(elementID);
        // console.log(itemx.innerHTML);
        console.log("=== Clear Function ===");
        itemx.innerHTML = "";
        itemx.classList.remove("success");
        itemx.classList.remove("error");
    }


    window.iti = iti; // useful for testing
    errorMsg = document.querySelector("#error-msg");

    //fix width of intl-tel-input NOT WORK
    // const targetElement = document.querySelector('.iti');
    // if (targetElement) {
    //     targetElement.style.display = 'block';
    // }    

    const showError = (msg) => {
      errorMsg.innerHTML = msg;
      errorMsg.hidden = false;
    };     

    $("#reqst_form").submit(function(e){
      e.preventDefault();

      // new check intl-tel
      if (typeof iti !== 'undefined' && iti !== null) {
          if (iti.isValidNumber()) {
              const fullNumber = iti.getNumber();
              document.getElementById('form_phone').value = fullNumber;
              errorMsg.hidden = true;
              console.log(`Валидный номер: ${fullNumber}`);
          } else {
              const errorCode = iti.getValidationError();
              if (errorCode === intlTelInput.utils.validationError.TOO_SHORT) {
                  showError("⚠️ Номер слишком короткий");
              } else {
                  showError("⚠️ Неверный номер телефона. Проверьте формат.");
              }
              console.log('Неверный номер телефона. Проверьте формат.');
              return false;
          }
          } else {
              console.error('Ошибка: объект iti не был инициализирован');
      }
      
      
      // return false; // debug exit


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
