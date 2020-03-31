
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
		coronaInterval=setInterval(function(){
if(atTop==1){
var xy=coronaPosition[(Math.floor(Math.random() * coronaPosition.length)+1)-1]
			corona.style.marginLeft = xy.x;
corona.style.marginTop = xy.y;
atTop=0;
}
corona.style.marginTop=parseInt(corona.style.marginTop.replace('.px',''))+1;
			console.log(corona.style.marginTop)

		},10)
	}