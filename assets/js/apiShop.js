var availableTagS = [];
var availableTagM = [];
var list = [];
var isReadSgwod = false;
var isReadMgwod = false;
var isReadThumb = false;

/** Sエリア情報を配列へ*/
function s_gword( result ) {
    for(var i in result.garea_small ){
        availableTagS[result.garea_small[i].areaname_s]=result.garea_small[i].areacode_s;
        list.push(result.garea_small[i].areaname_s);
    };
    isReadSgwod = true;
};

/** Mエリア情報を配列へ追加*/
function m_gword( result ) {
    for(var i in result.garea_middle ){
        availableTagM[result.garea_middle[i].areaname_m]=result.garea_middle[i].areacode_m;
        list.push(result.garea_middle[i].areaname_m);
    };
    isReadMgwod = true;
};


function gword() {
    /**Sエリア情報取得 */
    return new Promise(function (resolve, reject) {
        var area = new XMLHttpRequest();
        var url = "https://api.gnavi.co.jp/master/GAreaSmallSearchAPI/v3/?keyid=2fec3133982fe68d86c709c6594f120c";
        area.open("get",url);
        area.responseType = 'json';
        area.send();
        area.onload =function( data ) {       
            s_gword(data.target.response);
        };
        
        /**Mエリア情報取得 */
        var area2 = new XMLHttpRequest();
        var url = "https://api.gnavi.co.jp/master/GAreaMiddleSearchAPI/v3/?keyid=2fec3133982fe68d86c709c6594f120c";
        area2.open("get",url);
        area2.responseType = 'json';
        area2.send();
        area2.onload = function( data ) {       
            m_gword(data.target.response);
        };
        // エリア情報を読み込み完了まで待つ
        (function waitCall(){
            if (isReadSgwod === false || isReadMgwod === false) {
                setTimeout(function(){
                    waitCall();
                }, 1000);
            } else {
                $( "#freeword" ).autocomplete({
                    /**プルダウンリスト */
                    source:list
                });
                resolve();
            }
        })();
    });
    
};




function freewordSearch(){
    var thumbnail = $(".thumbnail");
    thumbnail.empty();
    var ajax = new XMLHttpRequest();

    var arg  = new Object;
    var ur = location.search.substring(1).split('&');
    for(i=0; ur[i]; i++) {
        var k = ur[i].split('=');
        arg[k[0]] = k[1];
    }
   
    var shopName = decodeURI(arg.shopName);
    var gurunabi = arg.url;
    var chiiki = decodeURI(arg.area);
    var img = arg.shopImg;
   
    
    var shop=$(".shopName");
    shop.append("<h3>"+shopName+"</h3>");
    shop.append("<p>"+chiiki+"</p>");
    var link =$(".gLink")
    link.append("<a href="+gurunabi+">ぐるなびで詳しく見る→</a>");
    var shopImage =$(".shopImg");
    shopImage.append("<img src="+img+" alt=\"image\"></img>");

};


$(window).load(function(){
    Promise.resolve()
        .then(function() {
            return gword();
        }).then(function() {
            freewordSearch();
        });
});
