
	var stageSrc='insideTrain.jpg'
	var playerSrc='healthyPerson.jpg'
	var coronaSrc='coronaVirus.jpg'
	var happyGirlSrc='happyGirlThumbsUp.jpg'
	var candySrc='starbucks.jpg'

	var stage=document.getElementById('stage')
	stage.src=stageSrc
	var player=document.getElementById('player')
	player.src=playerSrc
	var corona=document.getElementById('corona')
	corona.src=coronaSrc
	var candy=document.getElementById('candy')
	candy.src=candySrc
	var coronaPosition=[]
	coronaPosition[0]=[]
	coronaPosition[1]=[]
	coronaPosition[0].x=0
	coronaPosition[0].y=0
	coronaPosition[1].x=30
	coronaPosition[1].y=30

	var coronaInterval;
	var coronaAtTop=1;
	var candyAtTop=1;


	function start(){
		window.addEventListener('mousedown',function(e){

x=getRandom(window.screen.width)-30
y=getRandom(window.screen.height)-30
			player.style.marginLeft = x
player.style.marginTop = y
// coronaAtTop=0;
			// console.log(e.pageX)
			// console.log(player.style.marginLeft)
			// console.log(player.style.marginTop)
			// console.log(parseInt(player.style.marginLeft.replace('.px','')))
			// console.log(parseInt(player.style.marginTop.replace('.px','')))
			// if(parseInt(player.style.marginLeft.replace('.px',''))>=e.pageX){
			// 	console.log(1)
			// 	player.style.marginLeft=parseInt(player.style.marginLeft.replace('.px',''))+20;
			// }
			// if(parseInt(player.style.marginLeft.replace('.px',''))<e.pageX){
			// 	console.log(2)
			// 	player.style.marginLeft=parseInt(player.style.marginLeft.replace('.px',''))-20;
			// }
			// if(parseInt(player.style.marginTop.replace('.px',''))>=e.pageY){
			// 	console.log(3)
			// 	player.style.marginTop=parseInt(player.style.marginTop.replace('.px',''))+20;
			// }
			// if(parseInt(player.style.marginTop.replace('.px',''))<e.pageY){
			// 	console.log(4)
			// 	player.style.marginTop=parseInt(player.style.marginTop.replace('.px',''))-20;
			// }
			// // player.style.marginLeft = e.pageX;
			// // player.style.marginTop = e.pageY;
			
		})
		window.addEventListener('mouseup',function(e){
			// corona.style.marginTop = false;
			// corona.style.marginLeft = false;
		})
		window.addEventListener('touchstart',function(e){

x=getRandom(window.screen.width)-30
y=getRandom(window.screen.height)-30
			player.style.marginLeft = x
player.style.marginTop = y
			// if(parseInt(player.style.marginLeft.replace('.px',''))>=e.pageX){
			// 	player.style.marginLeft=parseInt(player.style.marginLeft.replace('.px',''))+20;
			// }
			// if(parseInt(player.style.marginLeft.replace('.px',''))<e.pageX){
			// 	player.style.marginLeft=parseInt(player.style.marginLeft.replace('.px',''))-20;
			// }
			// if(parseInt(player.style.marginTop.replace('.px',''))>=e.pageY){
			// 	player.style.marginTop=parseInt(player.style.marginTop.replace('.px',''))+20;
			// }
			// if(parseInt(player.style.marginTop.replace('.px',''))<e.pageY){
			// 	player.style.marginTop=parseInt(player.style.marginTop.replace('.px',''))-20;
			// }
		})
		window.addEventListener('touchend',function(e){
			// corona.style.marginTop.x = false;
			// myGameArea.y = false;
		})

// 		touchInterval=setInterval(function(){

// 			if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
//         var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
//         x = touch.pageX;
//         y = touch.pageY;
//     } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
//         x = e.clientX;
//         y = e.clientY;
//     }
// },10)
		coronaInterval=setInterval(function(){
			console.log(player.style.marginLeft)
			console.log(player.style.marginTop)
if(coronaAtTop==1){
// var xy=coronaPosition[(Math.floor(Math.random() * coronaPosition.length)+1)-30]

// var x=
x=getRandom(window.screen.width)-30
y=getRandom(window.screen.height)-30
			corona.style.marginLeft = x
corona.style.marginTop = y
coronaAtTop=0;
}

if(candyAtTop==1){
// var xy=coronaPosition[(Math.floor(Math.random() * coronaPosition.length)+1)-30]

// var x=
x=getRandom(window.screen.width)-30
y=getRandom(window.screen.height)-30
			candy.style.marginLeft = x
candy.style.marginTop = y
candyAtTop=0;
}

if(getRandom(10)==9){//1/10 chance? whatever
	corona.style.marginTop=parseInt(getRandom()-30)
}
if(getRandom(10)==9){//1/10 chance? whatever
	candy.style.marginTop=parseInt(getRandom()-30)
}

if(corona.style.marginTop-30>screen.height){
	coronaAtTop=1;

}
if(candy.style.marginTop-30>screen.height){
	candyAtTop=1;
}

if(collisionEntity(corona,player)){
	console.log(collision)
	player.src=happyGirlSrc
}
corona.style.marginTop=parseInt(corona.style.marginTop.replace('.px',''))+1;
			//console.log(corona.style.marginTop)
			candy.style.marginTop=parseInt(corona.style.marginTop.replace('.px',''))+1;
			//console.log(corona.style.marginTop)

		},50)
	}

function collisionEntity(en1,en2){
		return collision(en1.style.marginLeft,en1.style.marginTop,en2.style.marginLeft,en2.style.marginTop)
	}
	function collision(x1,y1,x2,y2){
		
		return(Math.abs(x1-x2)<30&&Math.abs(y1-y2)<30)
	}

	function getRandom(max){
return Math.floor(Math.random() * max)+1
	}