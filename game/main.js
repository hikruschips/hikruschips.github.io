var myGamePiece;
var myRamenPieces = [];
var player2;
var mode;//input method
var myObstacles = [];
var myScore;
var scoreNum;
var myBackground;
var width,height;
var leftBlocks;
var objWidth;
var interval = 150;
//44 11

function startGame(){
	
	height = (window.innerHeight-10)%16==0?(window.innerHeight-10):((window.innerHeight-10)-(window.innerHeight-10)%16);

	width = Math.floor((height*3)/2);

	if(width>window.innerWidth){
		width=(window.innerWidth-10)%16==0?(window.innerWidth-10):((window.innerWidth-10)-(window.innerWidth-10)%16);;
		height = Math.floor((width*2)/3);
	}

	leftBlocks=height/16;
	console.log(leftBlocks);
	objWidth = 16*(leftBlocks/4)/2;

	mode = 'keyboard';
	myGameArea.start();

	myRamenPieces['broth']= new component(objWidth,objWidth,'empty_broth.png',10,120-30+5,'image');
	myRamenPieces['negi']= false;
	myRamenPieces['corn']=false;
	myRamenPieces['moyashi']=false;
	myRamenPieces['chicken']=false;
	myRamenPieces['pork']=false;

	myGamePiece = new component(objWidth,objWidth,'little_guy.png',width/16,120,'image');
	scoreNum = 0;
	myScore = new component(((objWidth/5)*2)+'px','Consolas','white',Math.floor(width/16.5)*15,Math.floor(height/17)*16,'text');
	//810,270
	myBackground = new component(width,height,'background.png',0,0,'background');
}


var myGameArea = {
	canvas: document.createElement('canvas'),
	start: function(){
		
		this.canvas.width=width;
		this.canvas.height=height;
		//this.canvas.style.cursor ='none';//hide cursor
		this.context = this.canvas.getContext('2d');
		console.log(this.canvas,',',document.body.childNodes[0]);
		document.body.insertBefore(this.canvas,document.body.childNodes[0]);
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea,20);//20/1000 miliseconds
		
		window.addEventListener('mousedown',function(e){
			myGameArea.x = e.pageX;
			myGameArea.y = e.pageY;
			console.log(myGameArea.x+', '+myGameArea.y);
		})
		window.addEventListener('mouseup',function(e){
			myGameArea.x = false;
			myGameArea.y = false;
		})
		window.addEventListener('touchstart',function(e){
			myGameArea.x = e.pageX;
			myGameArea.y = e.pageY;
		})
		window.addEventListener('touchend',function(e){
			myGameArea.x = false;
			myGameArea.y = false;
		})
		window.addEventListener('keydown',function(e){
			myGameArea.keys = myGameArea.keys|| [];
			myGameArea.keys[e.keyCode] = true;
			console.log(e.keyCode);
		})
		window.addEventListener('keyup',function(e){
			myGameArea.keys[e.keyCode] = false;
		})

		
	},
	clear: function(){
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);

	},
	stop: function(){
		clearInterval(this.interval);
	}
}

function everyinterval(n){
	if((myGameArea.frameNo/n)%1==0){return true;}
	return false;
}

function component(width,height,color,x,y,type){
	this.type = type;
	if(type=='image'||type=='background'){
		this.image = new Image();
		this.image.src = color;
	}
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.speedX = 0;
	this.speedY = 0;
	this.newPos = function(){

		this.x+=this.speedX;
		this.y+=this.speedY;
	};
	this.update = function(){
		ctx = myGameArea.context;
		if(this.type =='text'){
			ctx.font = this.width+" "+this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text,this.x,this.y);
		}else if(type=='image'||type=='background'){
			ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
		}
		else{
		ctx.fillStyle = color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
		}
	}
	this.clicked = function(){

		var myLeft = this.x;
		var myRight = this.x + this.width;
		
		var myTop = this.y;
		var myBottom = this.y+this.height;

		var clicked = false;
		if((myGameArea.x>=myLeft)&&(myGameArea.x<=myRight)&&(myGameArea.y>=myTop)&&(myGameArea.y<=myBottom)){
			clicked = true;
		}
		return clicked;


	}
	this.crashWith = function(otherObj){
		var myLeft = this.x;
		var myRight = this.x + this.width;
		var myTop = this.y;
		var myBottom = this.y+this.height;

		var otherLeft = otherObj.x;
		var otherRight = otherObj.x+otherObj.width;
		var otherTop = otherObj.y;
		var otherBottom = otherObj.y+otherObj.height;

		var crash = true;
		if((myRight<otherLeft)||
			(myLeft>otherRight)||
			(myBottom<otherTop)||
			(myTop>otherBottom)){
				crash = false;
		}
		return crash;
	}
}

function moveUp(){

	myGamePiece.speedY = -1;
}
function moveDown(){
	myGamePiece.speedY = 1;
}
function moveLeft(){
	//myGamePiece.speedX = -1;
}
function moveRight(){
	//myGamePiece.speedX = 1;
}
function stopMove(){

	myGamePiece.speedX = 0;
	myGamePiece.speedY = 0;
}

function updateGameArea(){

	var x,y;
	for(i=0;i<myObstacles.length;i++){
	if(myGamePiece.crashWith(myObstacles[i])||myRamenPieces['broth'].crashWith(myObstacles[i])){
		
		if(!myObstacles[i].image.src.includes('transparent.png')){scoreNum++;}

		if(myObstacles[i].image.src.includes('poop.png')){myGameArea.stop();return;}
		if(myObstacles[i].image.src.includes('negi_obstacle.png')){myRamenPieces['negi']=new component(objWidth,objWidth,'topping_01_negi.png',10,120-30+5,'image');}
		if(myObstacles[i].image.src.includes('corn_obstacle.png')){myRamenPieces['corn']=new component(objWidth,objWidth,'topping_02_corn.png',10,120-30+5,'image');}
		if(myObstacles[i].image.src.includes('moyashi_obstacle.png')){myRamenPieces['moyashi']=new component(objWidth,objWidth,'topping_03_moyashi.png',10,120-30+5,'image');}
		if(myObstacles[i].image.src.includes('chicken_obstacle.png')){myRamenPieces['chicken']=new component(objWidth,objWidth,'topping_04_chicken.png',10,120-30+5,'image');}
		if(myObstacles[i].image.src.includes('pork_obstacle.png')){myRamenPieces['pork']=new component(objWidth,objWidth,'topping_05_pork.png',10,120-30+5,'image');}
		myObstacles[i].image.src='transparent.png';
		
	}}
	myGameArea.clear();
	myGameArea.frameNo +=1;
	if(myGameArea.frameNo == 1|| everyinterval(interval)){
		x = myGameArea.canvas.width;
		minHeight = height/10;
		maxHeight = (Math.floor(height/10)*9)-myGamePiece.height;
		y = Math.floor(minHeight+Math.random()*(1+maxHeight-minHeight));

		rand = Math.floor(1+(Math.random()*6));

		if(rand==1){myObstacles.push(new component(objWidth,objWidth,'negi_obstacle.png',x,y,'image'));}
		if(rand==2){myObstacles.push(new component(objWidth,objWidth,'corn_obstacle.png',x,y,'image'));}
		if(rand==3){myObstacles.push(new component(objWidth,objWidth,'moyashi_obstacle.png',x,y,'image'));}
		if(rand==4){myObstacles.push(new component(objWidth,objWidth,'chicken_obstacle.png',x,y,'image'));}
		if(rand==5){myObstacles.push(new component(objWidth,objWidth,'pork_obstacle.png',x,y,'image'));}
		if(rand==6){myObstacles.push(new component(objWidth,objWidth,'poop.png',x,y,'image'));}
		//myObstacles.push(new component(30,30,'poop.png',x,y,'image'));
	}

	myBackground.update();
	for(i = 0; i < myObstacles.length;i++){
		myObstacles[i].x -=1;
		myObstacles[i].update();
	}
	myScore.text = '$'+scoreNum+'.00';

	myScore.update();
	keyboardUpdate();
	touchUpdate();
	

	myGamePiece.newPos();

	myGamePiece.update();

	for(var i in myRamenPieces){
		if(myRamenPieces[i]){
		myRamenPieces[i].x = myGamePiece.x;

		myRamenPieces[i].y = myGamePiece.y-myGamePiece.width+(myGamePiece.width/6);
		myRamenPieces[i].update();}
	}

}

var touchUpdate = function(){

	if(myGameArea.y){
		if(myGameArea.y<=myGamePiece.y+(myGamePiece.height/2)){moveUp();}
		else if(myGameArea.y>=myGamePiece.y+(myGamePiece.height/2)){moveDown();}
	}
}
var screenButtonUpdate = function(){
	if(myGameArea.x&&myGameArea.y){
		if(myLeftBtn.clicked()){moveLeft();}
		if(myRightBtn.clicked()){moveRight();}
		if(myUpBtn.clicked()){moveUp();}
		if(myDownBtn.clicked()){moveDown();}
	}
}

var keyboardUpdate = function(){
	var nokey = true;
	if(myGameArea.keys&&myGameArea.keys[38]){moveUp();nokey=false;}
	if(myGameArea.keys&&myGameArea.keys[40]){moveDown();nokey=false;}
	if(myGameArea.keys&&myGameArea.keys[37]){moveLeft();nokey=false;}
	if(myGameArea.keys&&myGameArea.keys[39]){moveRight();nokey=false;}
	if(nokey){stopMove()};
}

startGame();
