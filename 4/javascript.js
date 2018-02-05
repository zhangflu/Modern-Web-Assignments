function del(){
	var data = document.getElementById("text");
	data.value = data.value.slice(0,-1);
	if(data.value == ""){
		data.value = "0";
	}
	scale(2);
}
var front = true;
var zero = false;
function show(){
	var data = this.value;
	var text = document.getElementById("text");
	if(text.value == "0"  && data != "." && data != "+" && data != "-" && data != "*" && data != "/"){
		text.value = data;
	}
	else if((data == "+" ||  data == "-" || data == "*" || data == "/" || data == "0")&& text.value == "0");
	else{
		if(data == "+" ||  data == "-" || data == "*" || data == "/"){
			front = true;
			zero = false;
			text.value += data;
		}
		else{
			if(zero == true){
				if(data == "0");
				else{
					if(data!=".")
						del();
					text.value += data;
					zero = false;
				}
			}
			else{
				if(data == "0"){
					text.value += data;
					zero = true;
				}
				else{
					text.value += data;
					zero = false;
				}
			}
		}
	}
	scale(1);
	scale(2);
}
/*
function tshow(data){
	var text = document.getElementById("text");
	if(text.value == "0"  && data != "." && data != "+" && data != "-" && data != "*" && data != "/"){
		text.value = data;
	}
	else if((data == "+" ||  data == "-" || data == "*" || data == "/" || data == "." || data == "0")&& text.value == "0");
	else{
		text.value += data;
	}
	scale(1);
	scale(2);
}
*/
function getResult(){
	var data = document.getElementById("text");
	try{
		data.value = eval(data.value);
	}catch(err){
		alert("Error input!");
		data.value = "0";
	}
	scale(1);
}
function clear(){
	var data = document.getElementById("text");
	data.value = "0";
	scale(2);
}
function scale(op){
	var css = document.getElementById("text");
	var text = css.value;
	var len = 18;
	if(op == 1){
		if(text.length > 29){
			alert("Too many digits!");
		}
		if(text.length>len)
			css.style.fontSize = "16px";
	}
	else if(op == 2)
		if(text.length<=len)
			css.style.fontSize = "26px";
}
/*
function whichButton(event)
{
	//alert(event.keyCode);
	if(event.keyCode == 48)
		tshow("0");
	if(event.keyCode == 49)
		tshow("1");
	if(event.keyCode == 50)
		tshow("2");
	if(event.keyCode == 51)
		tshow("3");
	if(event.keyCode == 52)
		tshow("4");
	if(event.keyCode == 53)
		tshow("5");
	if(event.keyCode == 54)
		tshow("6");
	if(event.keyCode == 55)
		tshow("7");
	if(!event.shiftKey && event.keyCode == 56)
		tshow("8");
	if(event.keyCode == 57)
		tshow("9");
	if(event.shiftKey && event.keyCode == 187)
		tshow("+");
	if(event.keyCode == 189)
		tshow("-");
	if(event.shiftKey && event.keyCode == 56)
		tshow("*");
	if(event.keyCode == 191)
		tshow("/");
	if(!event.shiftKey && event.keyCode == 187)
		getResult();
	if(event.keyCode == 13 || event.keyCode == 32)
		getResult();
	if(event.keyCode == 8)
		del();
	if(event.keyCode == 46)
		clear();
}
*/
window.onload = function pageLoad(){
	alert("已将互评中提出的问题进行优化，除了基本功能实现，增加了eval()进制问题处理，键盘输入，长结果字体缩小，过长结果提示功能");
	
	document.getElementById("7").onclick = show;
	document.getElementById("8").onclick = show;
	document.getElementById("9").onclick = show;
	document.getElementById("4").onclick = show;
	document.getElementById("5").onclick = show;
	document.getElementById("6").onclick = show;
	document.getElementById("1").onclick = show;
	document.getElementById("2").onclick = show;
	document.getElementById("3").onclick = show;
	document.getElementById("0").onclick = show;
	document.getElementById("+").onclick = show;
	document.getElementById("-").onclick = show;
	document.getElementById("*").onclick = show;
	document.getElementById("/").onclick = show;
	document.getElementById(".").onclick = show;
	document.getElementById("(").onclick = show;
	document.getElementById(")").onclick = show;
	document.getElementById("=").onclick = getResult;
	document.getElementById("CE").onclick = clear;
	document.getElementById("del").onclick = del;
	
	onkeydown = function () {
	    var key = window.event ? event.keyCode : event.which;
	    if (key == 8 )
	        document.getElementById("del").click();
	    else if (key == 46)
	        document.getElementById("CE").click();
	    else if (key == 187 || key == 13)
	        document.getElementById("=").click();
	}
	
	onkeypress = function () {
	    var keychar = String.fromCharCode(window.event ? event.keyCode : event.which);
	    if (keychar >= '0' && keychar <= '9' || keychar == '/' || keychar == '*' || keychar == '-' || keychar == '+' || keychar == '.' || keychar == '(' || keychar == ')')
	        document.getElementById(keychar).click();
	}
	var buttonArray = document.getElementsByName("button");
	for (var i = 0; i < buttonArray.length; ++i) {
	    buttonArray[i].addEventListener("click", function () {
	        this.classList.add("button_active");
	        var t = this;
	        setTimeout(function () { t.classList.remove("button_active"); }, 50);
	    });
	}
	var buttonArray = document.getElementsByName("button_s");
	for (var i = 0; i < buttonArray.length; ++i) {
	    buttonArray[i].addEventListener("click", function () {
	        this.classList.add("button_s_active");
	        var t = this;
	        setTimeout(function () { t.classList.remove("button_s_active"); }, 50);
	    });
	}
}