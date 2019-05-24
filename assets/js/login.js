function overlay(){

const overlay = $('.overlay');
const btn =$('.btn');
const fadeSpeed = '700';

$('.login').on('click', () => {
  // クリックした時の処理
  // 要素をふわっと表示
  overlay.fadeIn(fadeSpeed);
  btn.fadeIn(fadeSpeed);
});

$('.overlay').on('click', () => {
  // クリックした時の処理
  // 要素をふわっと非表示
  overlay.fadeOut(fadeSpeed);
});

}

$(window).load(function(){
  overlay();
});