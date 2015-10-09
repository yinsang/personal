$(function(){
	$('head').html($('head').html()+'<link rel="stylesheet" type="text/css" href="../datePicker/css/privateDataPicker.css">')
	
			/*var statisDate = document.getElementById("myframe").contentWindow.document.getElementById('inputTime').innerHTML
			console.log(statisDate)*/
		
})
function onceinsertFunction(x){
	$('#'+x).one('click',function(){
		if($('#createDiv').html()==undefined){
			var inputTime=document.getElementById(x)
			var inputTime=$(inputTime)
			var createDiv=document.createElement('div')
			var $createDiv=$(createDiv)
			createDiv.id='createDiv'
			
				$createDiv.insertAfter(inputTime)
				inputTime.focus(function(){
					$('.dataPicker').css('display','block')
				})
			document.getElementById("createDiv").innerHTML ='<iframe id="myframe" style="width:400px;height:400px;" src=" ../datePicker/index.html"> <p>Your browser does not support iframes.</p></iframe>'
		}else{
			return false
		}
			

	})
}

$(function(){
	$('.testIframe').click(function(){
		var statisDate = document.getElementById("myframe").contentWindow.document.getElementById('inputTime').innerHTML
		 $('#inputTimee').val(statisDate)
       
	})
	
})

