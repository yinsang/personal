var doms = document.querySelectorAll(".detail-time")
var hours = 0;
var days = 0;
console.error('计算');
for (var i = 0; i < doms.length - 1; i++) {
    if (doms[i].parentElement.parentElement.parentElement.className !== "not-work-day") {
        if (doms[i].innerHTML !== "-") {
            days++;
            var str = doms[i].innerHTML;
            var startHour = str.split("-")[0].split(":")[0];
            var startMin = str.split("-")[0].split(":")[1];
            var endHour = str.split("-")[1].split(":")[0] - 1;
            var endMin = Number(str.split("-")[1].split(":")[1])+60;
            hours += (endHour - startHour + (endMin - startMin)/60)
        }
    }
}
console.log("仅计算工作日工时（已删除旷工）：" +hours/days);
