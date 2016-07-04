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
        var foo_button = $(".foo_button");
        var bar_button = $(".bar_button");
        var foobar_button = $(".foobar_button");
        var not_button = $(".not_button");

// buttony wracają do pierwotnego kształtu
        foo_button.html("3");
        bar_button.html("5");
        foobar_button.html("3 or 5");
        not_button.html("not");
        foo_button.removeClass("buttons_final");
        bar_button.removeClass("buttons_final");
        foobar_button.removeClass("buttons_final");
        not_button.removeClass("buttons_final");
        buttons.removeClass("gameover_buttons");
        
        gameSettings.points = 0;
        gameSettings.clicks = 0;
        gameSettings.accuracy = 0;
        gameSettings.consecutive_hits = 0;
        $('.timer').empty();
        counter_value.html(gameSettings.points); 
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
    var final_score_points = $(".final_score_points");
    var final_score_accuracy = $(".final_score_accuracy");
    
    buttons.addClass("gameover_buttons");
    
// komentarz po zakończeniu gry jest uzależniony od liczby klików oraz accuracy
    if (gameSettings.clicks <= 20){
        gameSettings.start.html(function (){
            return "<div class='score'><p>play faster!</p>"
        })
    }
    else {
        if (Math.ceil((gameSettings.accuracy/gameSettings.clicks)*100) < 20){
            gameSettings.start.html(function (){
                return "<div class='score'><p>really?!</p>"
            })
        }
        if(Math.ceil((gameSettings.accuracy/gameSettings.clicks)*100) < 50){
            gameSettings.start.html(function (){
                return "<div class='score'><p>oh well...</p>"
            })
        }
        else if(Math.ceil((gameSettings.accuracy/gameSettings.clicks)*100) < 70){
            gameSettings.start.html(function (){
                return "<div class='score'><p>good</p>"
            })
        }
        else if(Math.ceil((gameSettings.accuracy/gameSettings.clicks)*100) < 95){
            gameSettings.start.html(function (){
                return "<div class='score'><p>nice</p>"
            })
        }
        else{
            gameSettings.start.html(function (){
                return "<div class='score'><p>great!</p>"
            })
        }
    }
    
    if (clicks === 0){    
        final_score_points.html(function (){
            return "<p>points: " + gameSettings.points + "</p>";
        })
        final_score_accuracy.html(function (){
            return "<p>accuracy: 0%</p>";
        })
    }
    else {
        final_score_points.html(function (){
            return "<p>points: " + gameSettings.points + "</p>";
        })
        final_score_accuracy.html(function (){
            return "<p>accuracy: " + Math.ceil((gameSettings.accuracy/gameSettings.clicks)*100) + "%</p>";
        })
    }
    
    $(".final_score").animate({
        opacity: 1,
        zIndex: 20000,
        },200);
}

function startTimer(){
    $('.timer').startTimer({
        onComplete: function(){
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
        gameSettings.points = gameSettings.points - 30;
    
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
}

// po 5 prawidłowych odpowiedziach z rzędu pokaże się trudniejsza wersja buttonów
function showFinalButtons (){
    var foo_button = $(".foo_button");
    var bar_button = $(".bar_button");
    var foobar_button = $(".foobar_button");
    var not_button = $(".not_button");
    
    foo_button.html("foo");
    bar_button.html("bar");
    foobar_button.html("foobar");
    not_button.html("not");
    foo_button.addClass("buttons_final", 600, "easeInQuart");
    bar_button.addClass("buttons_final", 600, "easeInQuart");
    foobar_button.addClass("buttons_final", 600, "easeInQuart");
    not_button.addClass("buttons_final", 600, "easeInQuart");
}

function isFoo(){
    isAnswerCorrect(gameSettings.random_number % 3 === 0 && !(gameSettings.random_number % 5 === 0));
//    gameSettings.points = gameSettings.points + 10;
}

function isBar(){
    isAnswerCorrect(gameSettings.random_number % 5 === 0 && !(gameSettings.random_number % 3 === 0));
//    gameSettings.points = gameSettings.points + 10;
}

function isFooBar(){
    isAnswerCorrect(gameSettings.random_number % 3 === 0 && gameSettings.random_number % 5 === 0);
//    gameSettings.points = gameSettings.points + 30;
}

function isNot(){
    isAnswerCorrect(gameSettings.random_number % 3 !== 0 && gameSettings.random_number % 5 !== 0)
//    gameSettings.points = gameSettings.points + 1;
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
    
//    hover_main_circle($(".opening_circle"));
//    leave_main_circle($(".opening_circle"));
    animation_second_rule_min_width_700();
    animation_third_rule_min_width_700();
    clickButtonYes();
    clickButtonMaybe();
    clickButtonNo();
    hideHeart();
    startGame();
    
//    $.jInvertScroll(['.scroll'],        
//        {
//        height: 6000,                   // optional: define the height the user can scroll, otherwise the overall length will be taken as scrollable height
//    });
    
    $.jInvertScroll(['.scroll'],        
        {
        height: 'auto'                 // optional: define the height the user can scroll, otherwise the overall length will be taken as scrollable height
    });
});