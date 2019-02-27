

function smoothscroll(e){
   
        // スクロールの速度
        var speed = 400; // ミリ秒
        // アンカーの値取得
        var href= e.attr("href");
        // 移動先を取得
        var target = $(href == "#" || href == "" ? 'html' : href);
        // 移動先を数値で取得
        var position = target.offset().top;
        // スムーススクロール
        $('body,html').animate({scrollTop:position}, speed, 'swing');
        return false;
}

$('a[href^=#]').click(function() {
        smoothscroll($(this));
    }
);