/* po najechaniu na kółko zmienia się na nim napis --> do sprawdzenia jak to zrobić w CSS */
function hover_main_circle (circle){
    var opening_circle_content = $(".opening_circle_content");
    var copy = $("#opening_circle_copy");
    
    circle.on("mouseenter", function(){
        opening_circle_content.html("<p>Scroll me!</p>");
        copy.addClass("scroll_me");
    })
}

function leave_main_circle (circle){
    var opening_circle_content = $(".opening_circle_content");
    var copy = $("#opening_circle_copy");
    
    circle.on("mouseleave", function(){
        opening_circle_content.html("<p>foo, bar</p><p>or not?</p>");
        copy.removeClass("scroll_me");;
    })
}

/* napis przeniesie się na dół strony, jeśli szerokosć będzie mieć minium 700px */
function animation_second_rule_min_width_700(){
    var min_width = window.matchMedia("(min-width: 700px)"); min_width.addListener(animation_second_rule);
    animation_second_rule(min_width);

    function animation_second_rule(mediaQuery){
        if(mediaQuery.matches){ 
            $(window).scroll(function(){
                if($(window).scrollTop() > 300) {
                    $("#second_rule_copy").animate({ 
                        top: "35vh"}, 7000);
                } 
            });
        } 
    }
}

/* animacja ukazująca elementy po kolei */
function setOpacity1 (element, delay) {
    element.delay(delay).animate({
               opacity: 1}, 3000);
}

function animation_third_rule_min_width_700(){
    var min_width = window.matchMedia("(min-width: 700px)"); min_width.addListener(animation_third_rule);
    animation_third_rule(min_width);
    
    function animation_third_rule(mediaQuery){
        if(mediaQuery.matches){
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
    }
}