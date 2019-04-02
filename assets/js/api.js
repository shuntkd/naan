

/** Sエリア情報を配列へ*/
function s_gword( result ) {
    for(var i in result.garea_small ){
        availableTags[result.garea_small[i].areaname_s]=result.garea_small[i].areacode_s;
        list.push(esult.garea_small[i].areaname_s);
    };
};

/** Mエリア情報を配列へ追加*/
function m_gword( result ) {
    for(var i in result.garea_middle ){
        availableTags[result.garea_middle[i].areaname_m]=result.garea_middle[i].areacode_m;
        list.push(result.garea_middle[i].areaname_m);
    };
};


function　gword() {

    availableTags = [];
    list = [];

    /**Sエリア情報取得 */
    var area = new XMLHttpRequest();
    var url = "https://api.gnavi.co.jp/master/GAreaSmallSearchAPI/v3/?keyid=2fec3133982fe68d86c709c6594f120c";
    area.open("get",url);
    area.responseType = 'json';
    area.send();
    area.onload =function( data ) {       
            s_gword(data.target.response);
        };
    /**Mエリア情報取得 */
    var url = "https://api.gnavi.co.jp/master/GAreaMiddleSearchAPI/v3/?keyid=2fec3133982fe68d86c709c6594f120c";
    area.open("get",url);
    area.responseType = 'json';
    area.send();
    area.onload =function( data ) {       
            m_gword(data.target.response);
        };
 

    $( "#freeword" ).autocomplete({
      /**プルダウンリスト */
      source:list
    });
};

function showResult( result ) {
    var thumbnail =   $(".thumbnail");
    for ( var i in result.rest ) { 
    thumbnail.append('<li><a href=""><div class="shopImg"><img src='+result.rest[i].image_url.shop_image1+' alt="image"></div><div class="shopName"><p>'+result.rest[i].name+'<br>'+result.rest[i].access.station+'</p></div></a></li>');  
    };
  };


function freewordSearch(){
        var thumbnail = $(".thumbnail");
        thumbnail.empty();
        var ajax = new XMLHttpRequest();

        var arg  = new Object;
        ur = location.search.substring(1).split('&');
        for(i=0; ur[i]; i++) {
            var k = ur[i].split('=');
            arg[k[0]] = k[1];
        }

        var areaName = decodeURI(arg.freeword);
        var areaCode = availableTags[areaName];

        var word=$(".searchWord");

        word.append("<li><p>"+areaName+"</p></li>");
        var url = "https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=2fec3133982fe68d86c709c6594f120c&areacode_m="+areaCode;
        ajax.open("get",url);
        ajax.responseType = 'json';
        ajax.send();
        ajax.onload =function( data ) {
            showResult(data.target.response);
        }
};

$(window).load(function(){
    gword();
    freewordSearch();
});