$(function(){
        // 设置基础参数1
       var count = 0;
       var flag = 1;
       var len = $(".user-lunbo li").length
       var recycleTime = 3000;
       var startX,endX;
       // move函数
       var autoMove = function(){
        $(".user-lunbo li").eq(count % len).attr("class", "user-active")
        $(".user-lunbo-icons-container .user-lunbo-icons li").eq(count % len).addClass("user-active").siblings().removeClass("user-active")
        if(flag == 1){
            $(".user-lunbo li").eq((count + 1 )% len).attr("class", "user-next")
            $(".user-lunbo li").eq((count - 1 ) % len).attr("class", "user-prev user-move-prev")
        }else if(flag == -1){
            $(".user-lunbo li").eq((count + 1 )% len).attr("class", "user-next user-move-prev")
            $(".user-lunbo li").eq((count - 1 ) % len).attr("class", "user-prev ")
        }
       }
       var autoIcon = function(){
          for(let i = 0;i < len;i++){
            if(i >= count % len){
              $(".user-lunbo-icons-container .user-lunbo-icons .jindu ").eq(i).css("transform", "scaleX(0)")
              // $(".user-lunbo-icons-container .user-lunbo-icons .jindu ").eq(i).removeClass("transform animation")
            }
          }
          console.log(count)
          var oldTime = new Date().getTime()
          var scaleX;
          var iconsTimer = setInterval(function(){
            var nowTime = new Date().getTime()
                scaleX = (nowTime - oldTime)%recycleTime/recycleTime
                $(".user-lunbo-icons-container .user-lunbo-icons .jindu ").eq((count) % len).css("transform", "scaleX("+scaleX+")")
          },16.6)
       }
       // 下循环
       var nextPlay = function(){
        count++;
        flag = 1;
        autoIcon()
        autoMove()
       }
       // 上循环
       var prevPlay = function(){
        count--;
        flag = -1
        autoMove()
       }
       autoIcon()
       var timer = setInterval(function(){
        nextPlay()
       },recycleTime)

    })