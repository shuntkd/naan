
function resize(){

    var elms = document.getElementsByClassName("thumb");
    for (i=0; elms[i]; i++){
        elms[i].src="assets/img/shop/icon.png";
    };


};



$(window).load(function(){
    resize();
});