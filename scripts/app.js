var gamePoints = {
    points: 0,
    accuracy: 0,
    clicks: 0,
    random_number: null,
    isActive: false
}

function startGame(){
    gamePoints.points = 0;
    gamePoints.accuracy = 0;
    gamePoints.clicks = 0;
    var counter_value = $("#counter_value");
    var start = $(".game_screen_wrapcontent_ready");
    var buttons = $(".game_screen_wrapcontent_buttons");
    var foo_button = $(".foo_button");
    var bar_button = $(".bar_button");
    var foobar_button = $(".foobar_button");
    var not_button = $(".not_button");
  
    
    start.addClass("start").html("START");
    start.on("click", function(){
        gamePoints.random_number = getRandomNumber();
        showRandomNumber( gamePoints.random_number);
        start.removeClass("start");
        gamePoints.isActive = true;
        // uruchamia timer //
        $('.timer').startTimer({
            onComplete: function(element){
                gamePoints.isActive = false;
                showGameOver(gamePoints.points, gamePoints.accuracy, gamePoints.clicks);
            }
        });
        start.off("click");
    });
    
   
        foo_button.on("click", function(){
             if (gamePoints.isActive) {
                    isFoo();
             }
        })
}

function isFoo (){
    var counter_value = $("#counter_value");
     
     if ( gamePoints.random_number % 3 === 0){
            gamePoints.points = gamePoints.points + 10;
            gamePoints.accuracy++;
            console.log("333!!!");
        }
        gamePoints.random_number = getRandomNumber();
        showRandomNumber( gamePoints.random_number);
        gamePoints.clicks++;
        counter_value.html(gamePoints.points); 
 }

function getRandomNumber(){
    return Math.ceil(Math.random() * 100); 
}

function showRandomNumber(random_number){
    var start = $(".game_screen_wrapcontent_ready");
    
    start.removeClass("start");
    start.html(random_number);
// animacja numerów
    transform_number($('.counter'), 30, 'fixed_width');
    return random_number;
}

function showGameOver(points, accuracy, clicks){
    var start = $(".game_screen_wrapcontent_ready");
    var buttons = $(".game_screen_wrapcontent_buttons");
    
    start.removeClass("start");
    buttons.addClass("gameover_buttons");
    start.addClass("gameover");
    start.html(function (){
        return "<div class='score'><p class='gameover_copy'>game over</p><p class='gameover_points_accuracy'>points: " + points + "</p><p class='gameover_points_accuracy'>accuracy: " + accuracy + "/" + clicks + "</p><button class='play_again'>play again</button></div>"
    });
    start.animate({
        width: "35vh",
        height: "40vh",
        top: "-10vh",
        },200)
}

function playAgain(){
    var button_play_again = $(".play_again");
    
    button_play_again.on("click", function(){
        console.log("hello");
        startGame();
    })
}

$(document).ready(function(){
 
    document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            if (gamePoints.isActive) {
                    isFoo();
             }
            break;
        case 38:
            alert('up');
            break;
        case 39:
            alert('right');
            break;
        case 40:
            alert('down');
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