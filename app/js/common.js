$(function() {
    $('.audio-btn-play').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('.audio-btn-pause').toggleClass('active');
        $(this).parents('.discography-info-block').siblings('.discography-info-block').find('.audio-btn-pause').removeClass('active').siblings('.audio-btn-play').addClass('active');
    });

    $('.audio-btn-pause').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('.audio-btn-play').toggleClass('active');
    });

    document.addEventListener('play', function(e) {
        var audios = document.getElementsByTagName('audio');
        for (var i = 0; i < audios.length; i++) {
            if (audios[i] != e.target) {
                audios[i].pause();
            }
        }
    }, true);

    $('.slowly').on('click', function(event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({ scrollTop: top }, 600);
    });

    $('.header-nav-link').click(function() {
        $('.header-nav-mobile').toggleClass('header-nav-mobile_active');
        $('.header-nav-link').hide(600);
        $('.header-nav-mobile-close').show(600);
    });
    $('.header-nav-mobile-close').click(function() {
        $('.header-nav-mobile').toggleClass('header-nav-mobile_active');
        $('.header-nav-link').show(600);
        $('.header-nav-mobile-close').hide(600);
    });
    $('.header-nav-mobile a').click(function() {
        $('.header-nav-mobile').toggleClass('header-nav-mobile_active');
        $('.header-nav-link').show(600);
    });

    function onResize() {
        $('.popular-compositions-info-block-text').equalHeights();
    }
    onResize();
    window.onresize = function() { onResize() };

    $('.concert-tours-slider').slick({
        dots: true,
        arrows: false,
        adaptiveHeight: true,
        autoplay: false,
        infinite: true,
        // autoplaySpeed: 5000,
        // speed: 500,
        fade: true,
        cssEase: 'linear'
    });

    $('.awards-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        infinite: true,
        // TouchMove: true,
        // focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 800,
        responsive: [{
            breakpoint: 576,
            settings: {
                arrows: false
            }
        }]
    });

    $('.history-slider').slick({
        arrows: false,
        dots: false,
        centerMode: true,
        centerPadding: '0',
        slidesToShow: 5,
        slidesToScroll: 1,
        focusOnSelect: true,
        responsive: [{
                breakpoint: 1201,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '20%'
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '5%'
                }
            }
        ]
    });

    // Скрываем header
    var header = $('.header'); // Меню
    var scrollPrev = 0 // Предыдущее значение скролла
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop(); // Высота скролла в px
        var firstScrollUp = false; // Параметр начала сколла вверх
        var firstScrollDown = false; // Параметр начала сколла вниз
        // Если скроллим
        if (scrolled > 0) {
            if ($('.header-nav-mobile').hasClass('header-nav-mobile_active')) {
                return
            }

            // Если текущее значение скролла > предыдущего, т.е. скроллим вниз
            if (scrolled > scrollPrev) {
                firstScrollUp = false; // Обнуляем параметр начала скролла вверх
                // Если меню видно
                if (scrolled < header.height() + header.offset().top) {
                    // Если только начали скроллить вниз
                    if (firstScrollDown === false) {
                        var topPosition = header.offset().top; // Фиксируем текущую позицию меню
                        header.css({
                            'top': topPosition + 'px'
                        });
                        firstScrollDown = true;
                    }
                    // Позиционируем меню абсолютно
                    header.css({
                        'position': 'absolute'
                    });
                    // Если меню НЕ видно
                } else {
                    // Позиционируем меню фиксированно вне экрана
                    header.css({
                        'position': 'fixed',
                        'top': '-' + header.height() + 'px'
                    });
                }
                // Если текущее значение скролла < предыдущего, т.е. скроллим вверх
            } else {
                firstScrollDown = false; // Обнуляем параметр начала скролла вниз
                // Если меню не видно
                if (scrolled > header.offset().top) {
                    // Если только начали скроллить вверх
                    if (firstScrollUp === false) {
                        var topPosition = header.offset().top; // Фиксируем текущую позицию меню
                        header.css({
                            'top': topPosition + 'px'
                        });
                        firstScrollUp = true;
                    }
                    // Позиционируем меню абсолютно
                    header.css({
                        'position': 'absolute'
                    });
                } else {
                    // Убираем все стили
                    header.removeAttr('style');
                }
            }
            // Присваеваем текущее значение скролла предыдущему
            scrollPrev = scrolled;
        }
    });

    // Изменение bgc меню при скролле
    $(window).scroll(function() {
        if ($(this).scrollTop() > 70) {
            $('.header').css('background-color', 'rgba(255,255,255,.8)');
        }
    });

    //E-mail Ajax Send
    $('form.contact-form').submit(function() { //Change
        var th = $(this);
        $.ajax({
            type: 'POST',
            url: 'mail.php', //Change
            data: th.serialize()
        }).done(function() {
            $(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
            setTimeout(function() {
                $(th).find('.success').removeClass('active').fadeOut();
                th.trigger('reset');
            }, 5000);
        });
        return false;
    });

    new AnimOnScroll(document.getElementById('grid'), {
        minDuration: 0.4,
        maxDuration: 0.7,
        viewportFactor: 0.2
    });

    $('.zoom-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function(item) {
                return item.el.attr('title') /* + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>'*/ ;
            }
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 400, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }

    });

    // new WOW().init();

});