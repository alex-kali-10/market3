$('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite:false,
    arrows: false,
    vertical:true,
    verticalSwiping:true,
    zIndex:0,
    speed: 1300,
});


let menuActive = 1;
function changeSlide(i) {
    $('.slider').slick('slickGoTo', i-1);
}
function changeSlideTop(i) {
    $('.slider-top').slick('slickGoTo', i-1);
}

function f(i,top) {
    let k;
    $('.s'+menuActive).removeClass("ss"+menuActive);
    if(i !== 1){
        $('body').removeClass('view-first-slide');
    }else if(i === 1){
        $('body').addClass('view-first-slide');
    }
    if(i === 8){
        react_korz.update();
    }

    menuActive = i;
    $('.s'+menuActive).addClass("ss"+menuActive);
    changeSlide(i);
    for(k = 0; k < 15; k++){setTimeout(changeSlide, k*100,i);}
    for(k = 0; k < 15; k++){setTimeout(changeSlideTop, k*100,top);}
    react_content.setState({menuActive: menuActive ,listItem:''});
    react_poisk.reset();

}

function aboutItem(e,id) {
    $( ".about-area" ).removeClass( "no-block" );

    ReactDOM.render(
        <AboutItem />,
        document.getElementById('left-area-react')
    );
    infItem({id: id,username: react_auth.state.username,password: react_auth.state.password});
    $('.close-area').addClass("close-area-view");
    setTimeout(function () {
        $('.close-area').addClass("close-area-view2");
    }, 20);

}


function unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('left-area-react'))
}

function deleteAboutItem() {
    $( ".about-area" ).addClass( "no-block" );
    setTimeout(unmount, 400);
    //ReactDOM.unmountComponentAtNode(document.getElementById('left-area-react'));
    $('.close-area').removeClass("close-area-view2");
    setTimeout(function () {
        $('.close-area').removeClass("close-area-view2");
    }, 500);

}


function login(e) {
    $( ".auth-area" ).removeClass( "no-block-left" );
}

function deleteAuthItem() {
    $( ".auth-area" ).addClass( "no-block-left" );
    setTimeout(function () {
        $('.close-area').removeClass("close-area-view");
    }, 500);

    $('.close-area').removeClass("close-area-view2");
}

function log(e) {
    $( ".auth-area" ).removeClass( "no-block-left" );
    $('.close-area').addClass("close-area-view");
    setTimeout(function () {
        $('.close-area').addClass("close-area-view2");
    }, 20);
}
function deleteAreaItem() {
    $( ".about-area" ).addClass( "no-block" );
    $( ".auth-area" ).addClass( "no-block-left" );
    $('.close-area').removeClass("close-area-view");
    $('.close-area').removeClass("close-area-view2");
    setTimeout(unmount, 400);
    //ReactDOM.unmountComponentAtNode(document.getElementById('left-area-react'));
}
function logout(e) {
    $.ajax({
        url: "/api/logout/",
        method: "POST",
        headers: {'X-CSRFToken': csrf},
        dataType: "json",
    }).done(function(response) {
        react_auth.setState({username : 'AnonymousUser'});
    }).fail(function (error) {
        console.log(error);
    });
}
