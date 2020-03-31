
	var stageSrc='insideTrain.jpg'
	var playerSrc='healthyPerson.jpg'
	var coronaSrc='coronaVirus.jpg'

	var stage=document.getElementById('stage')
	stage.src=stageSrc
	var player=document.getElementById('player')
	player.src=playerSrc
	var corona=document.getElementById('corona')
	corona.src=coronaSrc
	var coronaPosition=[]
	coronaPosition[0]=[]
	coronaPosition[1]=[]
	coronaPosition[0].x=0
	coronaPosition[0].y=0
	coronaPosition[1].x=30
	coronaPosition[1].y=30

	var coronaInterval;
	var atTop=1;


	function start(){
		window.addEventListener('mousedown',function(e){
			player.style.marginLeft = e.pageX;
			player.style.marginTop = e.pageY;
			
		})
		window.addEventListener('mouseup',function(e){
			// corona.style.marginTop = false;
			// corona.style.marginLeft = false;
		})
		window.addEventListener('touchstart',function(e){
			player.style.marginLeft = e.pageX;
			player.style.marginTop = e.pageY;
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
if(atTop==1){
var xy=coronaPosition[(Math.floor(Math.random() * coronaPosition.length)+1)-1]
			corona.style.marginLeft = xy.x;
corona.style.marginTop = xy.y;
atTop=0;
}
corona.style.marginTop=parseInt(corona.style.marginTop.replace('.px',''))+1;
			console.log(corona.style.marginTop)

		},50)
	}