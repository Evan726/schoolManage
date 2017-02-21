export function formatDate(date, ft) {
	var paddNum = function(num) {
			num += "";
			return num.replace(/^(\d)$/, "0$1");
		}
		//指定格式字符
	var cfg = {
		yyyy: date.getFullYear(), //年 : 4位
		yy: date.getFullYear().toString().substring(2), //年 : 2位
		M: date.getMonth() + 1, //月 : 如果1位的时候不补0
		MM: paddNum(date.getMonth() + 1), //月 : 如果1位的时候补0
		d: date.getDate(), //日 : 如果1位的时候不补0
		dd: paddNum(date.getDate()), //日 : 如果1位的时候补0
		hh: date.getHours() < 10 ? "0" + date.getHours() : date.getHours(), //时
		mm: date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(), //分
		ss: date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds() //秒
	}

	ft || (ft = "yyyy-MM-dd hh:mm:ss");
	return ft.replace(/([a-z])(\1)*/ig, function(m) {
		return cfg[m];
	});
}
export function getWeek(date) {
	var a = new Array("日", "一", "二", "三", "四", "五", "六");
	var week = new Date(date).getDay();
	var str = "星期" + a[week];
	return str
}