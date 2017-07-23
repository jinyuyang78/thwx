(function($) {
    var timeid;
    var lastValue;
    var options;
    var c;
    var d;
    var t;
    $.fn.autoComplete = function(config) {
        c = $(this);
        var defaults = {
            width: c.width(), //提示框的宽度 默认跟文本框一样
            maxheight: 150, //提示框的最大高度
            top: 6, //与文本框的上下距离
            url: "", //ajax 请求地址
            type: "post", //ajax 请求类型
            async: false, //是否异步请求
            autoLength: 0, //文本长度大于0 就请求服务器
            getValue: function(value){ }, //当回车 或 鼠标点击选中值的时候执行
            clearValue: function(){ }, //当重新请求时清空Value值
            getText: function(text){ } //当回车 或 鼠标点击选中值的时候执行
        };
        options = $.extend(defaults, config);
        var p = c.position();
        d = $('<div id="autoComplete_Group"></div>');
        c.after(d);
        d.css({ "left": p.left, "top": p.top + c.height() + options.top, "width": options.width, "max-height": options.maxheight });
        t = $('<table cellspacing="0" cellpadding="2"></table>');
        d.append(t);
        d.append('<input style="display:none" />');
        c.bind("keydown", keydown_process);
        c.bind("keyup", keyup_process);
        c.bind("blur", blur_process);
        d.bind("focus", focus_div);
        d.bind("mouseout", mouseout_div);
    }
    function blur_process()
    {
        timeid = setTimeout(function(){
            d.hide();
        },200);
    }
    function mouseout_div()
    {
        t.find(".nowRow").removeClass("nowRow");
    }
    function focus_div()
    {
        clearTimeout(timeid);
        c.focus();
    }
    function keydown_process(e)
    {
        if(d.is(":hidden")){
            return;
        }
        switch(e.keyCode)
        {
            case 38:
                e.preventDefault();
                var p = t.find(".nowRow").prev();
                if(p.length > 0){
                    d.setScroll(options.maxheight, p);
                    p.mouseover();
                }else{
                    p = t.find("tr:last");
                    if(p.length > 0){
                        d.setScroll(options.maxheight, p);
                        p.mouseover();
                    }
                }
                break;
            case 40:
                e.preventDefault();
                var n = t.find(".nowRow").next();
                if(n.length > 0){
                    d.setScroll(options.maxheight, n);
                    n.mouseover();
                }else{
                    n = t.find("tr:first");
                    if(n.length > 0){
                        d.setScroll(options.maxheight, n);
                        n.mouseover();
                    }
                }
                break;
            case 13:
                e.preventDefault();
                var n = t.find(".nowRow");
                if(n.length > 0){
                    options.getValue(n.find("input:hidden").val());
                    c.val(n.text());
                    options.getText(c.val());
                    lastValue = "";
                    d.hide();
                }
                break;
        }
    }
    function keyup_process(e)
    {
        if(e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 13 || e.keyCode == 37 || e.keyCode == 39){
            return;
        }
        if(c.val().length > options.autoLength){
            if(c.val() == lastValue){
                return; //判断是否跟上一次的值相等, 考虑到用户正在打字 避免相同的值多次请求
            }
            lastValue = c.val(); //记录请求值
            options.clearValue(); //清空值
            getData(c, function(data){
                if(data.length == 0){
                    d.hide();
                    return;
                }
                t.find("tr").remove();
                $.each(data, function(){
                    t.append('<tr><td>' + this.text + '<input type="hidden" value="' + this.value + '" /></td></tr>');
                });
                var rows = t.find("tr");
                rows.mouseover(function(){
                    t.find(".nowRow").removeClass("nowRow");
                    $(this).addClass("nowRow");
                });
                rows.click(function(){
                    options.getValue($(this).find("input:hidden").val());
                    c.val($(this).text());
                    options.getText(c.val());
                    lastValue = "";
                    d.hide();
                });
                c.setPosition();
                d.show();
            });
        }else{
            lastValue = "";
            d.hide();
        }
    }
    function getData(o,process)
    {
        $.ajax({
            type: options.type,
            async: options.async, //控制同步
            url: options.url,
            data: o.attr("id") + "=" + o.val(),
            dataType: "json",
            cache: false,
            success: process,
            Error: function(err) {
                alert(err);
            }
        });
    }
    $.fn.resetEvent = function()
    {
        c.bind("keydown", keydown_process);
        c.bind("keyup", keyup_process);
        c.bind("blur", blur_process);
        d.bind("focus", focus_div);
        d.bind("mouseout", mouseout_div);
    }
    $.fn.setPosition = function()
    {
        var p = c.position();
        d.css({ "left": p.left, "top": p.top + c.height() + options.top });
    }
    $.fn.setScroll = function(h, o)
    {
        var offset = o.offset();
        if(offset.top > h){
            $(this).scrollTop(offset.top - h);
        }else{
            if(offset.top < 25){ //项的高度 对应样式表 td height:25px
                $(this).scrollTop(0);
            }
        }
    }
})(jquery);
