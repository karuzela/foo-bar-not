(function($) {
    $.fn.annalka = function(targetString, options) {
        var settings = $.extend({}, $.fn.annalka.defaults, options);
        var self = this;

        var text = $(self).text();
        var step = 0;
        var solved = 0;

        var interval = setInterval(function () {
            if (step > settings.steps) {
                step = 0;
                if (targetString.length < text.length) {
                    text = text.substring(0, text.length - 1);
                } else if (targetString.length > text.length) {
                    text += randomChar(settings.chars);
                } else {
                    text = stringReplaceAt(text, solved, targetString[solved]);
                    solved++;
                }
            }
            step += 1;

            if (text === targetString) {
                clearInterval(interval);
                settings.callback();
            } else {
                text = stringReplaceAt(text, Math.floor(Math.random() * (text.length - solved)) + solved, randomChar(settings.chars));
            }

            $(self).text(text);

        }, settings.tick);

        return this;
    };

    $.fn.annalka.defaults = {
        tick: 15,
        steps: 4,
        chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        callback: function() {}
    };

    function stringReplaceAt(str, index, character) {
        return str.substring(0, index) + character + str.substring(index+character.length);
    }

    function randomChar(possible) {
        return possible[Math.floor(Math.random() * possible.length)];
    }
})(jQuery);