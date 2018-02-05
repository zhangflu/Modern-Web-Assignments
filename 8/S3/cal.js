var rem = [0, 0, 0, 0, 0];
var eve;
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
	function super_click(aim){
		console.log("super!");
		var my = aim;
		if(aim.children().eq(0).html() == " "){
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
	}
	$('#info-bar').click(function(){
		if($('#info-bar').hasClass('enable')){
			var res = 0;
			for(var i = 0; i < 5; i++){
				res += parseInt(rem[i]);
			}
			if(res < 10000)
			$('.info').html(res);
			unable($('#info-bar'));
		}
	});
	$('.apb').mouseenter(init); 
	$('.apb').click(function(){
		for(var i = 0; i < 5; i++){
			super_click($('li').eq(i));
		}
		eve = setInterval(robotclick, 1);
	});
});
function robotclick(){
	$('#info-bar').trigger('click');
}
function init(){
	for(var i = 0; i < 5; i++){
		rem[i] = 0;
		$('li').children().eq(i).html(" ");
	}
	$('.num').hide();
	enable($('li'));
	unable($('#info-bar'));
	$('.info').html("");
	clearInterval(eve);
	for(var i = 0; i < 5; i++){
		if(geter[i] !== undefined)
		geter[i].abort();
	}
}