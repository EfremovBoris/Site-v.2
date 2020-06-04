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
        
        // function scrollFunction() {
        //     if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        //       document.getElementById("navbar").style.padding = "30px 10px";
        //       document.getElementById("logo").style.fontSize = "25px";
        //     } else {
        //       document.getElementById("navbar").style.padding = "80px 10px";
        //       document.getElementById("logo").style.fontSize = "35px";
        //     }
        //   }


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