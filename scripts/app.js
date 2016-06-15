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

/* napis się powiększy */
function animation_first_rule(){
    $(window).scroll(function(){
        if($(window).scrollTop() > 150) {
            $("#first_rule_copy").animate({ 
                fontSize: "2.7em"}, 2000);
        } 
    });
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

/* napisy będą się pojawiać po kolei */
function animation_third_rule(){
    $(window).scroll(function(){
       if($(window).scrollTop() > 410) {
           $("#p1_third_rule").delay(3000).animate({
               opacity: 1}, 3000);
           $("#p2_third_rule").delay(5000).animate({
               opacity: 1}, 3000);
           $("#p3_third_rule").delay(7000).animate({
               opacity: 1}, 3000);
           $("#p4_third_rule").delay(9000).animate({
               opacity: 1}, 3000);
       }
    });
}

$(document).ready(function(){
   hover_main_circle($(".circle"));
    leave_main_circle($(".circle"));
//    animation_first_rule();
    animation_second_rule();
    animation_third_rule();
    
    $.jInvertScroll(['.scroll'],        // an array containing the selector(s) for the elements you want to animate
        {
        height: 6000,                   // optional: define the height the user can scroll, otherwise the overall length will be taken as scrollable height
        onScroll: function(percent) {   //optional: callback function that will be called when the user scrolls down, useful for animating other things on the page
        }
    });
});