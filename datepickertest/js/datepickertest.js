function insertFunction(x){
		var inputTime=document.getElementById(x)
		var createDiv=document.createElement('div')
		var $createDiv=$(createDiv)
		createDiv.id='createDiv'
		$(function(){
			$createDiv.insertAfter(inputTime)
		})

		document.getElementById("createDiv").innerHTML ='<iframe id="myframe" scrolling="no"  style="width:400px;height:340px;" src="datapicker/datapicker.html"> <p>Your browser does not support iframes.</p></iframe>'
	}
