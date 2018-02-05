var wayin = [];
var start = false;
var lost = false;
function check_in(){
	for(var i=0;i<9;i++){
		if(wayin[i] == 1){
			return true;
		}
	}
	return false;
}
function check_all_in(){
	for(var i=0;i<9;i++){
		if(wayin[i] == 0){
			return false;
		}
	}
	return true;
}
window.onload = function(){
	var ways = document.getElementsByClassName('way');//for???
	ways[0].onmouseover = function(){
		wayin[0] = 1;
	}
	ways[1].onmouseover = function(){
		wayin[1] = 1;
	}
	ways[2].onmouseover = function(){
		wayin[2] = 1;
	}
	ways[3].onmouseover = function(){
		wayin[3] = 1;
	}
	ways[4].onmouseover = function(){
		wayin[4] = 1;
	}
	ways[5].onmouseover = function(){
		wayin[5] = 1;
	}
	ways[6].onmouseover = function(){
		wayin[6] = 1;
	}
	ways[7].onmouseover = function(){
		wayin[7] = 1;
	}
	ways[8].onmouseover = function(){
		wayin[8] = 1;
	}
	var res = document.getElementsByClassName('res_msg')[0];
	var walls = document.getElementsByClassName('block');
	for(var i=0;i<walls.length;i++){
		walls[i].onmouseover = function(){
			if(start && !lost && check_in() && start){
				this.classList.add('red');
				lost = true;
				res.innerHTML = 'You lost!';
				res.classList.add('appear');
				//setTimeout(function(){res.classList.remove('appear')}, 5000);
			}
		}
	}
	document.getElementById('start').onmouseover = function(){
		if(res.classList.contains('appear')){
			res.classList.remove('appear');
		}
		for(var i=0;i<9;i++){
			wayin[i] = 0;
		}
		start = true;
		res.innerHTML = ' ';
		for(var i=0;i<walls.length;i++){
			walls[i].classList.remove('red');
		}
		lost = false;
	}
	document.getElementById('end').onmouseover = function(){
		// for(var i=0;i<9;i++){
		// 	console.log(wayin[i]);
		// }
		if(!start){
			res.innerHTML = 'Don\'t cheat, you should start from the \'S\' and move to the \'E\' inside the maze!';
			res.classList.add('appear');	
		}
		else if(start && !lost){
			if(check_all_in()){
				res.innerHTML = 'You win!';
				res.classList.add('appear');
				//setTimeout(function(){res.classList.remove('appear')}, 5000);
			}
			else{
				res.innerHTML = 'Don\'t cheat, you should start from the \'S\' and move to the \'E\' inside the maze!';
				res.classList.add('appear');
				//(function(){res.classList.remove('appear')}, 5000);
			}
			lost = true;
		}
	}
}