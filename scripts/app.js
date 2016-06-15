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

///* napis się powiększy */
//function animation_first_rule(){
//    $(window).scroll(function(){
//        if($(window).scrollTop() > 150) {
//            $("#first_rule_copy").animate({ 
//                fontSize: "2.7em"}, 2000);
//        } 
//    });
//}

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
function opacity_1 (element, delay) {
    element.delay(delay).animate({
               opacity: 1}, 3000);
}

function animation_third_rule(){
    $(window).scroll(function(){
       if($(window).scrollTop() > 410) {
           opacity_1($("#p2_third_rule"), 3000);
           opacity_1($(".left"), 3000);
           opacity_1($("#p3_third_rule"), 5000);
           opacity_1($(".right"), 5000);
           opacity_1($("#p4_third_rule"), 7000);
           opacity_1($(".up"), 7000);
           opacity_1($("#p5_third_rule"), 9000);
           opacity_1($(".down"), 9000);
       }
    });
}

function prepareTheGame(){
    var game_screen = $("div.game_container");
    
    $("div.ready_container").remove();
    game_screen.animate({
            top: "0vh"}, 3000);
}

function hide_ready_screen (){
    var ready_screen = $("div.ready_container");
    var button_yes = $(".yes_button");
    
    button_yes.on("click", function(){
        ready_screen.animate({
            top: "-100vh"}, 3000, function(){
                prepareTheGame();
            });
    })
}

$(document).ready(function(){
    hover_main_circle($(".main_circle"));
    leave_main_circle($(".main_circle"));
    animation_second_rule();
    animation_third_rule();
    hide_ready_screen();
    
    $.jInvertScroll(['.scroll'],        // an array containing the selector(s) for the elements you want to animate
        {
        height: 6000,                   // optional: define the height the user can scroll, otherwise the overall length will be taken as scrollable height
        onScroll: function(percent) {   //optional: callback function that will be called when the user scrolls down, useful for animating other things on the page
        }
    });
});