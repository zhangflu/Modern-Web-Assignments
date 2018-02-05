var rem = [0, 0, 0, 0, 0];
var eve;
var order = [-1, -1, -1, -1, -1];
var ind = 0;
var dealing = false;
var geter = [];
$.ajaxSetup({cache:false});
function enable(aim){
	aim.removeClass('unable');
	aim.addClass('enable');
}
function unable(aim){
	aim.removeClass('enable');
	aim.addClass('unable');
}
function init(){
	for(var i = 0; i < 5; i++){
		rem[i] = 0;
		order[i] = -1;
		ind = 0;
	}
	$('.num').hide();
	enable($('li'));
	unable($('#info-bar'));
	$('.info').html("");
	clearInterval(eve);
	$('.order').html("");
	dealing = false;
	for(var i = 0; i < 5; i++){
		if(geter[i] !== undefined)
		geter[i].abort();
	}
}
$(function(){
	$('li').click(function(){
		var my = $(this);
		if(my.hasClass('enable')){
			unable($('li'));
			enable(my);
			var num = my.children().eq(0);
			num.show();
			num.html('...');
			rem[my.index()] = 10000;
			geter[my.index()] = $.get('http://127.0.0.1:3000/', function(result){
				num.html(result);
				for(var i = 0; i < 5; i++){
					if(rem[i] == 0){
						enable($('li').eq(i));
					}
				}
				unable(my);
				rem[my.index()] = result;
				for(var i = 0; i < 5; i++){
					if(rem[i] == 0)
					return;
				}
				enable($('#info-bar'));
			});
		}
	});
	$('#info-bar').click(function(){
		if($('#info-bar').hasClass('enable')){
			var res = 0;
			for(var i = 0; i < 5; i++){
				res += parseInt(rem[i]);
			}
			$('.info').html(res);
			unable($('#info-bar'));
			dealing = false;
			clearInterval(eve);
		}
	});
	$('.apb').mouseenter(init); 
	$('.apb').click(function(){
		if(dealing)
		return;
		init();
		dealing = true;
		var now = 0;
		while(now != 5){
			var ram = parseInt(Math.random() * 5);
			var ok = true;
			for( var i = 0; i < 5; i++){
				if(order[i] == ram){
					ok = false;
					break;
				}
			}
			if(ok){
				order[now] = ram;
				now++;
			}
		}
		for(var i = 0; i< 5; i++){
			var char;
			if(order[i] == 0){
				char = 'A';
			}
			else if(order[i] == 1){
				char = 'B';
			}
			else if(order[i] == 2){
				char = 'C';
			}
			else if(order[i] == 3){
				char = 'D';
			}
			else if(order[i] == 4){
				char = 'E';
			}
			$('.order').html($('.order').html() + " " + char);
		}
		eve = setInterval(robotclick, 1);
	});
});
function robotclick(){
	if(ind == 5){
		$('#info-bar').trigger('click');
		return;
	}
	if(rem[order[ind]] == 0){
		$('li').eq(order[ind]).trigger('click');
	}
	else{
		ind++;
	}
}
