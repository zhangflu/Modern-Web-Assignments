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
	}
	$('.num').hide();
	enable($('li'));
	unable($('#info-bar'));
	$('.info').html("");
}
var rem = [0, 0, 0, 0, 0];
$(function(){
	$('li').click(function(){
		var my = $(this);
		if(my.hasClass('enable')){
			unable($('li'));
			enable(my);
			var num = my.children().eq(0);
			num.show();
			num.html('...');
			$.get('http://127.0.0.1:3000/', function(result){
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
		}
	});
	$('.apb').mouseleave(init);
	$('.apb').mouseenter(init);
});