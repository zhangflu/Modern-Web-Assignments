window.onload = function(){
	(function(){
		var game = document.getElementById('game');
		for(var i=0;i<6;i++){
			for(var j=0;j<10;j++){
				var newer = document.createElement("button");
				newer.index = i*10 + j;
				newer.classList.add('mole');
				game.appendChild(newer);
			}
		}
	})();
	var run_button = document.getElementById('run');
	var msg = document.getElementById('now');
	var time = document.getElementById('time');
	var score = document.getElementById('score');
	msg.innerHTML = '<br>';
	var t = 0;
	var s = 0;
	var start = false;
	var deal = false;
	var stop = false;
	var timer;
	function update(){
		time.innerHTML = t;
		score.innerHTML = s;
		if(t==-1 || stop){
			clearInterval(timer);
			time.innerHTML = 0;
			end();
		}
	}
	var now = parseInt(Math.random() * 60, 10); //!!
	var moles = document.getElementsByClassName('mole');
	function begin(){
		start = true;
		t = 30;
		s = 0;
		update();
		moles[now].classList.add('appear_mole');
		timer = setInterval(function(){t--; update();},1000);
		msg.innerHTML = 'Playing';
	}
	function end(){
		start = false;
		alert("Game Over.\nYour score is: " + s);
		clearInterval(timer);
		t = 30;
		s = 0;
		update();
		moles[now].classList.remove('appear_mole');
		msg.innerHTML = 'Game over';
	}
	run_button.onclick = function(){
		if(!start){
			begin();
		}
		else{
			end();
		}
	}
	document.getElementById('game').onclick = function(event){
		if(start && event.target.classList.contains('mole')){   //!!
			if(start && event.target.index == now){
				event.target.classList.remove('appear_mole');
				event.target.classList.add('hit_mole');
				setTimeout(function(){event.target.classList.remove('hit_mole')},150);
				now = parseInt(Math.random() * 60, 10);
				moles[now].classList.add('appear_mole');
				s++;
			}
			else if(start && event.target.index != now){
				event.target.classList.add('miss_mole');
				setTimeout(function(){event.target.classList.remove('miss_mole')},150);
				s--;
			}
			update();
		}
	}
}