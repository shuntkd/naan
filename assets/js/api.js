function showResult( result ) {
    for ( var i in result.rest ) { 
      $("#thumbnail").append('<li><a href=""><div class="shopImg"><img src='+result.rest[i].image_url.shop_image1+' alt="image"></div><div class="shopName"><p>'+result.rest[i].name+'<br>'+result.rest[i].access.station+'</p></div></a></li>');  
    };
  };

function freewordsearch(){
    
    $("#submit").click(function () {
        $("#thumbnail").empty();
        $("#searchWord").empty();
        var ajax = new XMLHttpRequest();
        var freeword = "";
        freeword=$("#freeword").val();
        $("#searchWord").append("<li><p>"+freeword+"</p></li>");
        var url = "https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=キーを入れる&freeword="+freeword;
        ajax.open("get",url);
        ajax.responseType = 'json';
        ajax.send();
        ajax.onload =function( e ) {
            showResult(e.target.response);
        }

    });
        

};

function freewordsearch2(){
    
        $("#thumbnail").empty();
        $("#freeWord").empty();
        var ajax = new XMLHttpRequest();

        var freeword = "";

        var arg  = new Object;
        ur = location.search.substring(1).split('&');

        for(i=0; ur[i]; i++) {
            var k = ur[i].split('=');
            arg[k[0]] = k[1];
        }

        freeword = decodeURI(arg.freeword);

        $("#searchWord").append("<li><p>"+freeword+"</p></li>");
        var url = "https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=キーを入れる&freeword="+freeword;
        ajax.open("get",url);
        ajax.responseType = 'json';
        ajax.send();
        ajax.onload =function( e ) {
            showResult(e.target.response);
        }
        

};

$(window).load(function(){
    freewordsearch();
    freewordsearch2();
});