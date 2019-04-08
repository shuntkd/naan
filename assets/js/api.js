var availableTagS = [];
var availableTagM = [];
var list = [];
var isReadSgwod = false;
var isReadMgwod = false;

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

function showResult( result ) {
    var thumbnail =   $(".thumbnail");
    for ( var i in result.rest ) { 
        if(result.rest[i].image_url.shop_image1!==""){
            thumbnail.append('<li><a href=""><div class="shopImg"><img src='+result.rest[i].image_url.shop_image1+' alt="image"></div><div class="shopName"><p>'+result.rest[i].name+'<br>'+result.rest[i].access.station+'</p></div></a></li>');
        } else if(result.rest[i].image_url.shop_image2!=="") {
            thumbnail.append('<li><a href=""><div class="shopImg"><img src='+result.rest[i].image_url.shop_image2+' alt="image"></div><div class="shopName"><p>'+result.rest[i].name+'<br>'+result.rest[i].access.station+'</p></div></a></li>');
        } else {
            thumbnail.append('<li><a href=""><div class="shopImg"><img src=assets/img/top/top.png alt="image"></div><div class="shopName"><p>'+result.rest[i].name+'<br>'+result.rest[i].access.station+'</p></div></a></li>');
        }     
    };
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
    if (arg.freeword === undefined) {
        return ;
    }
    var areaParamName = "";
    var areaName = decodeURI(arg.freeword);
    var areaCode = "";
    if (availableTagM[areaName] !== undefined) {
        areaCode = availableTagM[areaName];
        areaParamName = "areacode_m";
    } else if (availableTagS[areaName] !== undefined) {
        areaCode = availableTagS[areaName];
        areaParamName = "areacode_s";
    } else {
        return ;
    }
    
    var word=$(".searchWord");
    word.append("<li><p>"+areaName+"</p></li>");
    var url = "https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=2fec3133982fe68d86c709c6594f120c&category_s=RSFST16001,RSFST16002,RSFST15005,RSFST15006&"+areaParamName+"="+areaCode;
    ajax.open("get",url);
    ajax.responseType = 'json';
    ajax.send();
    ajax.onload =function( data ) {
        showResult(data.target.response);
    }
};

$(window).load(function(){
    Promise.resolve()
        .then(function() {
            return gword();
        }).then(function() {
            freewordSearch();
        });
});
