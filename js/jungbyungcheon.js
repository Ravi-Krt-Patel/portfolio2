$(function () {


    var gnbOffset = $("header").offset();
    function headerFixed() {
        if ($(document).scrollTop() > gnbOffset.top) {
            $("header").addClass("scroll-active");
        } else {
            $("header").removeClass("scroll-active");
        }
    }


    var menuLink = $('.menu li a');
    menuLink.click(function (e) {
        e.preventDefault();

        $(window).off('load scroll', onOff);
        $(this).parent('li').siblings().removeClass('active');
        $(this).parent('li').addClass('active');
        $('html,body').animate({ scrollTop: $(this.hash).offset().top - 40 }, 600);

        setTimeout(function () {
            $(window).on('load scroll', onOff);
        }, 600);
    })

    var moblieMenu = function () {
        var logoLink = $('.logo a');
        $('.moblie-menu').hide().slideUp();

        logoLink.click(function () {
            var windowWidth = $(window).width();
            if (486 >= windowWidth) {
                var moblie = $('.moblie-gnb-wrap');
                closeBg.hide();
                moblie.find('.close-icon , .moblie-menu').hide();
                moblie.find('.menu-icon').show();
                $('.moblie-gnb-wrap').animate({ width: '0' }, 200);
            }
        });


        var menuIcon = $('.moblie-gnb-wrap .icon-wrap i');
        menuIcon.click(function () {
            $(this).hide();
            $(this).siblings().show();
            var menuClose = $('.icon-wrap i.close-icon');
            if (!menuClose.is(':visible')) {
                closeBg.hide();
                $('.moblie-gnb-wrap').animate({ width: '0' }, 200);
                $('.moblie-menu').hide();
            } else {
                closeBg.show();
                $('.moblie-gnb-wrap').animate({ width: '50%' }, 200);
                $('.moblie-menu').show();
            }
        });


        var closeBg = $('#header .close-bg');
        closeBg.click(function () {
            $('.moblie-gnb-wrap').animate({ width: '0' }, 200);
            $('.moblie-menu , i.close-icon').hide();
            $(this).hide();
            $('i.menu-icon').show();
        })
    }
    moblieMenu();



    var onOff = function () {
        $('section').each(function () {
            var idFind = $(this).attr('id');
            var sectionTop = $(this).offset().top;
            var scrollTop = $(window).scrollTop() + $(window).height();

            if (($(this).offset().top - $(window).scrollTop()) < 70) {
                var menuEl = menuLink.parent('li').find('a[href="#' + idFind + '"]');
                menuEl.parent('li').siblings().removeClass('active');
                menuEl.parent('li').addClass('active');
            }

            if ((sectionTop + 300) <= scrollTop) {
                $(this).addClass('show')
            }
        });
    }
    onOff();


    $('.tab-wrap .tab-content').hide();
    $('.tab-wrap .tab-content.active').show();
    $('.tab-wrap .list-wrap ul li').click(function () {
        onOff();
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        var tabRel = $(this).find('span').text();
        var dataTab = '#' + $(this).attr('data-tab');

        // 주소부분 텍스트 변경 및 내용 show
        $('.tab-rel-wrap .tab-rel').text(tabRel);
        $(dataTab).siblings().removeClass('active').hide();
        $(dataTab).addClass('active').fadeIn();
        var tabIndex = $(this).index();
        var barLength = $(dataTab).find('.bar-wrap span').length - 1;

        //각 tab별 bar 크기 조정
        $('.tab-content').each(function () {
            var barWidth = $(this).find('.bar-wrap span');
            if (barLength > tabIndex) {
                barWidth.eq(tabIndex).delay(200).animate({ width: '100%' }, 600).stop();
                barWidth.eq(tabIndex + 1).delay(200).animate({ width: '80%' }, 600).stop();
                barWidth.eq(tabIndex - 1).delay(200).animate({ width: '60%' }, 600).stop();
            } else if (barLength = tabIndex) {
                barWidth.eq(tabIndex).delay(200).animate({ width: '100%' }, 600).stop();
                barWidth.eq(tabIndex - 2).delay(200).animate({ width: '80%' }, 600).stop();
                barWidth.eq(tabIndex - 1).delay(200).animate({ width: '60%' }, 600).stop();
            }
        })
        // #tab03 mbti 각 bar 크기 함수  
        if ($('#tab03').hasClass("active") === true) {
            $('.caption .bar').each(function () {
                var rightBar = $(this).find('._right').text().substring(0, 2);
                var leftBar = $(this).find('._left').text().substring(0, 2);
                var mbtiBar = rightBar - leftBar;
                if (mbtiBar >= 0) {
                    $(this).find('.bar').css({ 'width': rightBar + '%', 'right': 0 });
                } else {
                    $(this).find('.bar').css({ 'width': leftBar + '%', 'left': 0 });
                }
            })
        } else {
            $('.caption .bar').find('.bar').css({ 'width': '5%' });
        }
    })

    //차트이벤트
    var f = true;
    var chartAni = function () {
        //scroll 기준점
        var here = $(window).scrollTop();
        var chartTop = $('#skills').offset().top - 300;
        var maxTop = $('#portfolio').offset().top - 300;
        if (here >= chartTop && here <= maxTop) {
            //text 숫자증가가 반복실행되어 이중IF문 사용 
            if (f == true) {
                //각차트 each
                $('.doughnut').each(function () {

                    var gauge = $(this).find('.gauge');
                    var chartEl = $(this).find('.per');
                    var per = chartEl.attr('data-per');
                    //해당 차트 데이터값에 비율계산 80 -> 0.2
                    var val = (100 - per) / 100;
                    //r=45기준 2*pi*r = 282.7 기준 퍼센트게이지 채우기
                    gauge.css({ 'stroke-dashoffset': 282.7 * val });
                    //퍼센트 숫자 증가
                    $({ num: 0 }).animate({ num: per }, {
                        duration: 1000,
                        // step: function () {
                        //     chartEl.text(Math.round(this.num) + '');
                        //     //숫자증가끝나고 이중if문 false로 이벤트중단
                        //     f = false;
                        // }
                    })
                })
            }
        }
    }

    //포폴
    var portfolio = function () {
        var itemEl = $('.js-portfolio .item-wrap li');
        var listEl = $('.portfolio-wrap .item-wrap li');
        var modalEl = $('.modal-popup-wrap .item-modal-wrap li');
        //리스트숫자
        itemEl.each(function (eq) {
            var listNum = eq + 1 + '.'
            $(this).find('.li-num').text('0' + listNum);
        })
        //모달팝업
        listEl.each(function (eq2) {
            $(this).find('button').click(function () {
                $('body').addClass('hidden');
                $('.modal-popup-wrap').show().addClass('show');
                $('.modal-popup-wrap').find('.close-bg').show();
                modalEl.eq(eq2).addClass('active');
                var monitor = $('.modal-popup-wrap .item.active').find('.monitor');
                var monitorH = monitor.width() * (7 / 16);
                $('.monitor').height(monitorH);
                //close bg 높이수정
                var itemH = $('.item-modal-wrap').height()
                var modalH = $('.modal-popup-wrap').height()
                if (modalH <= itemH) {
                    $('.modal-popup-wrap').find('.close-bg').height(itemH + 100);
                }
            })
        })
        //close
        $('.modal-popup-wrap .close-bg, .list-wrap .close').click(function () {
            $('body').removeClass('hidden');
            $('.modal-popup-wrap').hide().removeClass('show');
            modalEl.removeClass('active');
        })

    }
    portfolio();

    // window load && scroll 시
    $(window).resize(function () {
        var monitor = $('.modal-popup-wrap .item.active').find('.monitor');
        var monitorH = monitor.width() * (7 / 16);
        $('.monitor').height(monitorH);
    })
    $(window).on('load scroll', function () {
        headerFixed();
        chartAni();
    });
    //메뉴클릭시 이동중 off 하기위한 중복 on
    $(window).on('load scroll', onOff);
    // $(window).resize(function(){
    //     moblieJs();
    // })

})