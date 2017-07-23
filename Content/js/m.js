window.EVENT_CLICK=typeof document.documentElement.ontouchstart!="undefined"?"touchstart":"click";

/*window.onerror=function(m,u,l,c){
 var img=new Image();
 href=_web_base+'jserror.html?msg='+encodeURIComponent(m+"|"+l+"|"+c+"|"+window.location.href);
 img.src=href;
 img=null;
 return false;
 }
 */
var IS_WEIXIN_CLIENT=false;

function showerror(errmsg){
    var tips=$(".tips");
    if(tips.length==0){
        tips=$("<div class=\"tips\"></div>").appendTo("body");
    }
    tips.html("<div>"+errmsg+"</div>");
    tips.fadeIn();
    if(typeof window.__ERROR_TIPS_TIMER !="undefined"){
        window.clearTimeout(window.__ERROR_TIPS_TIMER);
    }
    window.__ERROR_TIPS_TIMER=window.setTimeout(function(){
        $(".tips").fadeOut('fast');
    },3000);
    window.setTimeout(function(){
        $(document).one("touchstart",function(e){
            if(e.target.tagName=="BUTTON"){
                return;
            }
            $(".tips").fadeOut("fast");
        });
    },300);
}

var wx_share={
    title:"FlowerPlus锛堣姳+锛�",
    subtitle:"鍖呮湀椴滆姳姣忓懆涓€娆★紝鍝佺闅忔満鍙戦€�",
    image:"http://static2.flowerplus.cn/Static/img/flowerpluslogo2.jpg",
    link:"http://static2.flowerplus.cn",
    whenMenuShareTimeline:null,
    whenMenuShareAppMessage:null
};
var _hideAllNonBaseMenuItem=false,wx_ready=false;
function set_wx_share(v){
    $.extend(wx_share,v);
}
function hideAllNonBaseMenuItem(){
    _hideAllNonBaseMenuItem=true;
    if(wx_ready){
        wx.hideAllNonBaseMenuItem();
    }
}

function loadwx(v){
    IS_WEIXIN_CLIENT=true;
    wx.config({
        debug: false, // 寮€鍚皟璇曟ā寮�,璋冪敤鐨勬墍鏈塧pi鐨勮繑鍥炲€间細鍦ㄥ鎴风alert鍑烘潵锛岃嫢瑕佹煡鐪嬩紶鍏ョ殑鍙傛暟锛屽彲浠ュ湪pc绔墦寮€锛屽弬鏁颁俊鎭細閫氳繃log鎵撳嚭锛屼粎鍦╬c绔椂鎵嶄細鎵撳嵃銆�
        appId: v.appId, // 蹇呭～锛屽叕浼楀彿鐨勫敮涓€鏍囪瘑
        timestamp: v.timestamp, // 蹇呭～锛岀敓鎴愮鍚嶇殑鏃堕棿鎴�
        nonceStr: v.nonceStr, // 蹇呭～锛岀敓鎴愮鍚嶇殑闅忔満涓�
        signature: v.signature,// 蹇呭～锛岀鍚嶏紝瑙侀檮褰�1
        jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","hideAllNonBaseMenuItem"]
    });
    wx.ready(function(){
        wx_ready=true;
        wx.onMenuShareTimeline({
            title: wx_share.title, // 鍒嗕韩鏍囬
            link: wx_share.link, // 鍒嗕韩閾炬帴
            imgUrl: wx_share.image, // 鍒嗕韩鍥炬爣
            success: function () {
                if(typeof wx_share.whenMenuShareTimeline == "function"){
                    (wx_share.whenMenuShareTimeline)();
                }
            },
            cancel: function () {
            }
        });

        wx.onMenuShareAppMessage({
            title: wx_share.title, // 鍒嗕韩鏍囬
            desc: wx_share.subtitle, // 鍒嗕韩鎻忚堪
            link: wx_share.link, // 鍒嗕韩閾炬帴
            imgUrl: wx_share.image, // 鍒嗕韩鍥炬爣
            type: '', // 鍒嗕韩绫诲瀷,music銆乿ideo鎴杔ink锛屼笉濉粯璁や负link
            dataUrl: '', // 濡傛灉type鏄痬usic鎴杤ideo锛屽垯瑕佹彁渚涙暟鎹摼鎺ワ紝榛樿涓虹┖
            success: function () {
                if(typeof wx_share.whenMenuShareAppMessage == "function"){
                    (wx_share.whenMenuShareAppMessage)();
                }
            },
            cancel: function () {
            }
        });

        if(_hideAllNonBaseMenuItem){
            wx.hideAllNonBaseMenuItem();
        }
    });
}

$.get("/weixin_js.html",{url:window.location.href},loadwx,"json");
function is_weixin(){
    if(IS_WEIXIN_CLIENT){
        return true;
    }
    var ua=window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger"){
        return true;
    }else{
        return false;
    }
}

function toMoney(v){
    return Math.round(v*100)/100;
}
//EVENT_CLICK="click";

function ajaxpost(url,data,success_fun,error_fun){
    $.ajax({
        type : "POST",
        url  : url,
        data : data,
        dataType : "json",
        timeout  : 0,
        success  : success_fun,
        error    : error_fun
    });
}
