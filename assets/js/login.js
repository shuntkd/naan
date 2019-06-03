function overlay(){

var modal = $('.js-modal');
var window =$('.js-window');
var fadeSpeed = '700';

$('.login').on('click', () => {
  event.preventDefault();
  // クリックした時の処理
  // 要素をふわっと表示
  modal.add(window).fadeIn(fadeSpeed);
});

modal.on('click', () => {
  // クリックした時の処理
  // 要素をふわっと非表示
  modal.add(window).fadeOut(fadeSpeed);
});

}

$(window).load(function(){
  overlay();
});