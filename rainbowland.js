noStroke();
frameRate(40);
textAlign(CENTER, CENTER);

var s = width/20;

var scroll = 0;
var pos = [s, s];
var oldPos = [s, s];
var velY = 0;
var grav = 9.81;
var speed = s/4;
var j = 8; 
var jumpSpeed = s/j+(5-(20/j));
var jumping = false;
var jumpTimer = 0;

var isp = false;

var fade = 255;
var fadeSpeed = 0;

var stage, menu, game, intro;

var char =[['11111',
            '10001',
            '10101',
            '10001',
            '11111'],
            [[255, 255, 255]]];
            
var levels = [[
'111111111111111111111111111111',
'100000000000000000000000100001',
'111000000000000001111110101101',
'101100000000000001000000100101',
'100110000000010001011111110101',
'111111111111111111000000000101',
'100000000000000001111111111101',
'100000000000000000000000000001',
'101221111112210000000000000001',
'101111000011110002200002200001',
'100000000000011111111111111111',
'100000000000000000000001000001',
'100000022000111111000001011101',
'111111111111111111000000010001',
'100000000000000001000001111101',
'150000000000110001000011000001',
'111110011100000001200111011111',
'100000000000000011111111000001',
'122222222222110000000000011121',
'111111111111111111111111111111'],
['111111111111111111111111111111',
'100001000000000000000000000001',
'111101100000000000000000000001',
'100001000000000000000000000001',
'100001000000111110111111111101',
'101101100000111100100000000001',
'100000000000111001100000000001',
'100000000011110011100220022001',
'100000000111100111101111111111',
'112222211111001111100000000001',
'111111110000011000111000000101',
'111111111110110000011000222101',
'100000000010000020011111111101',
'101111111011111111010000000001',
'101000001000000000010000000001',
'100000001011111111110000000011',
'100000000000000000000000000001',
'150000000000000000000000000001',
'111112220000000002220022222221',
'111111111111111111111111111111'],
['111111111111111111111111111111',
'100000100000000000000000000001',
'111110100000000000000000000001',
'100000100000000000000000011101',
'101111100001100110000001110001',
'100000000000000000000111000001',
'111111111222222222211100000001',
'100000001111111111110000000001',
'101110000000000000000000000001',
'100011000000000000000000000001',
'100001100000000000000000000001',
'100000110022220000220020000111',
'100000011111111111111111111101',
'100000000000000000000000000001',
'100000000000000000000000000001',
'100000000000000000000000000001',
'110000022200000000002220000001',
'100011111111100001111111110001',
'122211111111122221111111110051',
'111111111111111111111111111111'],[
'111111111111111111111111111111',
'100010000000000000000000000001',
'111010000000000000000000000001',
'100010001111122111100000000001',
'100010000000111111110022200001',
'100211000000000000111111111101',
'100110000000000000000000010001',
'100010001100000200000000010011',
'111010000000002120000000010001',
'133311000000001111011101112001',
'111011000003333333333100011001',
'111011122221111111111110010001',
'133333111111000000000100010011',
'110111100000000000000100110001',
'100000000000000000000100010221',
'100000000000003333300110010111',
'100000000000011111110000010001',
'100000000000111111111111111101',
'112221112221150000000000000001',
'111111111111111111111111111111',],
[
'111111111111111111111111111111',
'100000000000000000000010000001',
'110000000000000011111010011101',
'111000222112220010000011010001',
'111111111111111110000010014441',
'100000003333333330000010110001',
'100000000000000000020010010021',
'101111111111221111111111010211',
'100000000001111000000000010111',
'100000000000000000000000110001',
'121222212200000011111111111101',
'111111111111111210000000000001',
'100000000000001110111111111111',
'100000100000000000100000000011',
'102000002000010000150000000011',
'101010001010000000111000011001',
'101212221222222211100000001001',
'101111111111111111100000001101',
'100000000000000000002222200001',
'111111111111111111111111111111'],
['111111111111111111111111111111',
'100000001333333000000000000001',
'111100001101101100000000001001',
'100133331444444133344433301001',
'110144441011110100110110001001',
'100101101333333100000000001001',
'101144441101101122222222221331',
'100133331444444111111111111331',
'110100001011110100000000000001',
'100120000000000101111111111111',
'101111111111111103333333333331',
'103333333333300104444333344441',
'101111101111100104444444444441',
'100000111000101111111111111101',
'100000000000100000000000000001',
'100000000000111111110000011111',
'100000000000000000012220210001',
'100000000000000000011111110001',
'100000000000000000000000000051',
'111111111111111111111111111111']];

var menuLevel = [
'11111111111111111111',
'10000000000000000001',
'10000000000000000001',
'10000000000000011111',
'10000000000000111111',
'10000000000001111111',
'10000000000011111111',
'11111000111111111111',
'11111100000000000001',
'11111110000000000001',
'11111111000000000001',
'11111111111100011111',
'10000000000000111111',
'10000000000001111111',
'10000000000011111111',
'11111000111111111111',
'11111100000000000001',
'11111110000000000001',
'11111111000000000001',
'11111111111111111111'];

var level = -1;
var mapEnds = [0, 0];
var obs = []; 

var keys = [];

var keyPressed = function(){keys[keyCode] = true;};

var keyReleased = function(){keys[keyCode] = false;};

var setObs = function(lvl){
    var t = lvl;
    mapEnds = [0, t[0].length*s-width];
    obs = [];
    var skip = 0;
    for (var y = 0; y<t.length; y++){
        for (var x = 0; x<t[y].length; x++){
            if (t[y][x]!=='0'){
                if (skip||isp){
                    skip--;
                    continue;
                }
                var w = 0;
                while (t[y][x+w]===t[y][x]){
                    w++;
                }
                skip = w-1;
                obs.push([floor(t[y][x]),[x*s,y*s,w*s,s]]);
            }
        }
        skip = 0;
    }
};

var wall = function(x, y, w){
    if (dist(pos[0]+s/2, pos[1]+s/2, x+w/2, y)<w/2+s){
        //vertical collision
        if (pos[0]+s>x+speed&&pos[0]+speed<x+w){
            if (pos[1]+s>y&&pos[1]<y){
                pos[1] = y-s;
                velY = 0;
                jumping = false;
                jumpTimer = 5;
            } else if (pos[1]<y+s&&pos[1]+s/2>y+s){
                pos[1] = y+s;
                velY = 0;
            }
        }
        //horizontal collision
        if (pos[1]+s>y+velY&&pos[1]<y+s-1){
            if (pos[0]+s>x&&pos[0]<x){
                pos[0] = x-s;
            } else if (pos[0]<x+w&&pos[0]+s>x+w){
                pos[0] = x+w;
            }
        }
    }
}; 

var collide = function(x, y, w){
    if (dist(pos[0]+s/2, pos[1]+s/2, x+w/2, y)<w/2+5){
        if (pos[0]+s>x&&pos[0]<x+w&&pos[1]+s>y+abs(velY*2)&&pos[1]<y+s){
            return true;
        }
    }
};

var spikePatch = function(x, y, w){
    var end = x+w;
    while(x<end){
        x+=s;
        triangle(x-s, y+s, x, y+s, x-s/2, y);
    }
    x-=w;
    if (collide(x, y, w)){
        fadeSpeed = -10;
    }
    
};

var block = function(x, y, w){
    rect(x, y, w, s);
    wall(x, y, w, s);
};

var goal = function(x, y, w){
    rect(x, y, w, s);
    if (fade===255&&collide(x, y, w)){
        level++;
        fadeSpeed = -10;
    }
};

var enemy1 = function(x, y, w){
    var enemyX = x+sin(frameCount*120*(1/w))*((w-s)/2)+w/2;
    ellipse(enemyX, y+s/2, s, s);
    if (dist(enemyX, y+s/2, pos[0]+s/2, pos[1]+s/2)<s*0.9){
        fadeSpeed = -10;
    }
};

var enemy2 = function(x, y, w){
    var enemyX = x+sin(frameCount*120*(1/w)+180)*((w-s)/2)+w/2;
    ellipse(enemyX, y+s/2, s, s);
    if (dist(enemyX, y+s/2, pos[0]+s/2, pos[1]+s/2)<s*0.9){
        fadeSpeed = -10;
    }
};

var funcsForObs = [block, spikePatch, enemy1, enemy2, goal];

var rainbowColor = function(i){
    return color(sin(i)*127+127,sin(i+90)*155+130,sin(i+180)*127+127, fade);
};

var doObs = function(){
    for (var i = 0; i < obs.length; i++){
        var ob = obs[i][1];
        var x = ob[0]-scroll;
        if (x+ob[2]>0&&x<width){
            var obT = obs[i][0];
            fill(rainbowColor(ob[1]+obT*135+frameCount*4));
            funcsForObs[obT-1](x, ob[1], ob[2]);
        }
    } 
};

var drawChar = function(){
    fill(255, 255, 255, fade);
    //rect(pos[0], pos[1], s, s);
    var res = s/char[0].length;
    for (var i = 0; i<char[0].length; i++){
        for (var j = 0; j<char[0][i].length; j++){
            var num = round(char[0][i][j]);
            if (num){
                var col = char[1][num-1];
                fill(col[0], col[1], col[2], fade);
                rect(j*res+pos[0], i*res+pos[1], res, res);
            }
        }
    }
};

var moveChar = function(){
    if (keyIsPressed){
        if (keys[RIGHT]&&!keys[LEFT]){
            if (pos[0]+s>width*0.6&&scroll<mapEnds[1]){
                scroll+=speed;
            } else {
                pos[0]+=speed;
            }
        } else if (keys[LEFT]&&!keys[RIGHT]){
            if (pos[0]<width*0.4&&scroll>mapEnds[0]){
                scroll-=speed;
            } else {
                pos[0]-=speed;
            }
        }
        if (keys[UP]&&!jumping){
            velY = -jumpSpeed;
            jumping = true;
        } else if (jumpTimer>0){
            jumpTimer--;
            if (jumpTimer<=0){jumping = true;}
        }
    }
    pos[1]+=velY;
    velY+=grav/30;
};

var doMove = function(){
    fade+=fadeSpeed;
    if (fade<10){
        stage = game;
        setObs(levels[level]);
        scroll = 0;
        pos = [s, s];
        velY = 0;
        jumping = false;
        fadeSpeed = 10;
    } else if (fade>=255){
        fade = 255;
        fadeSpeed = 0;
        moveChar();
    }
};

var menuButton = function(x, y, t, f){
    textSize((s*3)/(t.length*0.6));
    fill(87, 87, 87, fade);
    rect(x, y, s*3, s*2);
    fill(255);
    text(t, x+s*1.5, y+s-2);
    if (collide(x, y+s, s*3)){
        f();
        pos = [s, s];
    }
};

var stats = function(){
    background(0, 0, 0);
    doMove();
    doObs();
    drawChar();
    menuButton(s, s*13, 'Back', function(){stage=menu;});
};

var howTo = function(){
    background(0, 0, 0);
    doMove();
    doObs();
    drawChar();
    menuButton(s, s*13, 'Back', function(){stage=menu;});
};

var credits = function(){
    background(0, 0, 0);
    doMove();
    doObs();
    drawChar();
    menuButton(s, s*13, 'Back', function(){stage=menu;});
};

var menu = function(){
    background(0, 0, 0);
    doMove();
    doObs();
    drawChar();
    menuButton(s*16, s, 'Stats', function(){stage=stats;});
    menuButton(s*16, s*9, 'How to', function(){stage=howTo;});
    menuButton(s*16, s*17, 'Credits', function(){stage=credits;});
    menuButton(s,s*13,'Play!',function(){stage=game;});
};

var intro = function(){
    background(sin(frameCount*5)*20+50);
    var fr = frameCount;
    fade = 255;
    fill(rainbowColor(fr*5));
    var x = width/2;
    var y = height*(3/8);
    switch(round(frameCount/40)){
        case 1:
            pushMatrix();
            translate(x, y);
            rotate(min(fr*10-100, 360));
            textSize(max(300-fr*5, 40));
            text('Mega Rainbow Land.', 0, 0);
            popMatrix();
            break;
        case 2:
            textSize(40);
            x += random(-2, 2);
            y += random(-2, 2);
            text('Mega Rainbow Land.', x, y);
            break;
        case 3:
            textSize(40);
            text('Mega Rainbow Land.',x,y);
            textSize(30);
            fill(255);
            var x = min(fr*10-1000, width*(7/16));
            text('By:', x, height/2);
            text('S'+'wa'+'x97', width-x, height/2);
            break;
        case 4:
            textSize(40);
            text('Mega Rainbow Land.', x, y);
            fill(255);
            textSize(30);
            text('By: S'+'wa'+'x97', width/2, height/2);
            break;
        case 5:
            pushMatrix();
            var x = constrain(pow(frameCount-186,2)/50, 1, s);
            translate(width/2, height*(7/16));
            scale(x);
            textSize(40);
            text('Mega Rainbow Land.', 0, -25);
            fill(255);
            textSize(30);
            text('By: S'+'wa'+'x97', 15, 25);
            popMatrix();
            break;
        case 6:
            fade = 11;
            fadeSpeed = 3;
            stage = menu;
            setObs(menuLevel);
            pos = [s, s*6];
    }
};

var game = function(){
    if (level === -1){
        level = 0;
        setObs(levels[level]);
    }
    background(0, 0, 0);
    doMove();
    doObs();
    drawChar();
};

stage = intro;

//isp = pDet('4971883508858879');

var draw = function() {
    stage();
};
