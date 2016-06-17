var gameSettings = {
    points: 0,
    accuracy: 0,
    clicks: 0,
    random_number: null,
    isActive: false,
    start: null
}

function startGame(){
    gameSettings.points = 0;
    gameSettings.accuracy = 0;
    gameSettings.clicks = 0;
    var counter_value = $("#counter_value");
//    var buttons = $(".game_screen_wrapcontent_buttons");
    var foo_button = $(".foo_button");
    var bar_button = $(".bar_button");
    var foobar_button = $(".foobar_button");
    var not_button = $(".not_button");
  
    
    gameSettings.start.addClass("start").html("START");
    gameSettings.start.on("click", function(){
        gameSettings.random_number = getRandomNumber();
        showRandomNumber(gameSettings.random_number);
        gameSettings.start.removeClass("start");
        gameSettings.isActive = true;
        // uruchamia timer //
        $('.timer').startTimer({
            onComplete: function(element){
                gameSettings.isActive = false;
                showGameOver(gameSettings.points, gameSettings.accuracy, gameSettings.clicks);
            }
        });
        gameSettings.start.off("click");
    });
    
        foo_button.on("click", function(){
             if (gameSettings.isActive) {
                    isFoo();
             }
        })
//        addEventToGameButton(foo_button, isFoo());    
    
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
        
//        addEventToGameButton(bar_button, isBar());
//        addEventToGameButton(foobar_button, isFooBar());
//        addEventToGameButton(isNot, isNot());
}

//function addEventToGameButton(choose_button, choose_option){
//    choose_button.on("click", function(){
//             if (gameSettings.isActive) {
//                    choose_option;
//             }
//        })
//}

function isAnswerCorrect(condition){
    var counter_value = $("#counter_value");
    
    if (condition){
        gameSettings.points = gameSettings.points + 10;
        gameSettings.accuracy++;
    }
    gameSettings.random_number = getRandomNumber();
    showRandomNumber(gameSettings.random_number);
    gameSettings.clicks++;
    counter_value.html(gameSettings.points); 
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

function getRandomNumber(){
    return Math.ceil(Math.random() * 100); 
}

function showRandomNumber(random_number){
    gameSettings.start.removeClass("start");
    gameSettings.start.html(random_number);
// animacja numerów
    transform_number($('.counter'), 30, 'fixed_width');
    return random_number;
}

function showGameOver(points, accuracy, clicks){
    var buttons = $(".game_screen_wrapcontent_buttons");
    
    gameSettings.start.removeClass("start");
    buttons.addClass("gameover_buttons");
    gameSettings.start.addClass("gameover");
    gameSettings.start.html(function (){
        return "<div class='score'><p class='gameover_copy'>game over</p><p class='gameover_points_accuracy'>points: " + points + "</p><p class='gameover_points_accuracy'>accuracy: " + accuracy + "/" + clicks + "</p><button class='play_again'>play again</button></div>"
    });
    gameSettings.start.animate({
        width: "35vh",
        height: "40vh",
        top: "-10vh",
        },200)
}

function playAgain(){
    var button_play_again = $(".play_again");
    
    gameSettings.start.on("click", button_play_again, function(){
        startGame();
    })
}

$(document).ready(function(){
    gameSettings.start= $(".game_screen_wrapcontent_ready");
 
    document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            if(gameSettings.isActive) {
                isFoo();
             }
            break;
        case 38:
            if(gameSettings.isActive){
                isFooBar();
            }
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
            break;
        }
    };
    
    hover_main_circle($(".main_circle"));
    leave_main_circle($(".main_circle"));
    animation_second_rule();
    animation_third_rule();
    clickButtonYes();
    clickButtonMaybe();
    clickButtonNo();
    hideHeart();
    startGame();
    playAgain();
    
    $.jInvertScroll(['.scroll'],        // an array containing the selector(s) for the elements you want to animate
        {
        height: 6000,                   // optional: define the height the user can scroll, otherwise the overall length will be taken as scrollable height
        onScroll: function(percent) {   //optional: callback function that will be called when the user scrolls down, useful for animating other things on the page
        }
    });
});