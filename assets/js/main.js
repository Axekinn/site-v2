(function($) {

    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper'),
        $main = $('#main'),
        settings = {
            keyboardShortcuts: {
                enabled: true,
                distance: 50
            },
            scrollWheel: {
                enabled: true,
                factor: 1
            },
            scrollZones: {
                enabled: true,
                speed: 15
            }
        };

    // Détection du navigateur sans plugin
    var isIE = /MSIE|Trident/.test(navigator.userAgent);
    var isMobile = /Mobi|Android/i.test(navigator.userAgent);
    var isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    var isFirefox = /Firefox/i.test(navigator.userAgent);

    // Mobile: Revenir au défilement natif.
    if (isMobile) {
        // Désactiver les fonctionnalités d'assistance au défilement.
        settings.keyboardShortcuts.enabled = false;
        settings.scrollWheel.enabled = false;
        settings.scrollZones.enabled = false;

        // Réactiver le débordement sur le principal.
        $main.css('overflow-x', 'auto');
    }

    // IE: Corriger la hauteur minimale/flexbox.
    if (isIE) {
        $wrapper.css('height', '100vh');
    }

    // iOS: Compenser la barre d'adresse.
    if (isiOS) {
        setTimeout(function() {
            $wrapper.css('margin-top', -($window.scrollTop()));
        }, 0);
    }

    if (isiOS) {
        // Code pour iOS
    }

    if (isMobile) {
        // Code pour mobiles
    }

    if (isFirefox) {
        // Code spécifique à Firefox
    }

    // Reste de votre code...

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Items.

    // Assign a random "delay" class to each thumbnail item.
    $('.item.thumb').each(function() {
        $(this).addClass('delay-' + Math.floor((Math.random() * 6) + 1));
    });

    // IE : Corriger les images des vignettes.
    if (isIE) {
        $('.item.thumb').each(function() {
            var $this = $(this),
                $img = $this.find('img');

            $this
                .css('background-image', 'url(' + $img.attr('src') + ')')
                .css('background-size', 'cover')
                .css('background-position', 'center');

            $img.css('opacity', '0');
        });
    }

    // Poptrox.
    $main.poptrox({
        onPopupOpen: function() { $body.addClass('is-poptrox-visible'); },
        onPopupClose: function() { $body.removeClass('is-poptrox-visible'); },
        overlayColor: '#1a1f2c',
        overlayOpacity: 0.75,
        popupCloserText: '',
        popupLoaderText: '',
        selector: '.item.thumb a.image',
        caption: function($a) {
            return $a.prev('h2').html();
        },
        usePopupDefaultStyling: false,
        usePopupCloser: false,
        usePopupCaption: true,
        usePopupNav: true,
        windowMargin: 50
    });

    /*
    breakpoints.on('>small', function() {
        $main[0]._poptrox.windowMargin = 50;
    });

    breakpoints.on('<=small', function() {
        $main[0]._poptrox.windowMargin = 0;
    });
    */

    // Keyboard shortcuts.
    if (settings.keyboardShortcuts.enabled)
        (function() {

            $window

                // Keypress event.
                .on('keydown', function(event) {

                    var scrolled = false;

                    if ($body.hasClass('is-poptrox-visible'))
                        return;

                    switch (event.keyCode) {

                        // Left arrow.
                        case 37:
                            $main.scrollLeft($main.scrollLeft() - settings.keyboardShortcuts.distance);
                            scrolled = true;
                            break;

                        // Right arrow.
                        case 39:
                            $main.scrollLeft($main.scrollLeft() + settings.keyboardShortcuts.distance);
                            scrolled = true;
                            break;

                        // Page Up.
                        case 33:
                            $main.scrollLeft($main.scrollLeft() - $window.width() + 100);
                            scrolled = true;
                            break;

                        // Page Down, Space.
                        case 34:
                        case 32:
                            $main.scrollLeft($main.scrollLeft() + $window.width() - 100);
                            scrolled = true;
                            break;

                        // Home.
                        case 36:
                            $main.scrollLeft(0);
                            scrolled = true;
                            break;

                        // End.
                        case 35:
                            $main.scrollLeft($main.width());
                            scrolled = true;
                            break;

                    }

                    // Scrolled?
                    if (scrolled) {

                        // Prevent default.
                        event.preventDefault();
                        event.stopPropagation();

                        // Stop link scroll.
                        $main.stop();

                    }

                });

        })();

    // Scroll wheel.
    if (settings.scrollWheel.enabled)
        (function() {

            // Based on code by @miorel + @pieterv of Facebook (thanks guys :)
            // github.com/facebook/fixed-data-table/blob/master/src/vendor_upstream/dom/normalizeWheel.js
            var normalizeWheel = function(event) {

                var pixelStep = 10,
                    lineHeight = 40,
                    pageHeight = 800,
                    sX = 0,
                    sY = 0,
                    pX = 0,
                    pY = 0;

                // Legacy.
                if ('detail' in event)
                    sY = event.detail;
                else if ('wheelDelta' in event)
                    sY = event.wheelDelta / -120;
                else if ('wheelDeltaY' in event)
                    sY = event.wheelDeltaY / -120;

                if ('wheelDeltaX' in event)
                    sX = event.wheelDeltaX / -120;

                // Side scrolling on FF with DOMMouseScroll.
                if ('axis' in event
                    && event.axis === event.HORIZONTAL_AXIS) {
                    sX = sY;
                    sY = 0;
                }

                // Calculate.
                pX = sX * pixelStep;
                pY = sY * pixelStep;

                if ('deltaY' in event)
                    pY = event.deltaY;

                if ('deltaX' in event)
                    pX = event.deltaX;

                if ((pX || pY)
                    && event.deltaMode) {

                    if (event.deltaMode == 1) {
                        pX *= lineHeight;
                        pY *= lineHeight;
                    }
                    else {
                        pX *= pageHeight;
                        pY *= pageHeight;
                    }

                }

                // Fallback if spin cannot be determined.
                if (pX && !sX)
                    sX = (pX < 1) ? -1 : 1;

                if (pY && !sY)
                    sY = (pY < 1) ? -1 : 1;

                // Return.
                return {
                    spinX: sX,
                    spinY: sY,
                    pixelX: pX,
                    pixelY: pY
                };

            };

            // Wheel event.
            $body.on('wheel', function(event) {

                // Disable on <=small.
                if (breakpoints.active('<=small'))
                    return;

                // Prevent default.
                event.preventDefault();
                event.stopPropagation();

                // Stop link scroll.
                $main.stop();

                // Calculate delta, direction.
                var n = normalizeWheel(event.originalEvent),
                    x = (n.pixelX != 0 ? n.pixelX : n.pixelY),
                    delta = Math.min(Math.abs(x), 150) * settings.scrollWheel.factor,
                    direction = x > 0 ? 1 : -1;

                // Scroll page.
                $main.scrollLeft($main.scrollLeft() + (delta * direction));

            });

        })();

    // Scroll zones.
    if (settings.scrollZones.enabled)
        (function() {

            var $left = $('<div class="scrollZone left"></div>'),
                $right = $('<div class="scrollZone right"></div>'),
                $zones = $left.add($right),
                paused = false,
                intervalId = null,
                direction,
                activate = function(d) {

                    // Disable on <=small.
                    if (breakpoints.active('<=small'))
                        return;

                    // Paused? Bail.
                    if (paused)
                        return;

                    // Stop link scroll.
                    $main.stop();

                    // Set direction.
                    direction = d;

                    // Initialize interval.
                    clearInterval(intervalId);

                    intervalId = setInterval(function() {
                        $main.scrollLeft($main.scrollLeft() + (settings.scrollZones.speed * direction));
                    }, 25);

                },
                deactivate = function() {

                    // Unpause.
                    paused = false;

                    // Clear interval.
                    clearInterval(intervalId);

                };

            $zones
                .appendTo($wrapper)
                .on('mouseleave mousedown', function(event) {
                    deactivate();
                });

            $left
                .css('left', '0')
                .on('mouseenter', function(event) {
                    activate(-1);
                });

            $right
                .css('right', '0')
                .on('mouseenter', function(event) {
                    activate(1);
                });

            $body
                .on('---pauseScrollZone', function(event) {

                    // Pause.
                    paused = true;

                    // Unpause after delay.
                    setTimeout(function() {
                        paused = false;
                    }, 500);

                });

        })();

    /* disclaimer 
    document.addEventListener('DOMContentLoaded', function() {
        const disclaimer = document.getElementById('disclaimer');
        const closeBtn = document.getElementById('closeDisclaimer');

        closeBtn.addEventListener('click', function() {
            disclaimer.style.display = 'none';
        });
    });*/

    document.getElementById('closeDisclaimer').addEventListener('click', function() {
        document.getElementById('disclaimer').style.display = 'none';
    });

    console.log(browser);

})(jQuery);