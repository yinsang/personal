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

function addCarousel(obj) {
    var oDiv = obj.find(".user-inner .user-items");
    var icons = obj.find(".user-icons .user-icon");
    var index = 0;
    var len = oDiv.size();
    var timer, startX, pageX, spaceX;
    var flag = 0;var ready = true;
    function autoPlay() {
        console.log(flag);
        icons.removeClass("user-active");
        if (flag == 1) {
            icons.eq(index % len).addClass("user-active");
            oDiv.eq(index % len).css({ zIndex: 2 }).animate({ width: '4.5rem', height: '4rem', top: '0', left: '1.3rem' }, 500);
            oDiv.eq((index + 1) % len).css({ zIndex: 1 }).animate({ width: '4.05rem', height: '3.6rem', top: '0.2rem', left: '6rem' }, 500);
            oDiv.eq((index - 1 + len) % len).css({ zIndex: 2 }).animate({ width: '4.05rem', height: '3.6rem', top: '0.2rem', left: '-2.95rem' }, 500);
            /* setTimeout(function(){
                    console.log(1322123);
                    oDiv.eq((index + 2) % len).css({zIndex:-1,width:'2.2rem',height:'2.2rem',top:'0.3rem',left:'7.6rem'});
                },400)*/
        } else if (flag == -1) {
            //oDiv.eq((index - 1) % len).css({zIndex:-1});
            setTimeout(function () {
                icons.eq(index % len).addClass("user-active");
                oDiv.eq(index % len).css({ zIndex: 2 }).animate({ width: '4.5rem', height: '4rem', top: '0', left: '1.3rem' }, 500);
                oDiv.eq((index + 1) % len).css({ zIndex: 1 }).animate({ width: '4.05rem', height: '3.6rem', top: '0.2rem', left: '6rem' }, 500);
                oDiv.eq((index - 1 + len) % len).css({ zIndex: 0 }).animate({ width: '4.05rem', height: '3.6rem', top: '0.2rem', left: '-2.95rem' }, 500);
            }, 100);
        }
    }
    function next() {
        flag = 1;
        index++;
        autoPlay();
    }
    function prev() {
        flag = -1;
        index--;
        autoPlay();
    }
    timer = setInterval(function () {
        next();
    }, 5000);
    oDiv.bind("touchstart", function (e) {
        clearInterval(timer);
        var touch = e.targetTouches[0];
        startX = touch.pageX;
    });
    oDiv.bind("touchmove", function (e) {
        e.preventDefault();
        var touch = e.targetTouches[0];
        pageX = touch.pageX;
    });
    oDiv.bind("touchend", function () {
        var spaceX = startX - pageX;
        if (Math.abs(spaceX) > 50 && startX != spaceX) {
            pageX = 0;
            if (spaceX > 0) {
                next();
            } else if (spaceX < 0) {
                prev();
            }
            timer = setInterval(function () {
                next();
            }, 10000);
        } else {
            pageX = 0;
        }
    });
}
var pushGold = function pushGold(obj) {
    this.Obj = $(obj);
    this.isLogin = '';
    this.sid = "";
    this.init();
};
pushGold.prototype = {
    clickF: function clickF() {
        var that = this;
        this.Obj.on("click", function () {
            console.log(this);
            $(this).addClass("user-hover");
            that.baseLogin();
        });
    },
    getHttp: function getHttp(url, data, callback) {
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'jsonp',
            data: data,
            contentType: 'application/json',
            success: function success(data) {
                if (callback) {
                    callback(data);
                }
            }
        });
    },
    pushAjax: function pushAjax() {
        var that = this;
        var myValue = 'e09500e7e9ddc68ca5f7dbf0f856d92d',
            goldNum = 1;
        var data = {
            sid: "ed6a400dfcbd7aa257e7700d905d8f7c",
            callId: '1001',
            sysId: "20170503",
            creditToken: "3fea9dd28d8a4201b6e7b675a27b0e14",
            resourceId: "45",
            ruleId: "92",
            amount: goldNum,
            mValue: myValue
        };
        console.log(data, this);
        this.getHttp('//vip.jr.jd.com/credit/issueCreditJsonp', data, that.fuck);
    },
    fuck: function fuck(data) {
        console.log(data);
    },
    baseLogin: function baseLogin() {
        var that = this;
        Base.checkLogin(function (data) {
            console.log(JSON.stringify(data));
            if (data.isLogined) {
                that.isLogin = true;
                that.sid = "nima";
                console.log(that.pushAjax);
                that.pushAjax();
                //data.sid;
            }
        }, function () {
            console.log("未登录");
            //window.location.href = window.location.protocol + "//plogin.m.jd.com/user/login.action?appid=100&kpkey=&returnurl=" + location.href;
            //window.location.href = window.location.protocol + "//passport.m.jd.com/user/login.action?v=1&returnurl=" + encodeURIComponent(location.href) + ""
            that.sid = "b06070ed8d63be63f4bbf6aa2acc91a5";
            that.pushAjax();
        });
    },
    init: function init() {
        this.clickF();
    }
};
var getGift = function getGift() {
    this.init();
};
getGift.prototype = {
    init: function init() {
        this.bindClick();
        this.bindCloseF();
    },
    getHttp: function getHttp(url, data, callback) {
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'jsonp',
            data: data,
            contentType: 'application/json',
            success: function success(data) {
                if (callback) {
                    callback(data);
                }
            }
        });
    },
    bindClick: function bindClick() {
        var that = this;
        var data = {
            sid: '0faa7ba3189d9cc6fb0267efd6a1bde7',
            channel: 3
        };
        $(".getGift").click(function () {
            //that.getHttp("//jrvip.jd.com/activity/score",data,that.ifCanGet)
            that.getHttp("http://localhost:9090/score", data, function (data) {
                console.log('cb', data, this);

                var personInfo;

                if (data.isHaveF === true) {
                    personInfo = 0;
                    //老用户
                } else if (data.isHaveF == false) {

                    //新用户
                    if (data.score == undefined || data.score == 0 || data.score == "undefined" || data.score == null) {
                        //新用户，未做活动
                        personInfo = 1;
                    } else if (data.score > 0) {
                        //新用户，做活动，可领奖。
                        personInfo = 2;
                    }
                }
                //personInfo = 2;
                $(".user-alert-window .user-btn").hide();
                var texts = $(".user-alert-window .user-text");
                texts.removeClass("user-hover");
                switch (personInfo) {
                    case 0:

                        texts.eq(0).addClass("user-hover");
                        that.showWindow();

                        break;
                    case 1:

                        texts.eq(1).addClass("user-hover");
                        $(".user-alert-window .user-btn").show().html("去做任务").attr("href", "1");
                        that.showWindow();
                        break;
                    case 2:

                        texts.eq(2).addClass("user-hover");
                        that.ifGot();
                        break;
                }
            });
            //that.ifCanGet()
        });
    },
    ifGot: function ifGot(data) {

        //this.getHttp("//jrvip.jd.com/activity/score",data,that.ifCanGot)
        var data = {
            "sid": "0faa7ba3189d9cc6fb0267efd6a1bde7",
            "channel": "3"
        };
        var that = this;
        that.getHttp("http://localhost:9090/isRecord", data, function (data) {
            console.log(data);
            if (data.isRecord == false && data.isCanDraw == true) {
                that.bindGetF();

                $(".user-alert-window .user-btn").show().html("领取奖励").attr("href", "javascript:;");
            } else if (data.isRecord == true) {

                $(".user-alert-window .user-btn").show().addClass("user-already-got").html("您已领过了哦").attr("href", "javascript:;");
            }

            that.showWindow();
        });
    },
    bindGetF: function bindGetF() {
        var data = {
            "sid": "0faa7ba3189d9cc6fb0267efd6a1bde7",
            "channel": "3"
        };
        var that = this;

        $(".user-alert-window .user-btn").click(function () {
            that.getHttp("http://localhost:9090/getRight", data, function (data) {
                console.log(data);

                if (data.result == true) {
                    $(".user-alert-window .user-btn").show().html("领取成功");
                }
                setTimeout(function () {

                    that.closeF();
                }, 1000);
            });
        });
    },
    showWindow: function showWindow() {

        $(".user-alert-windows").show();
    },
    bindCloseF: function bindCloseF() {

        var that = this;
        $(".user-alert-windows .user-close").click(function () {
            that.closeF();
        });
    },
    closeF: function closeF() {

        $(".user-alert-windows").hide();
    }
};
$(window).on("load", function () {
    addCarousel($(".user-floor-carousel1"));
    addCarousel($(".user-floor-carousel2"));
    addCarousel($(".user-floor-carousel3"));
    var newPushGold = new pushGold(".user-floor-qian .user-btn");
    var newgetGift = new getGift();
    console.log(newgetGift);
});