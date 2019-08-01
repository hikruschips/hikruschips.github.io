var myGamePiece;
var player2;


function startGame(){
myGameArea.start();
myGamePiece = new component(30,30,'red',10,120);
player2 = new component(30,30,'rgba(0,0,255,1)',10,20);
}


var myGameArea = {
	canvas: document.createElement('canvas'),
	start: function(){
		this.canvas.width=480;
		this.canvas.height=270;
		this.context = this.canvas.getContext('2d');
		console.log(this.canvas,',',document.body.childNodes[0]);
		document.body.insertBefore(this.canvas,document.body.childNodes[0]);
		this.interval = setInterval(updateGameArea,20);
	},
	clear: function(){
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
}

function component(width,height,color,x,y){
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
	ctx.fillStyle = color;
	ctx.fillRect(this.x,this.y,this.width,this.height);
}
}

function moveUp(){

	myGamePiece.speedY = -1;
}
function moveDown(){
	myGamePiece.speedY = 1;
}
function moveLeft(){
	myGamePiece.speedX = -1;
}
function moveRight(){
	myGamePiece.speedX = 1;
}
function stopMove(){
	myGamePiece.speedX = 0;
	myGamePiece.speedY = 0;
}

function updateGameArea(){
	myGameArea.clear();
	
	myGamePiece.newPos();
	myGamePiece.update();
	player2.update();
}

startGame();
