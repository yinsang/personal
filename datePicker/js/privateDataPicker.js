$(function(){
	//dateInput的点击触发datepicker
	$('.dateInput').click(function(){
		$('.datePicker').css('display','none')
	})
	
	//定义日历需要用到的数组
	var dateOriginal=[2015-09-14,0]
	var dateWeek = [0,1,2,3,4,5,6];
	var dateMonthFab
	var year
	if(0==year%4){dateMonthFab=29}else{dateMonthFab=28}
	var dateMonthNum=['31','31',dateMonthFab,'31','30','31','30','31','31','30','31','30']
	var dateWeekName = ['Sun','Mon','Tue','Wen','Thu','Fri','Sat']
	var dateMonthName=['十二','一','二','三','四','五','六','七','八','九','十','十一']
	//获取当前时间的相关数据
	var d=Date.parse("9 15, 2015")
	var now=new Date();
	var nowYear=now.getFullYear();
	var nowMonth=(now.getMonth()+1).toString()
	var preMonth=nowMonth-1;
	var nextMonth=nowMonth+1;
	var nowMonthDays=dateMonthNum[nowMonth-1]
	var preMonthDays=dateMonthNum[nowMonth-2];
	var nextMonthDays=dateMonthNum[nowMonth];
	var nowDay=now.getDate().toString()
	var nowDayEq=(now.getDate()+1).toString();
	if (nowMonth.length==1){
		nowMonth=0+nowMonth;
	}
	if (nowDay.length==1){
		nowDay=0+nowDay;
	}
	var nowDate=nowYear+'-'+nowMonth+'-'+nowDay
	
	$('.inputTime').val(nowDate)
	changeDate()
	
	function changeDate(){
		//获取输入日期的相关数据
		var inputTimeVal=$('.inputTime').val()
		var inputTimeDayDate=inputTimeVal.split('-')
		var inputTime=new Date(inputTimeDayDate) 
		var inputTimeWeekNum=inputTime.getDay();
		var inputTimeYear=inputTime.getFullYear();
		var inputTimeMonth=(inputTime.getMonth()+1).toString()
		var inputTimeMonthName=dateMonthName[inputTimeMonth%12]	
		var inputTimeDay=inputTime.getDate().toString()
		var inputTimeWeek=inputTime.getDay().toString();
		var inputTimeWeekName=dateWeekName[inputTimeWeek];
		var inputTimeMonthDays=dateMonthNum[inputTimeMonth%12]
		var inputTimeMonthDaysNum=Number(inputTimeMonthDays)
		var inputTimepreMonthDays=dateMonthNum[inputTimeMonth-1];
		var inputTimenextMonthDays=dateMonthNum[inputTimeMonth+1];
		var inputTimeDaynum=Math.abs(inputTimeDay)
		if (inputTimeMonth.length==1){
			inputTimeMonth=0+inputTimeMonth;
		}
		if (inputTimeDay.length==1){
			inputTimeDay=0+inputTimeDay;
		}
		$('.inputTime').val(inputTimeYear+'-'+inputTimeMonth+'-'+inputTimeDay)

		var inputTimeMonthFirstDay=inputTimeYear+'-'+inputTimeMonth+'-'+01
		var inputTimeMonthFirstDayDate=inputTimeMonthFirstDay.split('-')
		var inputTimeMonthFirstDayTime=new Date(inputTimeMonthFirstDayDate)
		$('.dataPickerMonth').text(inputTimeMonthName)
		$('.dataPickerYear').text(inputTimeYear)
		var inputTimeMonthFirstDayTimeWeekNum=inputTimeMonthFirstDayTime.getDay();
		var datePickerNum
		if(inputTimeMonthFirstDayTimeWeekNum+inputTimeMonthDaysNum>35){
			datePickerNum=42
			$('.sixthTbodyTr').css('display','table-row')
		}else{
			datePickerNum=35
			$('.sixthTbodyTr').css('display','none')
		}
		var inputTimeMonthFirstDayPosition=$('.dataDayInner').eq(inputTimeMonthFirstDayTimeWeekNum)
		inputTimeMonthFirstDayPosition.text(1)
		var inputTimeDayPosition=$('.dataDayInner').eq(inputTimeDaynum+inputTimeMonthFirstDayTimeWeekNum-1)
			$('.dataDayInner').css('background','#fff')
			inputTimeDayPosition.css('background','rgb(200,178,230)')
		//填充上月和下月的数据以及class
		$('.dataDayInner').removeClass('currentPreMonth')
		$('.dataDayInner').removeClass('currentMonth')
		$('.dataDayInner').removeClass('currentNextMonth')
		for(var i=0;i<inputTimeMonthDays;i++){
			var inputTimeMonthDaysPosition=$('.dataDayInner').eq(inputTimeMonthFirstDayTimeWeekNum+i)
			inputTimeMonthDaysPosition.text(1+i)
			$('.dataDayInner').eq(inputTimeMonthFirstDayTimeWeekNum+i).addClass('currentMonth')
		}
		for(var p=0;p<inputTimeMonthFirstDayTimeWeekNum;p++){
			var inputTimepreMonthDaysPosition=$('.dataDayInner').eq(inputTimeMonthFirstDayTimeWeekNum-p-1)
				inputTimepreMonthDaysPosition.text(inputTimepreMonthDays-p)
				$('.dataDayInner').eq(inputTimeMonthFirstDayTimeWeekNum-p-1).addClass('currentPreMonth')
				$('.currentPreMonth').css('background','pink')
		}
		
		for(var n=0;n<datePickerNum-inputTimeMonthFirstDayTimeWeekNum-inputTimeMonthDaysNum+1;n++){
			var inputTimeNextMonthDaysPosition=$('.dataDayInner').eq(inputTimeMonthFirstDayTimeWeekNum+inputTimeMonthDaysNum+n)
				inputTimeNextMonthDaysPosition.text(1+n)
				$('.dataDayInner').eq(inputTimeMonthFirstDayTimeWeekNum+inputTimeMonthDaysNum+n).addClass('currentNextMonth')
				$('.currentNextMonth').css('background','yellow')
		}

		
	}
	
	$('.dataDayInner').click(function(){
		var inputTimeVal=$('.inputTime').val()
	var inputTimeDayDate=inputTimeVal.split('-')
	var inputTime=new Date(inputTimeDayDate) 
	var inputTimeWeekNum=inputTime.getDay();
	var inputTimeYear=inputTime.getFullYear();
	var inputTimeMonth=(inputTime.getMonth()+1).toString()
		$('.dataDayInner').css('background','#fff')
		$(this).css('background','rgb(200,178,230)')
		var DateMonth=inputTimeMonth
		var whitchMonth=$(this)
		var currentPreMonth
		var currentMonth
		var currentNextMonth
		if(whitchMonth.hasClass('currentPreMonth')){
			if(inputTimeMonth==1){
				DateMonth=12
				inputTimeYear=inputTimeYear-1
			}else(
				DateMonth=Number(inputTimeMonth)-1
				)
		}else if(whitchMonth.hasClass('currentNextMonth')){
			DateMonth=Number(inputTimeMonth%12)+1
			if(inputTimeMonth==12){
				inputTimeYear=inputTimeYear+1
			}
		}else{
			DateMonth=inputTimeMonth
		}
		var clickTimeDate=inputTimeYear+'-'+DateMonth.toString()+'-'+$(this).text().toString()
		$('.inputTime').val(clickTimeDate)
		$('.testBtn').click()
		return false
	})
	$('.testBtn').click(function(){
		$('.inputTime').val($('.inputTime').val())
		changeDate()
		})
	//获取输入日期的相关数据
	var inputTimeVal=$('.inputTime').val()
	var inputTimeDayDate=inputTimeVal.split('-')
	var inputTime=new Date(inputTimeDayDate) 
	var inputTimeWeekNum=inputTime.getDay();
	var inputTimeYear=inputTime.getFullYear();
	var inputTimeMonth=(inputTime.getMonth()+1).toString()
	var inputTimeMonthName=dateMonthName[inputTimeMonth%12]	
	var inputTimeDay=inputTime.getDate().toString()
	$('.preButton').click(function(){
		var preBtnMonth
		if(inputTimeMonth==1){
				preBtnMonth=12
				inputTimeYear=inputTimeYear-1
		}else(
				preBtnMonth=Number(inputTimeMonth)-1
		)
		inputTimeMonth=preBtnMonth
		$('.inputTime').val(inputTimeYear+'-'+preBtnMonth+'-'+inputTimeDay)
		$('.testBtn').click()
		return false
	})
	$('.nextButton').click(function(){
		var nextBtnMonth
		if(inputTimeMonth==12){
				nextBtnMonth=1
				inputTimeYear=inputTimeYear+1
		}else(
				nextBtnMonth=Number(inputTimeMonth)+1
		)
		inputTimeMonth=nextBtnMonth
		$('.inputTime').val(inputTimeYear+'-'+nextBtnMonth+'-'+inputTimeDay)
		$('.testBtn').click()
		return false
	})
	
	//回车触发修改日期事件
	function enterSubmit(){
		if(event.keyCode==13){
			event.returnValue=false;
			document.getElementByClassName('testBtn').click()
		}
	}

	


	
})
