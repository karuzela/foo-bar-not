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