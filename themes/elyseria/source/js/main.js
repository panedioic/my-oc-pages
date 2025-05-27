$(document).ready(function() {
    // 导航栏滚动效果
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.header').addClass('header-scroll');
        } else {
            $('.header').removeClass('header-scroll');
        }
    });

    // 返回顶部按钮
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    $('.back-to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    // 移动端菜单
    $('.mobile-menu-toggle').click(function() {
        $('.nav').toggleClass('nav-open');
        $(this).toggleClass('active');
    });

    // 特性卡片hover效果
    $('.feature-card').hover(
        function() {
            $(this).addClass('card-hover');
        },
        function() {
            $(this).removeClass('card-hover');
        }
    );

    // 平滑滚动
    $('a[href*="#"]').not('[href="#"]').click(function(event) {
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 1000);
            }
        }
    });
}); 