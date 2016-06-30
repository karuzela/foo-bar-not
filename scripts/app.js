var gameSettings = {
    points: 0,
    accuracy: 0,
    clicks: 0,
    random_number: null,
    isActive: false,
    start: null,
    consecutive_hits: 0
}

// przebieg gry
function startGame(){
    gameSettings.points = 0;
    gameSettings.accuracy = 0;
    gameSettings.clicks = 0;
    gameSettings.consecutive_hits = 0;
    var counter_value = $("#counter_value");
    var foo_button = $(".foo_button");
    var bar_button = $(".bar_button");
    var foobar_button = $(".foobar_button");
    var not_button = $(".not_button");
    var button_play_again = $(".play_again");

// resetuje ustawienia do rozpoczęcia nowej gry
    function reset(){
        var buttons = $(".game_screen_wrapcontent_buttons");
        var buttons_final = $(".game_screen_wrapcontent_buttons_final");
        gameSettings.points = 0;
        gameSettings.consecutive_hits = 0;
        
        $('.timer').empty();
        counter_value.html(gameSettings.points); 
        buttons.removeClass("gameover_buttons");
//        buttons_final.removeClass("gameover_buttons");
        $(".game_screen_wrapcontent_buttons").css(
            "top", "20vh");
        $(".game_screen_wrapcontent_final_buttons").css({
            "top": "200vh", "opacity": "1"});
        gameSettings.start.empty();
        $(".final_score").css({"opacity": "0", "z-index": "0"});
    }
    
// odpala grę
    function init() {
        gameSettings.random_number = getRandomNumber();
        showRandomNumber(gameSettings.random_number);
        gameSettings.start.removeClass("start");
        gameSettings.isActive = true;
        startTimer();
        gameSettings.start.off("click");
    }
  
    gameSettings.start.addClass("start").html("START");
    
// po kliknięciu w "play again" zaczynamy od nowa
    $('body').on("click", ".play_again", function() {
        reset();
        init();
    })
    gameSettings.start.on("click", init);
    foo_button.on("click", function(){
        if (gameSettings.isActive) {
                isFoo();
         }
    })
    bar_button.on("click", function(){
        if(gameSettings.isActive){
            isBar();
        }
    })
    foobar_button.on("click", function(){
        console.log("test");
        if(gameSettings.isActive){
            isFooBar();
        }
    })
    not_button.on("click", function(){
        if(gameSettings.isActive){
            isNot();
        }
    })
}

// koniec gry - pokazuje się wynik
function showGameOver(points, accuracy, clicks){
    var buttons = $(".game_screen_wrapcontent_buttons");
    var buttons_final = $(".game_screen_wrapcontent_final_buttons");
    var final_score_points = $(".final_score_points");
    var final_score_accuracy = $(".final_score_accuracy");
    
    buttons_final.css("opacity", "0");
    buttons.addClass("gameover_buttons");
    gameSettings.start.html(function (){
            return "<div class='score'><p class='gameover_copy'>game over</p>"
    })
    final_score_points.html(function (){
        if (clicks === 0){
            return "<p>points: " + gameSettings.points + "</p>";
        }
        else {
            return "<p>points: " + gameSettings.points + "</p>";
        }
    })
    final_score_accuracy.html(function (){
        if (clicks === 0){
            "<p>accuracy: 0%</p>";
        }
        else {
            return "<p>accuracy: " + Math.ceil((gameSettings.accuracy/gameSettings.clicks)*100) + "%</p>";
        }
    })
    
    $(".final_score").animate({
        opacity: 1,
        zIndex: 20000,
        },200);
}

function startTimer(){
    $('.timer').startTimer({
        onComplete: function(element){
            gameSettings.isActive = false;
            showGameOver(gameSettings.points, gameSettings.accuracy, gameSettings.clicks);
        }
    });
}


// ------------------------------------ //
// weryfikacja poprawności odpowiedzi   //
function isAnswerCorrect(condition){
    var counter_value = $("#counter_value");
    var final_buttons = false;
    
    if (condition){
        answerIsCorrect(final_buttons);
    }
    else {
       showThatAnswerIsIncorrect(); 
        gameSettings.consecutive_hits = 0;
    }
    gameSettings.random_number = getRandomNumber();
    showRandomNumber(gameSettings.random_number);
    gameSettings.clicks++;
    counter_value.html(gameSettings.points);
    final_buttons = true;
}

// po niepoprawnej odpowiedzi tło liczby robi się na chwilę fioletowe
function showThatAnswerIsIncorrect(){
    $("div.game_screen_wrapcontent_ready.counter").animate({
        "background-color": "#9c1b82"},120).animate({
        "background-color": "white"},120)  
}

function answerIsCorrect(final_buttons){
    gameSettings.points = gameSettings.points + 10;
    gameSettings.accuracy++;
    gameSettings.consecutive_hits++;
    showCheckmark();
     if (gameSettings.consecutive_hits === 5 && final_buttons === false){
            showFinalButtons();
            final_buttons = true;
        }
}

// po każdej poprawnej odpowiedzi pojawia się checkmark
function showCheckmark (){
    $(".checkmark").animate({
        opacity: 0.8},150).animate({
        opacity: 0},150);
    $(".checkmark_final").animate({
        opacity: 0.8},150).animate({
        opacity: 0},150)
}

// po 5 prawidłowych odpowiedziach z rzędu pokaże się trudniejsza wersja buttonów
function showFinalButtons (){
    $(".game_screen_wrapcontent_buttons").animate({
        top:"200vh"},300).delay(300);
    $(".game_screen_wrapcontent_final_buttons").css(
        "opacity", "1")
    $(".game_screen_wrapcontent_final_buttons").animate({
        top: "0vh"}, 300)
}

function isFoo(){
    isAnswerCorrect(gameSettings.random_number % 3 === 0 && !(gameSettings.random_number % 5 === 0));
}

function isBar(){
    isAnswerCorrect(gameSettings.random_number % 5 === 0 && !(gameSettings.random_number % 3 === 0));
}

function isFooBar(){
    isAnswerCorrect(gameSettings.random_number % 3 === 0 && gameSettings.random_number % 5 === 0);
}

function isNot(){
    isAnswerCorrect(gameSettings.random_number % 3 !== 0 && gameSettings.random_number % 5 !== 0)
}
// -----------------------------------//




// -----------------------------------//
// generowanie numerów 
function getRandomNumber(){
    return Math.ceil(Math.random() * 100); 
}

// wyświetla randomomo wygenerowany numer
function showRandomNumber(random_number){
    gameSettings.start.removeClass("start");
    gameSettings.start.html(random_number);
// animacja numerów
    transform_number($('.counter'), 50, 'fixed_width');
}
// -----------------------------------//

$(document).ready(function(){
    gameSettings.start= $(".game_screen_wrapcontent_ready");
 
//przypisanie odpowiednim strzałkom funkcji buttonów w grze
   $(document).keydown(function(e) {
    switch (e.keyCode) {
        case 37:
            if(gameSettings.isActive) {
                isFoo();
             }
             e.preventDefault();
             return false;
            break;
        case 38:
            if(gameSettings.isActive){
                isFooBar();
            }
            e.preventDefault();
             return false;
            break;
        case 39:
            if(gameSettings.isActive){
                isBar();
            }
            break;
        case 40:
            if(gameSettings.isActive){
                isNot();
            }
            e.preventDefault();
             return false;
            break;
        }
    });
    
    hover_main_circle($(".opening_circle"));
    leave_main_circle($(".opening_circle"));
    animation_second_rule();
    animation_third_rule();
    clickButtonYes();
    clickButtonMaybe();
    clickButtonNo();
    hideHeart();
    startGame();
    
    $.jInvertScroll(['.scroll'],        
        {
        height: 6000,                   // optional: define the height the user can scroll, otherwise the overall length will be taken as scrollable height
    });
});