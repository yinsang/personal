
var App = {
	// setView:function(){
	// 	var musicScroll = new mxPlayer.scrollbar("music-list-wrap")
	// 	musicScroll.init();
	// 	window.lyricScroll = new mxPlayer.scrollbar("lyric-wrap")
	// 	lyricScroll.init();
	// 	var jindutiao = new mxPlayer.dragCircle("jindu-circle","jindu-current","jindu",function(){
	// 			if(audio){

	// 			}
	// 			$('#jinduCurrent').css({'width':audio.currentTime/audio.duration*100+'%'});
	// 	},function(width1,width2){
	// 		if(!(audio.src.length > 0 )) return;
	// 		audio.currentTime = width1/width2*audio.duration;

	// 	});
	// 	var yinliang = new mxPlayer.dragCircle('volume-circle','volume-current','volume',function(){ // 音量条拖拽
	// 		if (audio)
	// 		{
	// 		   $('#volume-current').css({'width':audio.volume*100+'%'});
	// 		}
	// 	},function(width1,width2){
	// 		if(!(audio.src.length>0)) return ;
	// 			audio.volume = width1/width2 ;
	// 	});
	// },
	domEvent:function(){
		$('#play').on('click',function(){
			mxPlayer.play();
		});
		$('#mute').on("click",function(){
			var mute = $(this).attr("data-mute")
			if(mute == "false"){
				$(this).attr({"data-mute":"true","data-volume":audio.volume})	
				audio.volume=0;
				// $("current-volume").width(0);
				$('#volume-current').css({'width':0});
			}else{
				$(this).attr("data-mute","false")
				audio.volume = parseFloat($(this).attr('data-volume'));
				$('#volume-current').css({'width':audio.volume*100+'%'});
			}
		})
		$('#model').on("click",function(){
			mxPlayer.model++;
			mxPlayer.setModel(mxPlayer.model)
			$(this).text(mxPlayer.modelArr[mxPlayer.model]);
		})
		$('#music-list').on('dblclick','.music-list-item',function(){
			mxPlayer.currentItem = $(this).index();
			mxPlayer.next(mxPlayer.currentItem)
		});
		$('#jindu').on('click',function(){

			var thisLeft = $(this)[0].getBoundingClientRect().left,
				thisWidth = $(this)[0].getBoundingClientRect().width,
				thisPosition = (getMousePos($(this)).x-thisLeft)/thisWidth;
			$jinduCurrent = $("jindu-current")
			$jinduCurrent.css("width",thisPosition*100+"%")
			audio.currentTime = thisPosition*audio.duration
		});
		$('#volume').on('click',function(){
			var thisLeft = $(this)[0].getBoundingClientRect().left,
				thisWidth = $(this)[0].getBoundingClientRect().width,
				thisPosition = (getMousePos($(this)).x-thisLeft)/thisWidth;
			$volumeCurrent = $("#volume-current")
			console.log(thisPosition*100+"%")
			$volumeCurrent.css("width",thisPosition*100+"%")
			audio.volume = thisPosition
		});
		function getMousePos(){
			var e = event||window.event
			return {"x":e.clientX,"y":e.clientY}
		}
	},
	run:function(){
		storage.init(); // localStorage 主要是保存了当前播放歌曲id，以及和另外一个页面通信
		List.init();	// 获取音乐表单
		console.log(List)
		console.log(storage)
		console.log(mxPlayer)
		mxPlayer.init(); // 播放器初始化
		this.domEvent(); // 各种点击事件
	}
}
var List = {
	model:[],
	add:function(arr){
		this.model = this.model.concat(arr)
		this.render()
	},
	render:function(){
		mxPlayer.insertList("music-list",this.model);
	},
	get:function(id){
		return listArr.filter(function(ele){
			if(ele.id == id) return ele
		})
	},
	init:function(){
		this.add( this.get(mxPlayer.currentId) )
	}
}
var storage = {
	getCurrentId:function(){
		var id =  parseInt(localStorage["currentId"],10)>=1 ? parseInt(localStorage["currentId"],10): 1
		return id
	},
	init:function(){
		mxPlayer.currentItem = 0;
		mxPlayer.currentId = this.getCurrentId();
		localStorage.setItem('isPlayerOpen','true');
		window.addEventListener("beforeunload",function(){
			localStorage.setItem("isPlayerOpen",false)
		})
		window.addEventListener("storage",function(e){
			if(e.key=="currentId"){
				mxPlayer.setCurrentId(storage.getCurrentId())
			}
		})
	}
}

var mxPlayer = (function($){
	window.audio = document.createElement('audio');
	audio.volume = 0.5;
	audio.autoplay = "true";
	audio.src = "audio/aiqingdeqiang.mp3";
	var $jinduCurrent = $("#jindu-current")
		$duration = $("#duration")
		$currentTime = $("#currentTime")
		$lyric = $("#lyric")
	return {
		init:function(){
			this.next();
			var _this = this;
			audio.ontimeupdate =  function(){
				// console.log(audio.currentTime)
				var $lyricItemCurrent;
				
				$jinduCurrent.css("width",audio.currentTime/audio.duration*100+"%")
				$currentTime.text(_this.setTime(audio.currentTime))
				$duration.text(_this.setTime(audio.duration))
			}
			$('#volume-current').css({'width':audio.volume*100+'%'});
			// $lyricItemCurrent = $lyricItem.eq(i);

			// audio.play()
			// alert()
			
		},
		setCurrentId:function(id){
			var arr = List.model
			var had = false
			for(var i =0;i < arr.length;i++){
				if(arr[i]==id){
					had=!had
					break

				}
			}
			if(had){
				this.currentItem=i
			}else{
				List.add(List.get(id))
				this.currentItem = List.model.length-1
			}

		},
		play:function(){
			if(audio.paused == true){
				audio.play()
				$("#play").text("pause")
			}else{
				audio.pause()
				$("#play").text("play")
			}
		},
		setTime:function(time){
			var time = Math.floor(time)
			var min = Math.floor(time/60)
			min = min>9?min:("0"+min)
			var sec = Math.floor(time%60)
			sec = sec>9?sec:("0"+sec)
			return min+":"+sec
		},
		model:0,
		modelArr:["顺序","随机","循环"],
		setModel:function(index){
			if(index >= this.modelArr.length) index = 0;
			this.model = index
		},
		lyricTop:0,
		lyricAuto:true,
		setLyric:function(str){
			$lyric.empty().css("top",0)
			var contentArr = str.split(/\[[^\]]+\]/g);
			var timeArr = str.match(/\[[^\]]+\]/g) ;
			var str = "";
			content.forEach(function(element){
				str +=("<p>"+element+"</p>")
			})
			$lyric.append(str);
		},
		next:function(index,prevNext,auto){
			switch(this.model){
				case 0://下一曲
				if(typeof(index)!="number"){
					if(prevNext == "next") this.currentItem++;
					else if(prevNext =="prev") this.currentItem--;

				}else this.currentItem = index
				break;
			}
			/*-----------为当前播放歌曲添加状态----------------*/
			var $mliCurrent = $('.music-list-item').eq(0);
			$mliCurrent.addClass('mli-current').siblings().removeClass('mli-current');
			audio.src = $mliCurrent.attr('data-songUrl') ;
			$('#music-pic').attr({'src':$mliCurrent.attr('data-songPoster')})
			$('#music-pic-wrap').css({'background-image':'url('+$mliCurrent.attr('data-songPoster')+')'});
			this.blur()

		},
		checkIndex:function(){

		},
		dragCircle:function(){
			// var xx,yy,XX,YY,
			// 	$dom = $("#"+dom),
			// 	$parent = $("#"+parent),
			// 	$grad = $("#"+grad),
			// 	parentWidth,
			// 	gradWidth,
			// var idmove;

		},
		blur:function(){ // 高斯模糊背景
			$('#music-pic')[0].onload = function(){
				$('.music-player-box')[0].style.background = "none" ;
				$('#music-pic,#music-bgd').attr({'width':$(window).width(),'height':$(window).height()});
				stackBlurImage( "music-pic", "music-bgd", 20, false );
			}
		},
		insertList:function(dom,list){
			var $this = $("#"+dom)
			var str = "";
			$this.empty;
			for(var i = 0;i < list.length;i++){
				var singerName = list[i].singer[0].name,
					singerUrl = list[i].singer[0].url,
					songName = list[i].songName[0].name,
					songNameUrl = list[i].songName[0].url,
					albumName = list[i].album[0].name,
					lyric = list[i].lyric[0].pos,
					poster = list[i].poster,
					songUrl = list[i].pos;
				str += ('<li class="music-list-item" data-songUrl="'+songUrl+
							'" data-lyricName="'+lyric+
							'" data-songPoster="'+poster+
							'" data-author="'+singerName+
							'" title="'+songName+'">'+songName+'<div class="music-li-delete" title="删除"></div>'+
						'</li>');
			}
			$this.append(str)
		},
		// scrollbar:function(dom){
		// 	var $dom = $("#"+dom)
		// 		$child = $(this).children().eq(0);
		// 		$(this).append(
		// 			'<div id="'+dom+'scrollbar" style="position:absolute;right:4px;width:5px;height:0;background:rgba(247,105,105,0.8);border-radius:4px;overflow:hidden;cursor:pointer;"></div>')
		// 	var $sb = $('#'+dom+'scrollbar');
		// 	var thisHeight , childHeight , childtopMax , childtopMin ,  bili ,biliTop , sbHeight , sbTopMax ,sbTopMin ,sbTopCurrent;
		// 	sbTopCurrent = 0 ;
		// 	this.init = function(){ // 当父元素，子元素高度有变化时，可以重置滚动条
		// 		thisHeight = $this.height() ,
		// 		childHeight = $child[0].offsetHeight,
		// 		childtopMax = 0,
		// 		childtopMin = thisHeight - childHeight ,
		// 		bili = thisHeight/childHeight ,
		// 		sbHeight = thisHeight*bili ,
		// 		sbTopCurrent = (thisHeight-sbHeight)*sbTopCurrent/sbTopMax ,
		// 		sbTopMax = thisHeight - sbHeight ,
		// 		sbTopMin = 0 ;
		// 		biliTop = -sbTopMax/childtopMin ;
		// 		(sbHeight < thisHeight) ? $sb.height(sbHeight) : ($sb.height(0),sbTopCurrent=0) ; // 如果滚动条的高度大于父元素的高度，隐藏滚动条，top值为0

		// 		this.setTop({sbTop:true,top:sbTopCurrent});
		// 	}
		// 	this.reset = function(){
		// 		sbTopCurrent = 0 ;
		// 		this.init();
		// 	}
		// 	this.setTop = function(arg){
		// 		if (arg.childTop )
		// 		{
		// 			$child.css({'top':arg.top});
		// 			sbTopCurrent = -arg.top*biliTop
		// 			$sb.css({'top':sbTopCurrent});
		// 			return ;
		// 		}
		// 		if(arg.sbTop ){
		// 			$sb.css({'top':arg.top});
		// 			$child.css({'top':(isNaN(-arg.top/biliTop)?0:-arg.top/biliTop)});
		// 			return ;
		// 		}
		// 	}
		// 	var _this = this ;
		// 	window.addEventListener('resize',function(){
		// 		_this.init();
		// 	})
		// 	dragSb($sb);
		// 	$this[0].addEventListener('mousewheel',function(event){
		// 		event.stopPropagation();
		// 		event.preventDefault();
		// 		var event = event || window.event ;
		// 		var detail = event.detail || event.wheelDelta ;
		// 		var sbTop = $sb.offset().top ,
		// 			childTop = $child.position().top ;
		// 		childTop = childTop + detail ;
		// 		if (childTop > childtopMax )
		// 		{
		// 			childTop = 0 ;
		// 		}else if (childTop< childtopMin)
		// 		{
		// 			childTop = childtopMin ;
		// 		}
		// 		_this.setTop({childTop:true,top:childTop});
		// 	});
		// 	function dragSb($dom){
		// 		var $sb = $dom ,
		// 			sbCurrentTop,yy,YY,idmove ;
		// 		$sb.on('mousedown',function(event){
		// 		    sbCurrentTop = $sb.position().top ;
		// 			YY = yy = event.pageY ;
		// 			idmove = true ;
		// 		});
		// 		$sb.on('mousemove',function(event){
		// 			YY = event.pageY ;
		// 			var sbTop = sbCurrentTop+YY-yy ;
		// 			if (idmove)
		// 			{
		// 				if (sbTop<sbTopMin) sbTop = sbTopMin ;
		// 				else if(sbTop>sbTopMax) sbTop = sbTopMax ;
		// 				_this.setTop({sbTop:true,top:sbTop});
		// 			}
		// 		});
		// 		$sb.on('mouseup',function(event){
		// 			idmove = false ;
		// 		});
		// 		$(document).on('mouseup',function(){
		// 			idmove = false ;
		// 		})
		// 	}
		// }



	}
	
})(jQuery)