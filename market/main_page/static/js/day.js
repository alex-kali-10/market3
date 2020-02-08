$("#switch").click(function () {
    if ($("#fullpage").hasClass("night")) {
        $("#fullpage").removeClass("night");
        $("#switch").removeClass("switched");
        $("body").addClass("day");
    }
    else {
        $("#fullpage").addClass("night");
        $("#switch").addClass("switched");
        $("body").removeClass("day");
    }
});



$('.menu-button').click(function() {
    if($(this).is('.active:not(.back)')) {
        $(this).addClass('back');
        $('.left-block').removeClass('view-left-block');
    } else if ($(this).is('.back')) {
        $(this).removeClass('back');
        $('.left-block').addClass('view-left-block');
    } else {
        $(this).addClass('active');
        $('.left-block').addClass('view-left-block');
    }
});


$('.menu-icon').click(function(){
    if ($(this).is('.clicked')) {
        console.log('закрываю');
        $('.top-block').removeClass('view-top-block');
    }else{
        console.log('лткрываю');
        $('.top-block').addClass('view-top-block');
    }


    $(this).toggleClass('clicked');
});