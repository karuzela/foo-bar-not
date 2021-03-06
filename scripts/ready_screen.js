/* pojawia się ekran do gry */
function prepareTheGameScreen(){
    var game_screen = $("div.game_container");
    var ready_screen = $("div.ready_container");
    var min_width = window.matchMedia("(min-width: 700px)"); min_width.addListener(showGameScreen);
    showGameScreen(min_width);
    ready_screen.remove();
    
    function showGameScreen(mediaQuery){
        if(mediaQuery.matches){
            game_screen.animate({
                top: "0vh"}, 3000);
        }
        else {
            game_screen.animate({
                left: "0vw"}, 1000);
        }
    }
}

/* efekt pisania na maszynie */
function typeWriting (newString){
    console.log("test");
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
            top: "-150vh"}, 1000, function(){
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
            typeWriting(":)");
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
    var heart_container = $(".heart-Container");
    
    button_maybe.on("click", function(){
        heart.addClass("heart_hide");
        heart_container.removeClass('broken');
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
        var heart_container = $(".heart-Container");
    
        comment.addClass("span_ready_hide");
        heart_container.removeClass('broken');
        heart.removeClass("heart_hide");
        setTimeout(function() {
            heart_container.addClass('broken');
        }, 800);
    })    
}

/* serce musi być ukryte, pojawia się dopiero w momencie wciśnięcia buttona NO */
function hideHeart(){
    $("#heart").toggleClass("heart_hide");
}