function slider(){
    $('.multiple-items').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        centermode: true,
    });
};


$(document).ready(function(){
        slider();
});
