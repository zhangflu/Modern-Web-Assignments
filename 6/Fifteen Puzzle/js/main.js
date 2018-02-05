$(document).ready(function() {
    var square_size = 90;
    var boardSize = (square_size * 4);
    var fast_time = 20;
    var slow_time = 200;
    var middle_time = 50;
    var map = new Array;
    var arrx = new Array;
    var arry = new Array
    var emptyX = 3;
    var emptyY = 3;
    var real_count = 0;
    var zi = 1;
    var EmptySquare = 16;
    var pop = -1;
    var busy = false;
    var isnum = false;
    function init(){
        for(var i=0;i<4;i++){
            map[i] = new Array;
            for(var j=0;j<4;j++){
                map[i][j] = i * 4 + j;
            }
        }
        real_count = 0;
        emptyX = 3;
        emptyY = 3;
        pop = -1;
        //isnum = false;
    }
    init();
    function check(){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(map[i][j] != i * 4 + j)
                    return false;
            }
        }
        return true;
    }
    $.fn.extend({ fifteen:
        function() {
            for (var i = 0; i < 16; i++) {
                var newer = document.createElement("div");
                newer.classList.add('square');
                newer.style.left = ((i % 4) * square_size) + "px";
                newer.style.top = Math.floor(i / 4) * square_size + "px";
                newer.style.backgroundPosition = (-(i % 4) * square_size) + "px " + (-Math.floor(i / 4)) * square_size + "px ";
                newer.index = i;
                document.getElementsByClassName('board')[0].appendChild(newer);
            }
            $('.square')[15].classList.add('empty');
            $('.board').children('div').click(function() {
                Move(this, slow_time, false);
            });
            deal_image(false);
        }
    });
    function swap(i, j, x, y) {
        var temp = map[i][j];
        map[i][j] = map[x][y];
        map[x][y] = temp;
    }
    function Move(clicked_square, time, ram) {
        // if(busy)
        //     return;
        var movable = true;
        // Swap x/y between the clicked square and the currently empty square
        var oldx = $('.board').children("div:nth-child(" + EmptySquare + ")").css('left');
        var oldy = $('.board').children("div:nth-child(" + EmptySquare + ")").css('top');

        var newx = $(clicked_square).css('left');
        var newy = $(clicked_square).css('top');
        var nop = -1;
        // The clicked square is north of the empty square
        if (oldx == newx && newy == (parseInt(oldy) - square_size) + 'px'){
            swap(emptyX,emptyY,emptyX-1,emptyY);
            emptyX--;
            nop = 0;
        }
 
        // The clicked square is south of the empty square
        else if (oldx == newx && newy == (parseInt(oldy) + square_size) + 'px'){
            swap(emptyX,emptyY,emptyX+1,emptyY);
            emptyX++;
            nop = 2;
        }
        // The clicked square is west of the empty square
        else if ((parseInt(oldx) - square_size) + 'px' == newx && newy == oldy){
            swap(emptyX,emptyY,emptyX,emptyY-1);
            emptyY--;
            nop = 3;
        }
        // The clicked square is east of the empty square
        else if ((parseInt(oldx) + square_size) + 'px' == newx && newy == oldy){
            swap(emptyX,emptyY,emptyX,emptyY+1);
            emptyY++;
            nop = 1;
        }
        else{
            movable = false;
        }
        if (movable) {
            if(!ram){
                if(nop==0 && pop==2 || nop==1 && pop==3 || nop==2 && pop==0 || nop==3 && pop==1){
                    //pop = ppop;
                    //real_count--;
                }
                else{
                    arrx[real_count] = emptyX;
                    arry[real_count] = emptyY;
                    real_count++;
                }
                //ppop = pop;
                pop = nop;
            }
            $(clicked_square).css('z-index', zi++);
            $(clicked_square).animate({ left: oldx, top: oldy }, time, function() {
                $('.board').children("div:nth-child(" + EmptySquare + ")").css('left', newx);
                $('.board').children("div:nth-child(" + EmptySquare + ")").css('top', newy);
            });
            if(check())
                setTimeout(function(){alert('完成！');init();},time+20);
        }
    }
    $('#game_object').fifteen();
    function ramdomNum(minNum, maxNum){
        return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
    }
    
    $('#reset').click(function(){
        if(busy)
            return;
        busy = true;
        $('.board').children().remove();
        $('#game_object').fifteen();
        busy = true;
        init();
        var ramdom_count = ramdomNum(100,200);
        var tx = emptyX;
        var ty = emptyY;
        while(ramdom_count>0){
            ramdom_count--;
            var op = ramdomNum(0,3);
            while(op==0 && pop==2 || op==1 && pop==3 || op==2 && pop==0 || op==3 && pop==1)
                op = ramdomNum(0,3);
            if(op==0 && tx-1>=0){
                arrx[real_count] = --tx;
                arry[real_count] = ty;
                real_count++;
                pop = op;
            }
            else if(op==1 && ty+1<4){
                arrx[real_count] = tx;
                arry[real_count] = ++ty;
                real_count++;
                pop = op;
            }
            else if(op==2 && tx+1<4){
                arrx[real_count] = ++tx;
                arry[real_count] = ty;
                real_count++;
                pop = op;
            }
            else if(op==3 && ty-1>=0){
                // setTimeout(function(){Move($('.square')[map[emptyX][emptyY-1]], fast_time);},count_time);
                // console.log(op);
                arrx[real_count] = tx;
                arry[real_count] = --ty;
                real_count++;
                pop = op;
                //Move($('.square')[map[emptyX][emptyY-1]], fast_time);
            }
        }
        var t=0;
        for(var i=0;i<real_count;i++){
            setTimeout(function(){Move($('.square')[map[arrx[t]][arry[t++]]], fast_time, true);},2*i*fast_time);
        }
        setTimeout(function(){busy = false;},2*real_count*fast_time);
    })
    $('#auto').click(function(){
        if(busy)
            return;
        busy = true;
        var t=real_count-2;
        for(var i=real_count-2;i>=0;i--){
            setTimeout(function(){Move($('.square')[map[arrx[t]][arry[t--]]], middle_time);},2*i*middle_time);
        }
        setTimeout(function(){Move($('.square')[map[3][3]], middle_time);},2*(real_count-1)*middle_time);
        setTimeout(function(){real_count = 0; busy = false;},2*(real_count)*middle_time);
    })
    $('#numit').click(function(){
        if(!isnum){
            for(var i=0;i<15;i++){
                var display = i+1;
                //document.getElementsByClassName('.square')[i].innerHTML = "" + display;
                $('.square').eq(i).html(display);
            }
            isnum = true;
        }
        else{
            for(var i=0;i<15;i++){
                var display = i+1;
                //document.getElementsByClassName('.square')[i].innerHTML = "" + display;
                $('.square').eq(i).html("");
            }
            isnum=false;
        }
    })
    var image_num = 0;
    $('#change').click(function(){deal_image(true);})
    function deal_image(set){
        if(set)
            image_num = (image_num+1)%3;
        if(image_num == 1){
            $('.board div').css("background-image","url(beauty.jpg)");
        }
        else if(image_num == 2){
            $('.board div').css("background-image","url(cat.jpg)");
        }
        else{
            $('.board div').css("background-image","url(panda.jpg)");
        }
    }
});
    // for(var i=0;i<4;i++){
    //     for(var j=0;j<4;j++){
    //         console.log(map[i][j]);
    //     }
    //     console.log('\n');
    // }
    // console.log(emptyX);
    // console.log(emptyY);
    // for(var i=0;i<count;i++){
    //     console.log(rem[i]);
    // }