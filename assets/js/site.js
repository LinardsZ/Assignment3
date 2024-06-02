$(function () {
    var
        $navigationWrapper = $("#sb-navigation"),
        $navigationSection = $("#sb-navigation > .sb-section")

    function toggleFixedNavigation() {
        $navigationSection = $("#sb-navigation > .sb-section")

        if ($navigationSection.hasClass("option-nav-fixed")) {
            var $bannerSection = $("#sb-banner > .sb-section")

            if ($(window).scrollTop() > 0) {
                $navigationWrapper.addClass("sb-nav--fixed");

                var bannerOuterHeight = 0
                if ($bannerSection.length > 0 && $("body").hasClass("is-banner-in")) {
                    bannerOuterHeight = $bannerSection.outerHeight();
                    $navigationSection.css('top', bannerOuterHeight + 'px');
                }

                if (!$navigationSection.hasClass('option-nav-overlay')) {
                    $('body').css('padding-top', $navigationWrapper.outerHeight() + bannerOuterHeight + 'px')
                }
            } else {
                $navigationWrapper.removeClass("sb-nav--fixed");

                if ($bannerSection.length > 0) {
                    $navigationSection.css('top', '0px');
                }

                if ($bannerSection.length > 0 && $("body").hasClass("is-banner-in")) {
                    $('body').css('padding-top', $bannerSection.outerHeight() + 'px');
                } else {
                    $('body').css('padding-top', '0px');
                }
            }
        }
    }

    // Adjust Hero top padding when nav is overlayed above it
    function adjustHeroPadding() {
        if (!$navigationSection.hasClass('option-nav-overlay')) return

        const $firstHero = $('#sb-page-structure > section:first')

        if (!$firstHero.hasClass('option-section-hero')) {
            $navigationSection.removeClass('option-nav-overlay')
            $('body').removeClass('has-overlay-nav')
        } else {
            const navHeight = $navigationSection.outerHeight()
            const topPadding = navHeight + 20 // Plus default section padding

            $firstHero.css('paddingTop', `${topPadding}px`);
        }
    }

    adjustHeroPadding()


    $(window).scroll(function () {
        toggleFixedNavigation()
    });

    $(window).resize(function () {
        setTimeout(function () {
            adjustHeroPadding()
            toggleFixedNavigation()

            // Properly hide banner on window resize as resizing can adjust banner's height
            if (!$navigationSection.hasClass("option-nav-fixed") && $('body').hasClass('is-banner-out')) {
                var $bannerSection = $("#sb-banner")
                $bannerSection.css('margin-top', '-' + $bannerSection.outerHeight() + 'px')
            }
        }, 200)
    })
});
