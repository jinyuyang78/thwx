
$(function(){
    var Initials=$('.initials');
    var LetterBox=$('#letter');
    Initials.find('ul').append('<a href="#A">A</a><a href="#B">B</a><a href="#C">C</a><a  href="#D">D</a><a  href="#E">E</a><a  href="#F">F</a><a  href="#G">G</a><a  href="#H">H</a><a  href="#I">I</a><a  href="#J">J</a><a  href="#K">K</a><a  href="#L">L</a><a  href="#M">M</a><a  href="#N">N</a><a  href="#O">O</a><a  href="#P">P</a><a  href="#Q">Q</a><a  href="#R">R</a><a  href="#S">S</a><a  href="#T">T</a><a  href="#U">U</a><a  href="#V">V</a><a  href="#W">W</a><a  href="#X">X</a><a  href="#Y">Y</a><a  href="#Z">Z</a>');
    initials();

    $(".initials ul a").click(function(){
        var _this=$(this);
        var LetterHtml=_this.html();
        LetterBox.html(LetterHtml).fadeIn();

        Initials.css('background','rgba(145,145,145,0.6)');

        setTimeout(function(){
            Initials.css('background','rgba(145,145,145,0)');
            LetterBox.fadeOut();
        },1000);

            var _index = _this.index();
            var letter = _this.text();
            // if($('#'+letter).length>0){
            //     var LetterTop = $('#'+letter).position().top;
            //     $('.sort_box').animate({scrollTop: LetterTop-90+'px'}, 300);
            // }
    });

    var windowHeight=$(window).height();
    var InitHeight=windowHeight-45;
    Initials.height(InitHeight);
    $('.sort_box,.autobox').height(InitHeight-60);
    var LiHeight=InitHeight/29;
    Initials.find('a').height(LiHeight);
    $('body,html').height(windowHeight)
});

function initials() {//公众号排序
    var SortList=$(".sort_list");
    var SortBox=$(".sort_box");
    SortList.sort(asc_sort).appendTo('.sort_box');//按首字母排序
    function asc_sort(a, b) {
        return makePy($(b).find('.num_name').text().charAt(0))[0].toUpperCase() < makePy($(a).find('.num_name').text().charAt(0))[0].toUpperCase() ? 1 : -1;
    }

    var initials = [];
    var num=0;
    SortList.each(function(i) {
        var initial = makePy($(this).find('.num_name').text().charAt(0))[0].toUpperCase();
        if(initial>='A'&&initial<='Z'){
            if (initials.indexOf(initial) === -1)
                initials.push(initial);
        }else{
            num++;
        }

    });

    $.each(initials, function(index, value) {//添加首字母标签
        SortBox.append('<div class="sort_letter" id="'+ value +'">' + value + '</div>');
    });
    if(num!=0){SortBox.append('<div class="sort_letter" id="default">#</div>');}

    for (var i =0;i<SortList.length;i++) {//插入到对应的首字母后面
        var letter=makePy(SortList.eq(i).find('.num_name').text().charAt(0))[0].toUpperCase();
        switch(letter){
            case "A":
                $('#A').after(SortList.eq(i));
                break;
            case "B":
                $('#B').after(SortList.eq(i));
                break;
            case "C":
                $('#C').after(SortList.eq(i));
                break;
            case "D":
                $('#D').after(SortList.eq(i));
                break;
            case "E":
                $('#E').after(SortList.eq(i));
                break;
            case "F":
                $('#F').after(SortList.eq(i));
                break;
            case "G":
                $('#G').after(SortList.eq(i));
                break;
            case "H":
                $('#H').after(SortList.eq(i));
                break;
            case "I":
                $('#I').after(SortList.eq(i));
                break;
            case "J":
                $('#J').after(SortList.eq(i));
                break;
            case "K":
                $('#K').after(SortList.eq(i));
                break;
            case "L":
                $('#L').after(SortList.eq(i));
                break;
            case "M":
                $('#M').after(SortList.eq(i));
                break;
            case "N":
                $('#N').after(SortList.eq(i));
                break;
            case "O":
                $('#O').after(SortList.eq(i));
                break;
            case "P":
                $('#P').after(SortList.eq(i));
                break;
            case "Q":
                $('#Q').after(SortList.eq(i));
                break;
            case "R":
                $('#R').after(SortList.eq(i));
                break;
            case "S":
                $('#S').after(SortList.eq(i));
                break;
            case "T":
                $('#T').after(SortList.eq(i));
                break;
            case "U":
                $('#U').after(SortList.eq(i));
                break;
            case "V":
                $('#V').after(SortList.eq(i));
                break;
            case "W":
                $('#W').after(SortList.eq(i));
                break;
            case "X":
                $('#X').after(SortList.eq(i));
                break;
            case "Y":
                $('#Y').after(SortList.eq(i));
                break;
            case "Z":
                $('#Z').after(SortList.eq(i));
                break;
            default:
                $('#default').after(SortList.eq(i));
                break;
        }
    }
}
