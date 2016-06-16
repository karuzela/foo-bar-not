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

/* efekt pisania na maszynie */
function typeWriting (newString){
    var comment = $("#span_ready");
    var typeWriting = new TypeWriting({
            targetElement: comment [0],
            inputString: newString,
            typing_interval: 130,
            blink_interval: '1s',
            cursor_color: '#9c1b82',
        });
}

/* animacja odjazdu ekranu ready */
function removeReadyScreen (delay){
    var ready_screen = $("div.ready_container");
    
    ready_screen.delay(delay).animate({
            top: "-100vh"}, 1000, function(){
                prepareTheGameScreen();
            });
}

/* po naciśnięciu buttona YES ukrywa się ekran z pytaniem "ready?" i pojawia się ekran do gry */
function clickButtonYes(){
    var button_yes = $(".yes_button");
    var heart_container = $(".heart-Container");
    var comment = $("#span_ready");
    
    button_yes.on("click", function(){
        if (heart_container.hasClass("broken")){
            heart_container.removeClass("broken");
            removeReadyScreen(1100);
        }  
        else if( comment.hasClass("eyes")) {
            typeWriting("(@_@)");
            removeReadyScreen(1200);
        }
        else {
            removeReadyScreen(0);
        }
    })
}

/* po naciśnięciu buttona MAYBE pojawia się zaskoczona minka */
function clickButtonMaybe(){
    var button_maybe = $(".maybe_button");
    var comment = $("#span_ready");
    var heart = $("#heart");
    
    button_maybe.on("click", function(){
        heart.addClass("heart_hide");
        heart.find('.heart-Container').removeClass('broken');
        comment.removeClass("span_ready_hide");
        comment.addClass('eyes');
        typeWriting("(0_0)");
    })
}

/* po naciśnięciu buttona NO pojawia się pęknięte serce */
function clickButtonNo(){
    var button_no = $(".no_button");

    button_no.click(function(){
        var heart = $("#heart");
        var comment = $("#span_ready");
    
        comment.addClass("span_ready_hide");
        heart.find('.heart-Container').removeClass('broken');
        heart.removeClass("heart_hide");
        setTimeout(function() {
            heart.find('.heart-Container').addClass('broken');
        }, 800);
    })
        
}

/* serce musi być ukryte, pojawia się dopiero w momencie wciśnięcia buttona NO */
function hideHeart(){
    $("#heart").toggleClass("heart_hide");
}

function initiateGame(){
    var foo_button = $(".foo_button");
    var bar_button = $(".bar_button");
    var foobar_button = $(".foobar_button");
    var not_button = $(".not_button");
    
    
}

function startGame(){
    var start = $(".game_screen_wrapcontent_ready");
    
    start.addClass("start").html("START");
    start.on("click", function(){
        showRandomNumber();
        $('.timer').startTimer({
            onComplete: function(element){
            console.log('ldsfdsf')
            }
        });
    })
}

function getRandomNumber(){
    var random_number = Math.ceil(Math.random() * 100);
    return random_number;
}

function showRandomNumber(){
    var random_number = getRandomNumber();
    var start = $(".game_screen_wrapcontent_ready");
    
    start.removeClass("start");
    start.html(random_number);
    transform_number($('.counter'), 30, 'fixed_width');
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
    initiateGame();
    startGame();
    
    $.jInvertScroll(['.scroll'],        // an array containing the selector(s) for the elements you want to animate
        {
        height: 6000,                   // optional: define the height the user can scroll, otherwise the overall length will be taken as scrollable height
        onScroll: function(percent) {   //optional: callback function that will be called when the user scrolls down, useful for animating other things on the page
        }
    });
});