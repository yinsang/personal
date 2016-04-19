$(function(){
	
	var index1
	var animationEnd =true
	var slide=function(index){
		// console.log(index)
		// console.log(sliderTimer)
		
		if($("#slider .content .item").eq(index).css("display")=="none"){
			$("#slider .content .item").eq(index).siblings().hide()
			animationEnd=false
			$("#slider .content .item").eq(index).fadeIn("fase",function(){
				animationEnd = true;
				// console.log(1)
			})
			// $("#slider .content .item").eq(index).css("display","block").siblings().css("display","none")
			$($("#slider .action a")[index]).addClass("current").siblings().removeClass("current")
		}
		if(index < $("#slider .content .item").length-1){
			slideNext = index+1
		}else{
			slideNext = 0
		}
		console.log(slideNext)
		
		// setInterval(function(){console.log(1)},1000)
	}
	var sliderTimer = 0
	var slideNext = 1;
	var slideRun=function(){
		clearInterval(sliderTimer);

		sliderTimer = setInterval(function(){
			slide(slideNext);
			// console.log(sliderTimer)
		},5000)
		
	}
	var slidePause = function(){
		clearInterval(sliderTimer);
		// console.log(sliderTimer)
	}
	var tabHoverDelay
	$(sliderTimer).on("change",function(){console.log(sliderTimer)})
	$("#slider").on("click",".action a",function(){
		slidePause()
		if(animationEnd){
			slide($(this).index())
			
		}
		slideRun()
	}).on("mouseover",".action a",function(){
		var _this = $(this).index()
		tabHoverDelay = setTimeout(function(){
			slidePause();
			slide(_this)

		},500)
		
	}).on('mouseleave', '.action a', function() {
		clearTimeout(tabHoverDelay);
		slideRun();
	}).on("mouseleave",".content .item",function(){
		slideRun()
	}).on("mouseover",".content .item",function(){
		slidePause()
	})
	slideRun()
})