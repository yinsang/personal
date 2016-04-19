(function($) {


    var config = {
        host: window.location.host === 'www.xiami.com' ? 'http://www.xiami.com/' : 'http://idailysong.local.xiami.com/',
        io: function(data){
            $.ajax({
                dataType: 'jsonp',
                url: this.host + data.url,
                data: data.data,
                jsonp: 'callback',
                success: data.fn
            })
        }
    };

    $(function(){
        var Listen = function() {
            var self = this;
            self._init();
        }

        Listen.prototype = {
            _listenHeadTpl : '<h2>'
                            + '<div class="chuanyue">'
                                +'<a href="javascript:;" id="chuanyueBtn" data-spm-click="gostr=/xiamipc;locaid=d1;" class="btn" title="我要穿越">我要穿越</a>'
                            +'</div>'
                            +'<strong class="bigtext">今日音乐人</strong>'
                        +'</h2>',


            _init: function() {
                var self = this;

                self.ioUrl = 'musician/get-musician-daily-song';
                self.isChuanYue = false;
                self.$listenMod = $('#listenMod');
                self.$chuanyueBtn = self.$listenMod.find('#chuanyueBtn');
                self.$listenCont = self.$listenMod.find('.listen-cont');
                self.$content = $('<div class="content"></div>');
                //self._createCss();

                self._getTodayData();
                self._bindEvent();
            },
            _renderHead: function(){
                var self = this;
                self.$listenCont.html(self._listenHeadTpl).append(self.$content);

            },
            _renderContent: function(data) {
                var self = this;
                var song = data.song || {};
                //song.show_logo = self._replaceImg(song.show_logo);

                var listenWrapTpl =   '<div id="listenWrap"><div class="item-cover" id="itemCover">'
                        +'<div class="img"><img src="'+ song.show_logo +'" /></div>'
                        +'<div class="item-date">'
                            +'<ul>'
                                +'<li class="month">'+data.month +'</li>'
                                +'<li class="day">'+ data.day+'</li>'
                                +'<li class="week">'+ data.week + '</li>'
                            +'</ul>'
                        +'</div>'
                        +'<b class="icon toplay" onclick="play('+ song.song_id +');goldlog.record(\'/xiamipc.23\',\'\',\'cache=20150612&event=click&from=home_yinyueren&songid='+ song.song_id +'\',\'H46747615\')"></b>'
                    +'</div>'
                    +'<div class="item-util">'
                        +'<div class="collect">'
                            +'<a href="javascript:;" onclick="tag('+ song.song_id +',3);return false" id="collectBtn" class="btn" data-spm-click="gostr=/xiamipc;locaid=d2;">收藏</a>'
                        +'</div>'
                        +'<div class="share">'
                            +'<a href="javascript:;" onclick="recommend('+ song.song_id +',32);return false;" id="shareBtn" class="btn" data-spm-click="gostr=/xiamipc;locaid=d3;">分享</a>'
                        +'</div>'
                    +'</div>'
                    +'<div class="item-song">'
                        +'<h2>'
                        +'<a href="/song/'+ song.song_id +'" target="_blank" id="songName" title="'+song.song_name+'"><strong class="bigtext">'+ song.song_name  +'</strong></a>'
                        +'<a href="/artist/'+ song.artist_id +'" target="_blank" id="artistName"><span class="name">by&nbsp;'+ song.artist_name +'</span></a></h2>'
                        +'<div class="desc">'+ song.content+'</div>'
                    +'</div>'
                    +'<a class="item-comment" target="_blank" href="/song/'+ song.song_id +'#wall_list" id="itemComment">听完吱一声</a></div>';

                self.$listenWrap = $(listenWrapTpl);
                if(self.isChuanYue) {
                    self.$listenWrap.find('.item-date').addClass('past');
                }
                self.$content.html(self.$listenWrap);
            },
            _replaceImg: function(url){

                var self = this;
                if (url && url.indexOf('xiami.net') !== -1) {
                    url = url.replace(/(img|pic)(\.xiami\.net)/, 'pic$2');

                    if(url.indexOf('_') !== -1) {
                        url = url.replace(/_[0-9]\./, '.');
                    }

                }

                return url + '@270w_270h';
            },
            /**
             * _createCss 创建css
             */
            _createCss: function() {
                var self = this;
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                link.href = 'http://g-assets.daily.taobao.net/de/xiami-index-mods/1.0.0/home/index.css';
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('type', 'text/css');
                head.appendChild(link);

            },
            _bindEvent: function() {
                var self = this;

                self.$listenMod.delegate('#chuanyueBtn', 'click', function(event) {
                    self._getChuanYueData();
                })
                self.$listenMod.delegate('#collectBtn,#shareBtn', 'click', function(event) {
                    var e = event || window.event;
                    self._eventHandler(e);
                })

                self.$listenMod.delegate('#itemCover', 'mouseenter', function(event){
                    var e = event || window.event;
                    var $this = $(event.currentTarget);
                    $this.addClass('hover');
                }).delegate('#itemCover', 'mouseleave', function(event){
                    var e = event || window.event;
                    var $this = $(event.currentTarget);
                    $this.removeClass('hover');
                })


            },

            /**
             * _chuanyue 获取穿越数据
             * @return {[type]} [description]
             *
             */
            _getChuanYueData: function() {
                var self = this;
                self.$listenWrap.html('<p class="loading"></p>')
                config.io({
                    url: self.ioUrl,
                    data: {
                        'go': '1'
                    },
                    fn: function(res) {
                        if(res.status && res.data) {
                            self.isChuanYue = true;
                            self._renderContent(res.data);
                        }
                    }
                });
            },
            _getTodayData: function(){
                var self = this;
                config.io({
                    url: self.ioUrl,
                    data: {},
                    fn: function(res) {
                        if(res.status && res.data) {
                            self._renderHead();
                            self.isChuanYue = false;
                            self._renderContent(res.data);
                        }

                    }
                })
            },


            /**
             * _eventFn 事件处理函数
             * @param  {Object} event 事件状态
             */
            _eventHandler: function(event) {
                var self = this;
                var target = event.currentTarget;

                switch (target.id) {
                    case 'collectBtn':

                        break;
                    case 'shareBtn':

                        break;
                }

            }

        }
        var listen = new Listen();
    });


    $(function(){
        var Prad = function(){
            var self = this;
            self._init();
        };

        Prad.prototype = {
            tpl: '<div class="pr_ad_four"></div>',

            _init: function(){
                var self = this;
                self.$pradWrap = $('#pr_ad > .content');
                self.$pradTpl = $(self.tpl);
                self._getData();
            },

            _getData: function(){
                var self = this;

                config.io({
                    url: 'musician/get-musician-promotion',
                    data: {},
                    fn: function(res) {
                        if(res.status && res.data) {

                            self._renderContent(res.data);
                        }
                    }
                });
            },

            _renderContent: function(data){
                var self = this;

                if(data.length > 0) {
                    $.each(data, function(i, o){

                        var a = '<a href="'+ o.url +'?from=home&local=four_ad" target="_blank"><img src="http://img.xiami.net/'+ o.pic_url +'" alt="'+o.title+'" title="'+o.title
                        +'" /></a>';
                        self.$pradTpl.append(a);
                    })
                }
                self.$pradWrap.html(self.$pradTpl);
            }
        }

        var prad = new Prad();
    });

    $(function(){
        var Notes = function($wrap){
            var self = this;
            self.$noteWrap = $wrap;
            self.$content  = self.$noteWrap.find('.content');
            self.$noteList = $('<div class="note_list"></div>');
            self._getNoteData();
        }
        Notes.prototype = {

            _getNoteData: function(){
                var self = this;

                config.io({
                    url: 'musician/get-musician-note',
                    data: {},
                    fn: function(res) {
                        if(res.status && res.data) {

                            self._renderList(res.data);
                        }
                    }
                });
            },
            _renderList: function(data){
                var self = this;
                self.template = data.template || '1';

                if(data.blog.length > 0){
                    $.each(data.blog, function(i, o){
                        o.first_img = self._replaceImg(o.first_img);
                        o.lastTime = self._editDate(o.gmt_last_modify ? o.gmt_last_modify : o.gmt_create);
                        self._noteTpl(o, i)
                    });
                }
                self.$content.html(self.$noteList);
            },
            _noteTpl: function(obj, index){

                var self = this;
                var html = '<div class="note">'
                    + '<div class="info_wrapper" style="background:'+ obj.color +';">'
                        + '<div class="info">'
                            + '<a href="http://www.xiami.com/musician-note/note/id/'+ obj.id +'" target="_blank">'
                                + '<p><strong>' +obj.artist_name +'</strong>'
                                + '</p>'
                                + '<p class="multiple">' +obj.short_desc+ '</p>'
                                + '<p>　</p>'
                                + '<em>' + obj.lastTime + '</em>'
                            + '</a>'
                        + '</div>'
                    + '</div>'
                + '</div>';
                var imgHtml = '<div class="image">'
                        + '<a href="http://www.xiami.com/musician-note/note/id/'+ obj.id +'" title="'+ obj.title +'" target="_blank">'
                            + '<img src="'+ obj.first_img +'" alt="'+ obj.title +'">'
                        + '</a>'
                    + '</div>';
                $htmlWrap = $(html);
                if(obj.img_type === '2') {
                    $htmlWrap.append('<sup></sup>');
                }

                if(self.template === '1') {

                    if(index === 1 || index ===2) {

                        $htmlWrap.addClass('small');
                        $htmlWrap.css({'left':leftVal(1)});

                        if(index === 2) {
                            $htmlWrap.css({'top':'136px'});
                        }
                    }else {
                        if(obj.first_img){
                            $htmlWrap.addClass('img');
                            $htmlWrap.prepend(imgHtml);
                        }else {
                            $htmlWrap.addClass('text');
                        }
                    }
                    if(index === 3) {
                        $htmlWrap.css({'left':leftVal(2)})
                    }
                    if(index === 4) {
                        $htmlWrap.css({'left':leftVal(3)})
                    }
                }
                if(self.template === '2') {
                    if(obj.first_img){
                        $htmlWrap.addClass('img');
                        $htmlWrap.prepend(imgHtml);
                    }else {
                        $htmlWrap.addClass('text');
                    }
                    if(index === 1) {
                        $htmlWrap.css({'left':leftVal(1)});
                    }else if (index === 2) {
                        $htmlWrap.css({'left':leftVal(2)})
                    }else if (index === 3) {
                        $htmlWrap.css({'left':leftVal(3)})
                    }

                }

                function leftVal(num){
                    return (175 + 13) * num + 'px';
                }
                self.$noteList.append($htmlWrap);

            },
            _replaceImg: function(url){

                var self = this;
                if (url && url.indexOf('xiami.net') !== -1) {
                    url = url.replace(/(img|pic)(\.xiami\.net)/, 'pic$2');

                    return url+'@!c-220-220';
                }
            },
            _editDate: function(lastTiem){
                var self = this;
                var curTime = new Date().getTime();
                var time = Math.round(curTime/1000) - lastTiem;
                var timeStr = '';

                    if(time < 5){
                        timeStr = '刚刚';
                    }else if (time > 5 && time < 60) {
                        timeStr = time + '秒前';
                    }else if (time > 60 && time < 3600) {
                        timeStr = (time/60) + '分前';
                    }else if (time > 3600 && time < 3600 * 24) {
                        timeStr = (time/3600) + '小时前';
                    }else if (time > 3600 * 24 && time < 30 * 3600 * 24) {
                        timeStr = (time/(3600 * 24)) + '天前';
                    }else if (time > 30 * 3600 * 24) {
                        timeStr = Math.floor(time/(30 * 3600 * 24)) + '月前';
                    }else {
                        timeStr = "很久很久以前";
                    }

                return timeStr;
            }
        }

        var $notesWrapper = $('#NotesWrapper');
        if($notesWrapper && $notesWrapper.length > 0) {
            new Notes($notesWrapper);
        }
    })

})($)
