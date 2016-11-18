/*常用jquery模块，js书写*/
"use strict";

var JQfunctionData = {
    hasClass: function hasClass(_ref) {
        var obj = _ref.obj,
            cls = _ref.cls;

        cls = cls || '';
        if (cls.replace(/\s/g, '').length == 0) return false;
        return new RegExp('' + cls).test('' + obj.className);
    },
    addClass: function addClass(_ref2) {
        var obj = _ref2.obj,
            cls = _ref2.cls;

        if (!hasClass({ obj: obj, cls: cls })) obj.className += " " + cls;
    },
    removeClass: function removeClass(_ref3) {
        var obj = _ref3.obj,
            cls = _ref3.cls;

        if (hasClass({ obj: obj, cls: cls })) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    },
    addEvent: function addEvent(_ref4) {
        var obj = _ref4.obj,
            name = _ref4.name,
            fn = _ref4.fn;

        if (obj.addEventListener) {
            obj.addEventListener(name, function (ev) {
                if (false == fn.call(obj, ev)) {

                    ev.cancelBubble = true;

                    ev.preventDefault();
                }
            }, false);
        } else {
            obj.attachEvent('on' + name, function () {
                if (false == fn.call(obj, event)) {
                    event.cancelBubble = true;

                    return false;
                }
                //fn.apply(obj, [event]);
            });
        }
    },
    getStyle: function getStyle(_ref5) {
        var ele = _ref5.ele,
            _ref5$index = _ref5.index,
            index = _ref5$index === undefined ? 0 : _ref5$index,
            value = _ref5.value,
            _ref5$psClass = _ref5.psClass,
            psClass = _ref5$psClass === undefined ? null : _ref5$psClass;

        var vv = document.defaultView.getComputedStyle(ele[index], psClass)[value];
        return vv.slice(0, vv.length - 2);
    }
};

var hasClass = JQfunctionData.hasClass,
    addClass = JQfunctionData.addClass,
    removeClass = JQfunctionData.removeClass,
    addEvent = JQfunctionData.addEvent,
    getStyle = JQfunctionData.getStyle;

var foo1 = function foo1() {
    console.log(undefined);
};

window.onload = function () {
    addEvent({ obj: document.querySelector(".reverse"), name: 'mouseenter', fn: function fn() {
            addClass({ obj: this, cls: "img_anim" });
        } });
    addEvent({ obj: document.querySelector(".reverse"), name: 'mouseleave', fn: function fn() {
            removeClass({ obj: this, cls: "img_anim" });
        } });
    addClass({ obj: document.querySelector(".whq-less-power"), cls: "whq-less-power_anim" });
    /*划过显出js支持*/
    addEvent({ obj: document.querySelector(".user-hide-pic"), name: 'mouseenter', fn: function fn() {
            // alert()
            // addClass({obj:this, cls:"img_anim"})
            addClass({ obj: document.getElementsByClassName("user-hide-pic")[0], cls: "anim" });
            document.querySelector(".user-hide-pic").style.opacity = 1;
            // ele.style.opacity = opacity / 100;

            // $(".user-hide-pic").fadeIn("slow")
        } });
    addEvent({ obj: document.querySelector(".user-hide-pic"), name: 'mouseleave', fn: function fn() {
            document.querySelector(".user-hide-pic").style.opacity = 0;
        } });
    addEvent({ obj: document.querySelector(".user-sale8"), name: 'mouseenter', fn: function fn() {
            addClass({ obj: this.querySelector(".anim"), cls: "animate" });
            // this.querySelector(".anim").style.animationPlayState = "running"
        } });
    addEvent({ obj: document.querySelector(".user-sale8"), name: 'mouseleave', fn: function fn() {
            removeClass({ obj: this.querySelector(".anim"), cls: "animate" });
            // this.querySelector(".anim").style.animationPlayState = "paused"
        } });

    // $(".user-over-pic").hover(()=>{
    //     // $(this).hide();
    //     $(".user-hide-pic").fadeIn("slow")

    // })
    // 头部颤抖动画

};

$(function () {
    //头部动画
    var x,
        y,
        dMargin,
        dMarginL,
        dMarginT,
        layout,
        eleLeft = [],
        eleTop = [];
    layout = $('.animImg');
    for (var i = 0; i < layout.length; i++) {
        eleLeft[i] = parseInt(layout.eq(i).css('left'));
        eleTop[i] = parseInt(layout.eq(i).css('top'));
    };
    $(document).mousemove(function (e) {
        var layout1;

        dMarginL = Math.round(($(document).width() - 495) / 2, 0);
        dMarginT = 380;
        x = e.pageX - dMarginL;
        y = e.pageY - dMarginT;
        layout.each(function (eleindex) {
            var that = $(this);
            function anim() {
                that.stop().animate({
                    'left': x * that.attr('data-x') + eleLeft[eleindex],
                    'top': y * that.attr('data-y') + eleTop[eleindex]
                }, 0);
            }
            if (e.pageX < window.innerWidth / 2) {

                if (that.hasClass("animImgSpanL")) {
                    anim();
                }
            } else {

                if (that.hasClass("animImgSpanR")) {
                    anim();
                }
            }
        });
    });
    // 
    $(".user-sale .blink").click(function () {
        window.open($(this).parent().parent().find("a").attr("href"), "_blank");
    });
    /*ball rolling js支持*/
    // $(".reverse").mouseenter(function(){

    //     // $(this).addClass("img_anim")
    //     addClass({ele:document.querySelector('.reverse'), cls:"img_anim"})
    // }).mouseleave(function(){


    //     removeClass({ele:document.querySelector('.reverse'), cls:"img_anim"})
    // })
    // 头图动画js支持
    // /*压入块js支持*/
    // $(".whq-less-power").addClass("whq-less-power_anim")
    // $(".whq-less-power").animate({opacity:1},"slow")

    // $("body").delegate(".reverse", "mouseover",()=>{
    //     $(this).addClass("img_anim")
    // }).delegate(".reverse", "mouseout",()=>{
    //     $(this).removeClass("img_anim")
    // })

    // 商品js支持
    // window.onload = ()=>{
    //     addEvent({ obj: document.querySelector(".reverse"), name: 'mouseenter', fn: function fn() { 
    //         addClass({ele:this, cls:"img_anim"})

    //     } });
    //     addEvent({ obj: document.querySelector(".reverse"), name: 'mouseleave', fn: function fn() { 
    //         removeClass({ele:this, cls:"img_anim"})

    //     } });
    //     addClass({ele:document.querySelector(".whq-less-power"), cls:"whq-less-power_anim"})
    //     /*划过显出js支持*/
    //     addEvent({ obj: document.querySelector(".user-over-pic"), name: 'hover', fn: function fn() { 
    //         addClass({ele:this, cls:"img_anim"})
    //         $(".user-hide-pic").fadeIn("slow")

    //     } });
    //     // $(".user-over-pic").hover(()=>{
    //     //     // $(this).hide();
    //     //     $(".user-hide-pic").fadeIn("slow")

    //     // })

    // }

});