let menu = ((options) => {

    let button = document.querySelector(options.button);
    let menu = document.querySelector(options.menu);
    let body = document.querySelector('body');

    let _toggleMenu = () => {
        
        button.classList.toggle('hamburger-menu__trigger_active');
        menu.classList.toggle('hamburger-menu_active');
        body.classList.toggle('body__active-menu');  

    }

    let addListeners = () => {
        button.addEventListener('click', _toggleMenu);
    }

    return {
        init: addListeners
    };

})({
    button: '#hamburger-menu_toggle',
    menu: '#hamburger-menu_overlay'
});

menu.init();

// onepage-scroll
$(function() {

    const display = $('.maincontent');
    const sections = $('.section');

    let inScroll = false;
    let mobileDetect = new MobileDetect(window.navigator.userAgent);
    const isMobile = mobileDetect.mobile();

    const switchMenuActiveClass = sectionEq => {
        $('.fixed-menu__item').eq(sectionEq).addClass('fixed-menu__item_active')
          .siblings().removeClass('fixed-menu__item_active');
    }

    // ф-ция для скролла к нужной секции
    const performTransition = sectionEq => {
        
        if (!inScroll) {
            inScroll = true;
            const position = (sectionEq * -100) + '%';

            display.css({
                'transform' : `translate(0, ${position})`,
                '-webkit-transform' : `translate(0, ${position})`
            })
    
            sections.eq(sectionEq).addClass('active')
              .siblings().removeClass('active');

            switchMenuActiveClass(sectionEq);

            setTimeout(() => {
                inScroll = false; 
            }, 1300);
        }
   
    }

    const defineSections = sections => {
        
        const activeSection = sections.filter('.active');

        return {
            activeSection : activeSection,
            nextSection   : activeSection.next(),
            prevSection   : activeSection.prev()
        }

    }

    const scrollToSection = direction => {

        const section = defineSections(sections);

        if (!inScroll) {
            
            if (direction == 'up' && section.nextSection.length) {
                performTransition(section.nextSection.index());
            }

            if (direction == 'down' && section.prevSection.length) {
                performTransition(section.prevSection.index());
            }
        }

    }
    
    $('.wrapper').on({

        wheel: e => {
            
            const deltaY = e.originalEvent.deltaY;
            let direction = (deltaY > 0)
                ? 'up'
                : 'down';
            
            scrollToSection(direction);
    
            

        },
        touchmove: e => (e.preventDefault())
        
    });

    $(document).on('keydown', e => {

        const section = defineSections(sections);

        if (!inScroll) {

            switch (e.keyCode) {
                case 40: // скролл до след секции
                    if (section.nextSection.length) {
                        performTransition(section.nextSection.index());
                    }
                    break;
                case 38: // скролл до пред секции
                    if (section.prevSection.length) {
                        performTransition(section.prevSection.index());
                    }
                    break;
            }
        }

    });

    if (isMobile) {
        $(window).swipe({

            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                scrollToSection(direction);
            }

        })
    }

    $('[data-scroll-to]').on('click touchstart', e => {
        e.preventDefault();

        const $this = $(e.currentTarget);
        const sectionIndex = parseInt($this.attr('data-scroll-to'));

        const hamburgerIcon = $('#hamburger-menu_toggle');
        const hamburgerMenu = $('#hamburger-menu_overlay');

        performTransition(sectionIndex);

        hamburgerIcon.removeClass('hamburger-menu__trigger_active');
        hamburgerMenu.removeClass('hamburger-menu_active');

    });

});


// map
let map;
function initMap() {
    let uluru = { lat: 49.589880, lng: 34.550456 };
    map = new google.maps.Map(document.getElementById('map'), {
    center: uluru,
    zoom: 17,
    styles: [
        {
            "featureType": "administrative",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "color": "#84afa3"
                },
                {
                    "lightness": 52
                }
            ]
        },
        {
            "stylers": [
                {
                    "saturation": -17
                },
                {
                    "gamma": 0.36
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#3f518c"
                }
            ]
        }
    ]
    
  });

  let icons = {
      position: {
        icon: {
            url: './img/icons/map-marker.svg',
            size: new google.maps.Size(60, 60),
            scaleesize: new google.maps.Size(60, 60)
        }
      }
  }

  let features = [
      {
          position: new google.maps.LatLng(49.589880, 34.550456),
          type: 'position',
          contentString: 'First',
          content: 'First marker'
      }
  ]

  let infowindow = new google.maps.InfoWindow();
  features.forEach(feature => {

    let marker = new google.maps.Marker({
        position: feature.position,
        icon: icons[feature.type].icon,
        map: map,
        title: feature.contentString
    });

    marker.addListener('click', function() {
        infowindow.setContent(feature.content);
        infowindow.open(map, marker);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            marker.setAnimation(null)
        }, 1500)
    })

  });

}

// team-accordeon
$(function() {

    $('.team-accordeon__trigger').on('click', e => {
        e.preventDefault();    
        
        const $this = $(e.currentTarget);
        const container = $this.closest('.team-accordeon');
        const item = $this.closest('.team-accordeon__item');
        const items = container.find('.team-accordeon__item');
        const content = item.find('.team-accordeon__content');
        const otherContent = container.find('.team-accordeon__content');
        const contentBlock = item.find('.team-accordeon__content-wrap');
        const reqHeight = contentBlock.outerHeight();

        if(item.hasClass('team-accordeon__item_active')) {

            item.removeClass('team-accordeon__item_active');

            content.css({
                'height' : 0
            })            

        } else {
            items.removeClass('team-accordeon__item_active');
            item.addClass('team-accordeon__item_active');

            otherContent.css({
                'height' : 0
            })

            content.css({
                'height' : reqHeight
            })
        }

    });

})

// menu-accordeon
$(function() {

    $('.menu-accordeon__trigger').on('click', e => {
        e.preventDefault();

        const $this = $(e.currentTarget);
        const sectionWidth = $this.closest('section').width();
        const container = $this.closest('.menu-accordeon');
        const items = container.find('.menu-accordeon__item');
        const triggerWidth = items.find('.menu-accordeon__trigger').width();
        const item = $this.closest('.menu-accordeon__item');
        const content = item.find('.menu-accordeon__content');
        const otherContent = container.find('.menu-accordeon__content');
        const textBlocks = container.find('.menu-accordeon__text');
        const textBlock = item.find('.menu-accordeon__text');
        const reqWidth = textBlock.width();

        if(item.hasClass('menu-accordeon__item_active')) {

            item.removeClass('menu-accordeon__item_active');

            textBlock.css({
                'opacity' : 0
            })

            textBlocks.css({
                'opacity' : 0
            })

            setTimeout(() => {
                content.css({
                    'width' : 0
                })
            }, 500);

        } else {

            items.removeClass('menu-accordeon__item_active');
            item.addClass('menu-accordeon__item_active');

            textBlocks.css({
                'opacity' : 0
            })

            setTimeout(() => {
                otherContent.css({
                    'width' : 0
                }) 
                
    
                if (sectionWidth <= 768) {
    
                    content.css({
                        'width' : sectionWidth - (triggerWidth * items.length)
                    }) 
    
                } else {
    
                    content.css({
                        'width' : 530
                    })
    
                }
    
                setTimeout(() => {
                    textBlock.css({
                        'opacity' : 1
                    })
                }, 500);
            }, 500);
            
            

        }

    });

})

// modal reviews
$(function() {

    $("[data-fancybox]").fancybox({
		// Options will go here
	});

});

$(function() {

    $('.burgers-slider__list').slick({

        responsive: [
            {
                breakpoint: 481,
                settings: {
                    arrows: false
                }
            }
        ],

        prevArrow: '<a href="#" class="reviews__arrows reviews__arrows-prev"><svg class="arrow-icon"> <use xlink:href="../img/sprite/sprite.svg#arrow-scroll" /></svg></a>',
        nextArrow: '<a href="#" class="reviews__arrows reviews__arrows-next"><svg class="arrow-icon"> <use xlink:href="../img/sprite/sprite.svg#arrow-scroll" /></svg></a>'

    });

});

// Order form
$(function() {

    // Универсальная ф-ция обработки форм
    let ajaxForm = function (form) {
        let data = form.serialize(),
            url = form.attr('action');

        return $.ajax({
            type: 'POST',
            url: url,
            dataType: 'JSON',
            data: data
        })
    };
    
    // Обработка события
    let submitForm = function (e) {
        console.log('in submitForm');
        e.preventDefault();

        let form = $(e.target);
        
        ajaxForm(form).done(function(msg) {
            let mes = msg.mes,
                status = msg.status;

            if (status === 'OK') {
                form.append('<p class="order-form_success">' + mes + '</p>');
            } else {
                form.append('<p class="order-form_error">' + mes + '</p>');
            }
        }).fail(function(jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });

    };
    
    $('#order-form').on('submit', submitForm);


});

