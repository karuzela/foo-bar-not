/* po najechaniu na kółko zmienia się na nim napis */
function hover_main_circle (circle){
    var wrapcontent = $(".wrapcontent");
    var p = wrapcontent.find("p");
    
    circle.on("mouseenter", function(){
        wrapcontent.html("<p>Scroll me!</p>");
        p.addClass("scroll_me");
    })
}

function leave_main_circle (circle){
    var wrapcontent = $(".wrapcontent");
    var p = wrapcontent.find("p");
    
    circle.on("mouseleave", function(){
        wrapcontent.html("<p>foo, bar</p><p>or not?</p>");
        p.removeClass("scroll_me");;
    })
}

/* napis przeniesie się na dół strony */
function animation_second_rule(){
    $(window).scroll(function(){
        if($(window).scrollTop() > 300) {
            $("#second_rule_copy").animate({ 
                top: "45vh"}, 7000);
        } 
    });
}

/* animacja ukazująca elementy po kolei */
function setOpacity1 (element, delay) {
    element.delay(delay).animate({
               opacity: 1}, 3000);
}

function animation_third_rule(){
    $(window).scroll(function(){
       if($(window).scrollTop() > 410) {
           setOpacity1($("#p2_third_rule"), 3000);
           setOpacity1($(".left"), 3000);
           setOpacity1($("#p3_third_rule"), 5000);
           setOpacity1($(".right"), 5000);
           setOpacity1($("#p4_third_rule"), 7000);
           setOpacity1($(".up"), 7000);
           setOpacity1($("#p5_third_rule"), 9000);
           setOpacity1($(".down"), 9000);
       }
    });
}

/* pojawia się ekran do gry */
function prepareTheGameScreen(){
    var game_screen = $("div.game_container");
    
    $("div.ready_container").remove();
    game_screen.animate({
            top: "0vh"}, 3000);
}

/* ukrywa się ekran z pytaniem "ready?"*/
function clickButtonYes(){
    var ready_screen = $("div.ready_container");
    var button_yes = $(".yes_button");
    
    button_yes.on("click", function(){
        ready_screen.animate({
            top: "-100vh"}, 3000, function(){
                prepareTheGameScreen();
            });
    })
}

/* reakcja na wybór "maybe" */
function clickButtonMaybe(){
    var button_maybe = $(".maybe_button");
    var comment = $("#span_ready");
    var heart = $("#heart");
    
    button_maybe.on("click", function(){
        heart.toggleClass("heart_hide");
        comment.toggleClass("span_ready_hide");
        var typeWriting = new TypeWriting({
        targetElement: comment [0],
        inputString: "(o_O)",
        typing_interval: 130,
        blink_interval: '1s',
        cursor_color: '#9c1b82',
        }, function() {
        });   
    })
}

function clickButtonNo(){
    var button_no = $(".no_button");
    var comment = $("#span_ready");

    button_no.click(function(){
        var heart = $("#heart");
        var newHeart = heart.clone(true); 
        heart.before(newHeart); 
        heart.remove();
        
        comment.toggleClass("span_ready_hide");
        $("#heart").removeClass("heart_hide");
        setTimeout(function() {
            newHeart.find('.heart-Container').addClass('broken');
        }, 1000);
    })
        
}

function hideHeart(){
    $("#heart").toggleClass("heart_hide");
}

$(document).ready(function(){
    hover_main_circle($(".main_circle"));
    leave_main_circle($(".main_circle"));
    animation_second_rule();
    animation_third_rule();
    clickButtonYes();
    clickButtonMaybe();
    clickButtonNo();
    hideHeart();
    
    $.jInvertScroll(['.scroll'],        // an array containing the selector(s) for the elements you want to animate
        {
        height: 6000,                   // optional: define the height the user can scroll, otherwise the overall length will be taken as scrollable height
        onScroll: function(percent) {   //optional: callback function that will be called when the user scrolls down, useful for animating other things on the page
        }
    });
});