var gameSettings = {
    points: 0,
    accuracy: 0,
    clicks: 0,
    random_number: null,
    isActive: false,
    start: null,
//    success: gameSettings[accuracy]/gameSettings[clicks]
}

// przebieg gry
function startGame(){
    gameSettings.points = 0;
    gameSettings.accuracy = 0;
    gameSettings.clicks = 0;
    var counter_value = $("#counter_value");
    var foo_button = $(".foo_button");
    var bar_button = $(".bar_button");
    var foobar_button = $(".foobar_button");
    var not_button = $(".not_button");
    var button_play_again = $(".play_again");

// resetuje ustawienia do rozpoczęcia nowej gry
    function reset(){
        var buttons = $(".game_screen_wrapcontent_buttons");
        gameSettings.points = 0;
        
        
        $('.timer').empty();
        counter_value.html(gameSettings.points); 
        buttons.removeClass("gameover_buttons");
        gameSettings.start.removeClass("gameover");
        gameSettings.start.empty();
        gameSettings.start.animate({
            width: "20vw",
            height: "18vh",
            top: "0vh",
            },200)
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
    
    gameSettings.start.removeClass("start");
    buttons.addClass("gameover_buttons");
    gameSettings.start.addClass("gameover");
    gameSettings.start.html(function (){
        if (clicks === 0){
        return "<div class='score'><p class='gameover_copy'>game over</p><p class='gameover_points_accuracy'>points: " + points + "</p><p class='gameover_points_accuracy'>accuracy: 0%</p><button class='play_again'>play again</button></div>";
        }
        else {
            return "<div class='score'><p class='gameover_copy'>game over</p><p class='gameover_points_accuracy'>points: " + points + "</p><p class='gameover_points_accuracy'>accuracy: " + Math.ceil((accuracy/clicks)*100) + "%</p><button class='play_again'>play again</button></div>";
        }
    });
    gameSettings.start.animate({
        width: "35vh",
        height: "40vh",
        top: "-10vh",
        },200)
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
    var foo_button = $(".foo_button");
    var bar_button = $(".bar_button");
    var foobar_button = $(".foobar_button");
    var not_button = $(".not_button");
    
    if (condition){
        gameSettings.points = gameSettings.points + 10;
        gameSettings.accuracy++;
        $(".checkmark").animate({
            opacity: 0.8},200).animate({
            opacity: 0},200)
         $(".checkmark_final").animate({
            opacity: 0.8},200).animate({
            opacity: 0},200)
    }
    else {
        $("div.game_screen_wrapcontent_ready.counter").animate({
            "background-color": "#9c1b82"},170).animate({
            "background-color": "white"},170)  
    }
    gameSettings.random_number = getRandomNumber();
    showRandomNumber(gameSettings.random_number);
    gameSettings.clicks++;
    counter_value.html(gameSettings.points);
    
    if (gameSettings.accuracy/gameSettings.clicks === 1 && gameSettings.clicks === 2){
        console.log("dziala");
        
        $(".game_screen_wrapcontent_buttons").animate({
            top:"200vh"},500).delay(1000);
        $(".game_screen_wrapcontent_final_buttons").animate({
            top: "0vh"}, 500)
    }
}

function isFoo(){
    isAnswerCorrect(gameSettings.random_number % 3 === 0);
}

function isBar(){
    isAnswerCorrect(gameSettings.random_number % 5 === 0);
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
    
    hover_main_circle($(".main_circle"));
    leave_main_circle($(".main_circle"));
    animation_second_rule();
    animation_third_rule();
    clickButtonYes();
    clickButtonMaybe();
    clickButtonNo();
    hideHeart();
    startGame();
    
    $.jInvertScroll(['.scroll'],        // an array containing the selector(s) for the elements you want to animate
        {
        height: 6000,                   // optional: define the height the user can scroll, otherwise the overall length will be taken as scrollable height
        onScroll: function(percent) {   //optional: callback function that will be called when the user scrolls down, useful for animating other things on the page
        }
    });
});