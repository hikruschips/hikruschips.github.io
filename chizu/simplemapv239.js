var map;
var markers = [];
var geocoder;
var bounds;
var addresses = [];
var contents = [];
var names = [];
var directionsRenderer;
var citiesString;
var inchargesString;
var branchString;
var dbranchString;

var lastinfowindow;
var lastmarker;
/*chart color*/
var color1='#EE6055';
var color2='#70C1B3';/*'#60D394';*/
var color3='#FFD97D';
var color4='#3DA5D9';
var color5='#B47EB3';

/*marker color*/
var scolor='#FE5F55';
var  acolor='#EF767A';
var  bcolor='#F59CA9';
var  ccolor='#809BCE';
var  dcolor='#7161EF';
var norankcolor ='#FFE347';
var branchcolor ='#0EAD69';

var hospitalIcon='map-icon-health';
var hospital2Icon='map-icon-doctor';
var rouIcon='map-icon-wheelchair';
var jyuIcon='map-icon-school';
var otherIcon='map-icon-horse-riding';
var branchIcon='map-icon-embassy';
var mendansyaString;
var introducerString;

var alertCount = 0;
var totalPositions =0;

var markerCluster;



function initMap(){

	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = "https://cdn.jsdelivr.net/npm/map-icons@3.0.3/dist/js/map-icons.min.js";


	$("head").append(s);



	

	var japan = {lat: 36.2048,
		lng: 138.2529
	};
	geocoder = new google.maps.Geocoder();
	directionsRenderer = new google.maps.DirectionsRenderer();

	bounds = new google.maps.LatLngBounds();
	
	map = new google.maps.Map(document.getElementById('map'),{
		center:japan,
		zoom:5,
		mapTypeControl:false,
		fullscreenControl: false,


	});


	var input = document.getElementById('destinationAddress');
	var searchBox = new google.maps.places.SearchBox(input);


	Chart.pluginService.register({
		beforeRender: function (chart) {
			if (chart.config.options.showAllTooltips) {

				chart.pluginTooltips = [];
				chart.config.data.datasets.forEach(function (dataset, i) {

					chart.getDatasetMeta(i).data.forEach(function (sector, j) {
						chart.pluginTooltips.push(new Chart.Tooltip({
							_chart: chart.chart,
							_chartInstance: chart,
							_data: chart.data,
							_options: chart.options.tooltips,
							_active: [sector]
						}, chart));
					});
				});


				chart.options.tooltips.enabled = false;
			}
		},
		afterDraw: function (chart, easing) {
			if (chart.config.options.showAllTooltips) {

				if (!chart.allTooltipsOnce) {
					if (easing !== 1)
						return;
					chart.allTooltipsOnce = true;
				}


				chart.options.tooltips.enabled = true;
				Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
					tooltip.initialize();
					tooltip.update();

					tooltip.pivot();
					tooltip.transition(easing).draw();
				});
				chart.options.tooltips.enabled = false;
			}
		}
	})

}



function addMarker(address,location,category,rank){
	
	/*console.log('marker rank:'+rank+' category:'+category);
 * 	console.log('<span class="map-icon '+(category=='病院'?hospitalIcon:category=='老人保健施設'?rouIcon:category=='居宅介護支援事業所'?jyuIcon:category=='その他'?otherIcon:category=='拠点'?branchIcon:branchIcon)+'"></span>');
 * 		*//*
	var marker = new google.maps.Marker({
		position:location,
		map:map
	});*/
	var marker = new Marker({
		map:map,
		position:location,
		icon:{
			path: MAP_PIN,
			fillColor: rank=='S'?scolor:rank=='A'?acolor:rank=='B'?bcolor:rank=='C'?ccolor:rank=='D'?dcolor:category=='拠点'?branchcolor:norankcolor,
			fillOpacity: 1,
			strokeColor: '',
			strokeWeight: 0,
			scaledSize: new google.maps.Size(50,50),

		},
		map_icon_label: '<span class="map-icon '+(category=='病院'?hospitalIcon:category=='老人保健施設'?rouIcon:category=='居宅介護支援事業所'?jyuIcon:category=='その他'?otherIcon:category=='拠点'?branchIcon:branchIcon)+'"></span>'
	})
	markers[address]=marker;


	/*markers.push(marker);*/
}

function setMapOnAll(map) {

	for(var key in markers){
		markers[key].setMap(map);
	} 
        /*for (var i = 0; i < markers.length; i++) {
 *           markers[i].setMap(map);
 *                 }*/
  }

  function clearMarkers() {
  	setMapOnAll(null);
  }

  function deleteMarkers() {
  	clearMarkers();
  	markers = [];
  }



  $(document).ready(function(){
  	$('#hospitalMarker').change(function(){
  		doAfterLocationChange();
  	})
  	$('#rouMarker').change(function(){
  		doAfterLocationChange();
  	})
  	$('#jyuMarker').change(function(){
  		doAfterLocationChange();
  	})
  	$('#otherMarker').change(function(){
  		doAfterLocationChange();
  	})

  	$('#hospitalMarkerS').change(function(){
  		doAfterLocationChange();
  	})
  	$('#rouMarkerS').change(function(){
  		doAfterLocationChange();
  	})
  	$('#jyuMarkerS').change(function(){
  		doAfterLocationChange();
  	})
  	$('#otherMarkerS').change(function(){
  		doAfterLocationChange();
  	})

  	$('#hospitalMarkerA').change(function(){
  		doAfterLocationChange();
  	})
  	$('#rouMarkerA').change(function(){
  		doAfterLocationChange();
  	})
  	$('#jyuMarkerA').change(function(){
  		doAfterLocationChange();
  	})
  	$('#otherMarkerA').change(function(){
  		doAfterLocationChange();
  	})

  	$('#hospitalMarkerB').change(function(){
  		doAfterLocationChange();
  	})
  	$('#rouMarkerB').change(function(){
  		doAfterLocationChange();
  	})
  	$('#jyuMarkerB').change(function(){
  		doAfterLocationChange();
  	})
  	$('#otherMarkerB').change(function(){
  		doAfterLocationChange();
  	})

  	$('#hospitalMarkerC').change(function(){
  		doAfterLocationChange();
  	})
  	$('#rouMarkerC').change(function(){
  		doAfterLocationChange();
  	})
  	$('#jyuMarkerC').change(function(){
  		doAfterLocationChange();
  	})
  	$('#otherMarkerC').change(function(){
  		doAfterLocationChange();
  	})

  	$('#hospitalMarkerD').change(function(){
  		doAfterLocationChange();
  	})
  	$('#rouMarkerD').change(function(){
  		doAfterLocationChange();
  	})
  	$('#jyuMarkerD').change(function(){
  		doAfterLocationChange();
  	})
  	$('#otherMarkerD').change(function(){
  		doAfterLocationChange();
  	})
  })

  function doAfterLocationChange(mainCallback){
  	console.log("doAfterLocationChange");
  	bounds = new google.maps.LatLngBounds();

  	addressLatLng($("#prefectures option:selected").text(),false,false);


  	deleteMarkers();

  	addresses = [];
  	names = [];
  	contents = [];
  	lastinfowindow = null;




  	$.ajax({
  		url:'getDestinationName.php',
  		dataType:'json',
  		type:'POST',
  		data:{
  			city:$('#cities option:selected').val(),
  			prefecture: $("#prefectures option:selected").val(),
  			hospital: $("#hospitalMarker").prop('checked')?"病院":"病院だめ",
  			rou: $("#rouMarker").prop('checked')?"老人保健施設":"老人保健施設だめ",
  			jyu: $("#jyuMarker").prop('checked')?"居宅介護支援事業所":"居宅介護支援事業所だめ",
  			other: $("#otherMarker").prop('checked')?"その他":"その他だめ",

  			hospitalS:$('#hospitalMarkerS').prop('checked')?"S":"Sだめ",
  			rouS:$('#rouMarkerS').prop('checked')?"S":"Sだめ",
  			jyuS:$('#jyuMarkerS').prop('checked')?"S":"Sだめ",
  			otherS:$('#otherMarkerS').prop('checked')?"S":"Sだめ",

  			hospitalA:$('#hospitalMarkerA').prop('checked')?"A":"Aだめ",
  			rouA:$('#rouMarkerA').prop('checked')?"A":"Aだめ",
  			jyuA:$('#jyuMarkerA').prop('checked')?"A":"Aだめ",
  			otherA:$('#otherMarkerA').prop('checked')?"A":"Aだめ",

  			hospitalB:$('#hospitalMarkerB').prop('checked')?"B":"Bだめ",
  			rouB:$('#rouMarkerB').prop('checked')?"B":"Bだめ",
  			jyuB:$('#jyuMarkerB').prop('checked')?"B":"Bだめ",
  			otherB:$('#otherMarkerB').prop('checked')?"B":"Bだめ",

  			hospitalC:$('#hospitalMarkerC').prop('checked')?"C":"Cだめ",
  			rouC:$('#rouMarkerC').prop('checked')?"C":"Cだめ",
  			jyuC:$('#jyuMarkerC').prop('checked')?"C":"Cだめ",
  			otherC:$('#otherMarkerC').prop('checked')?"C":"Cだめ",

  			hospitalD:$('#hospitalMarkerD').prop('checked')?"D":"Dだめ",
  			rouD:$('#rouMarkerD').prop('checked')?"D":"Dだめ",
  			jyuD:$('#jyuMarkerD').prop('checked')?"D":"Dだめ",
  			otherD:$('#otherMarkerD').prop('checked')?"D":"Dだめ",

  		},
  		success:function(data){


  			function firstSuccessForMarker(callback){



  				var optionsAsString = "";

  				function currentPositionFunction1(callback1){


  					putCurrentAddress(function(currentAddress){

  						addresses['現在地']="現在地";
  						/*optionsAsString += "<option value='"+"現在地"+"'>現在地</option>";*/



  						if(callback1){

  							callback1();
  						}
  					});


  				}
  				async function currentPositionFunction2(callback2){
  					optionsAsString = "";
  					var optgroupString = "";
  					var optcount=0;

  					var categories = [];

  					$.each(data,function(i,edata){
  						if(!categories.includes(edata['category'])){
  							categories.push(edata['category']);

  						}
  					})

  					alert(categories.length);

  					$.each(categories,function(i,category){
  						optionsAsString+='<optgroup label=\''+category+'\'>';

  						$.each(data,function(i,edata){
  							if(edata['category']==category){
  								optionsAsString+='<option value=\''+edata['address']+'\'>'+edata['name']+'</option>';
  								addresses[edata['name']] = edata['address'];
  							}
  						})

  						optionsAsString+='</optgroup>';
  					})

  					/*optionsAsString creation*/
  					

  					$("#name").empty().append("<option value='"+"現在地"+"'>現在地</option>"+optionsAsString);
  					$("#nameSelect").empty().append("<option value='"+"現在地"+"'>現在地</option>"+optionsAsString);
  					$("#from").empty().append("<option value='"+"現在地"+"'>現在地</option>");
  					$("#to").empty().append(optionsAsString);
  					$("#waypoints").empty().append(optionsAsString);

  					var fromCache=localStorage['fromKey']||'defaultValue';

  					if(fromCache!='defaultValue'){
  						$("#from").val(fromCache);
  					}
  					var toCache=localStorage['toKey']||'defaultValue';
  					if(toCache!='defaultValue'){
  						$("#to").val(toCache);
  					}
  					var waypointsCache=localStorage['waypointsKey']||'defaultValue';
  					if(waypointsCache!='defaultValue'){
  						$("#waypoints").val(JSON.parse(waypointsCache));
  					}
  					/*optionsAsString end*/
/*
 * 					for(const edata of data){
 *
 * 											var addOpt = 0;
 * 																	if(optgroupString!=edata['category']){
 * 																								optgroupString=edata['category'];
 * 																															addOpt=1;
 *
 * 																																						if(optcount>0){
 * 																																														optionsAsString+="</optgroup>";
 * 																																																					}
 *
 * 																																																												optionsAsString+="<optgroup label='"+optgroupString+"'>";
 * 																																																																			optcount+=1;
 * 																																																																									}
 *
 *
 *
 * 																																																																															
 * 																																																																																					optionsAsString += "<option value='" + edata['address'] + "'>" + edata['name'] + "</option>";
 *
 * 																																																																																											
 *
 * 																																																																																																	addresses[edata['name']] = edata['address'];
 * 																																																																																																							names.push(edata['name']);
 * 																																																																																																													
 * 																																																																																																																			
 *
 * 																																																																																																																								}*/
					console.log("will start markers in callback");
					mendansyaString =[];
					introducerString = [];
					/*markers put in callback*/
					positionCount=0;
					totalPositions=data.length;
					/*console.log("total positions:"+data.length);*/
					$.each(data,function(i,edata){
						/*$.ajax({
 * 							url:'getMendansya.php',
 * 														dataType:'json',
 * 																					type:'POST',
 * 																												data:{
 * 																																				name:edata['name'],
 *
 * 																																											},
 * 																																																		success:function(data){
 * 																																																										mendansyaString[edata['name']] = "<option value='%%'disabled selected>面談者フィルター</option><option value='%%%%'>全面談者</option>";
 * 																																																																		for(var i=0;i<data.length;i++){
 * 																																																																											mendansyaString[edata['name']]+="<option value='"+data[i]['mendansya']+"'>"+data[i]['mendansya']+"</option>";
 * 																																																																																			}
 * 																																																																																										},complete:function(data){
 *
 *
 *
 * 																																																																																																	}
 * 																																																																																																							})
 *
 *
 *
 *
 * 																																																																																																													$.ajax({
 * 																																																																																																																				url:'getIntroducerString.php',
 * 																																																																																																																											dataType:'json',
 * 																																																																																																																																		type:'POST',
 * 																																																																																																																																									data:{
 * 																																																																																																																																																	name:edata['name'],
 *
 * 																																																																																																																																																								},
 * 																																																																																																																																																															success:function(data){
 * 																																																																																																																																																																							introducerString[edata['name']] = "<option value='%%'disabled selected>紹介者フィルター</option><option value='%%%%'>全紹介者</option>";
 * 																																																																																																																																																																															for(var i=0;i<data.length;i++){
 * 																																																																																																																																																																																								introducerString[edata['name']]+="<option value='"+data[i]['introducer']+"'>"+data[i]['introducer']+"</option>";
 * 																																																																																																																																																																																																}
 * 																																																																																																																																																																																																							},complete:function(data){
 *
 *
 *
 * 																																																																																																																																																																																																														}
 * 																																																																																																																																																																																																																				})*/





						
						addressLatLng(edata['address'],true,true,edata['category'],edata['rank'],function(i,edata){
							return function(){
								
								var item=edata['name'];

								$.ajax({
									url:'getInfoWindowContents.php',
									dataType:'json',
									type:'POST',
									data:{
										name:item,
										mendansya:'%%',
									},
									success:function(data){



										var j;
										contents[item]="";
										for(j = 0; j < data.length;j++){
											contents[item]+=(
												"<br>"+"<b>"+(j+1)+"</b>"+":"+
												"<br>"+"担当者："+data[j]['incharge']+
												"<br>"+"日時："+data[j]['date']+
												"<br>"+"内容："+data[j]['content']+
												"<br>"+"面談者："+data[j]['mendansya']+

												"<br>"+"<button class='form-control' id='"+item+(j+1)+"deleteInsert'>削除</button>");
										}




										/*var infowindow = null;
 * 										infowindow = new google.maps.InfoWindow({
 * 																					content:"holding...",
 * 																																maxWidth:284
 * 																																										});
 * 																																																				lastinfowindow = infowindow;*/

										var k = i;

										var marker = markers[edata['address']];

										var markerFlag=0;
										var infowindow = null;

										infowindow = new google.maps.InfoWindow({
											content:"holding...",
											maxWidth:284
										});
										lastinfowindow = infowindow;



										try{
											google.maps.event.addListener(marker,'click',(function(marker,item,infowindow,map,edata){

												return function(){

													google.maps.event.clearListeners(infowindow, 'domready');

													/*kaka*/

													$.ajax({
														url:'getMendansya.php',
														dataType:'json',
														type:'POST',
														data:{
															name:edata['name'],

														},
														success:function(data){
															mendansyaString[edata['name']] = "<option value='%%'disabled selected>面談者フィルター</option><option value='%%%%'>全面談者</option>";
															for(var i=0;i<data.length;i++){
																mendansyaString[edata['name']]+="<option value='"+data[i]['mendansya']+"'>"+data[i]['mendansya']+"</option>";
															}
														},complete:function(data){



														}
													})




													$.ajax({
														url:'getIntroducerString.php',
														dataType:'json',
														type:'POST',
														data:{
															name:edata['name'],

														},
														success:function(data){
															introducerString[edata['name']] = "<option value='%%'disabled selected>紹介者フィルター</option><option value='%%%%'>全紹介者</option>";
															for(var i=0;i<data.length;i++){
																introducerString[edata['name']]+="<option value='"+data[i]['introducer']+"'>"+data[i]['introducer']+"</option>";
															}
														},complete:function(data){



														}
													})












													if(lastinfowindow!=null){
														lastinfowindow.close();
													}
													lastinfowindow=infowindow;
													lastmarker = marker;

													




													/*kaka added plz*/

													google.maps.event.addListener(infowindow,'domready',function(item,infowindow,edata){


														return function(){
															$("#"+item+"view").unbind().on('click',function(){




																var introducerFilterCache = localStorage[item+'introducerFilterSelect']||'defaultValue';



																var mendansyaFilterCache = localStorage[item+'mendansyaFilterSelect']||'defaultValue';

																mendansyaFilterCache = ((mendansyaFilterCache=='defaultValue'||mendansyaFilterCache=='undefined')?'%%%%':mendansyaFilterCache);
																introducerFilterCache = ((introducerFilterCache=='defaultValue'||introducerFilterCache=='undefined')?'%%%%':introducerFilterCache);

																setContentFromName(item,infowindow,edata,((mendansyaFilterCache=='defaultValue'||mendansyaFilterCache=='undefined')?'%%%%':mendansyaFilterCache),((introducerFilterCache=='defaultValue'||introducerFilterCache=='undefined')?'%%%%':introducerFilterCache));



																google.maps.event.addListener(infowindow,'domready',function(){


																	if(mendansyaFilterCache!='defaultValue'){
																		console.log("putting on infowindow mendansya ready:"+mendansyaFilterCache);
																		$('#'+item+'mendansyaFilterSelect').val(mendansyaFilterCache);
																	}


																	$("#"+item+"mendansyaFilterSelect").off().on('change',function(){
																		console.log("mendansyaFilterSelect called");
																		console.log($("#"+item+"mendansyaFilterSelect option:selected"));
																		console.log($("#"+item+"mendansyaFilterSelect option:selected").val());
																		localStorage[item+'mendansyaFilterSelect']=$("#"+item+"mendansyaFilterSelect option:selected").val();
																		if(lastmarker!=null)new google.maps.event.trigger(lastmarker,'click');

																	})



																	if(introducerFilterCache!='defaultValue'){
																		console.log("putting on infowindow introducer ready:"+introducerFilterCache);
																		$('#'+item+'introducerFilterSelect').val(introducerFilterCache);
																	}


																	$("#"+item+"introducerFilterSelect").off().on('change',function(){
																		console.log("introducerFilterSelect called");
																		console.log($("#"+item+"introducerFilterSelect option:selected"));
																		console.log($("#"+item+"introducerFilterSelect option:selected").val());
																		localStorage[item+'introducerFilterSelect']=$("#"+item+"introducerFilterSelect option:selected").val();
																		if(lastmarker!=null)new google.maps.event.trigger(lastmarker,'click');

																	})






																	$("#"+item+"insert").unbind().on('click',function(){



																		infowindow.setContent("<button class='btn btn-default' id='"+item+"view'>戻る</button>"+"<hr><div align='center'><u>"+item+"</u></div><hr>"+"<div align='center'><b>営業入力</b></div><hr>"+getInputFormContent(item));



																		$("#"+item+"insertForm").submit(function(event){

																			event.preventDefault();
																			$.ajax({
																				url:$("#"+item+"insertForm").attr('action'),
																				type:$("#"+item+"insertForm").attr('method'),
																				dataType:'text',
																				data:{
																					name:item,
																					incharge:$("#"+item+"incharge").val(),
																					date:$("#"+item+"date").val(),
																					content:$("#"+item+"content").val(),
																					mendansya:$("#"+item+"mendansya").val(),

																				},
																				complete:function(data){
																					alert(data.responseText);
																					if(lastmarker!=null)new google.maps.event.trigger(lastmarker,'click');
																					/*$("#"+item+"view")[0].click();*/



																				}
																			})
																		})

																	})

																	$("#"+item+"insertIntroduce").unbind().on('click',function(){

																		var titleInfo = "<span class='collapse' id='"+item+"titleInfo'>"+'<i style="color:'+getRankColor(edata['rank'])+';"class="fas fa-map-marker-alt"></i>'+(edata['address'])+""+((edata['phone']!='0'&&edata['phone']!=null)?"<br>"+'<i style="color:'+getRankColor(edata['rank'])+';"class="fas fa-mobile-alt"></i>'+" "+edata['phone']:"")+"</span>";
																		var title = "<span data-toggle='collapse' href='#"+item+"titleInfo'><h6 style='color:"+getRankColor(edata['rank'])+";'>"+edata['rank']+"ランク"+edata['category']+"</h6>"+"<div><h4>"+name+"</h4></div>"+"</div>"+titleInfo+"<hr style='border:none;height:2px;background-color:"+getRankColor(edata['rank'])+";color:"+getRankColor(edata['rank'])+";'></span>";

																		infowindow.setContent("<span><button class='btn btn-default' id='"+item+"view'>戻る</button></span><hr><div align='center'><u>"+item+"</u></div><hr>"+"<div align='center'><b>紹介入力</b></div><hr>"+getInputIntroduceFormContent(item));



																		$("#"+item+"insertIntroduceForm").submit(function(event){

																			event.preventDefault();
																			$.ajax({
																				url:$("#"+item+"insertIntroduceForm").attr('action'),
																				type:$("#"+item+"insertIntroduceForm").attr('method'),
																				dataType:'text',
																				data:{
																					name:item,
																					branch:$("#"+item+"branchIntroduce").val(),

																					date:$("#"+item+"dateIntroduce").val(),
																					introducer:$("#"+item+"introducerIntroduce").val(),
																					introduced:$("#"+item+"introducedIntroduce").val(),
																					conditions:$("#"+item+"conditionsIntroduce").val(),


																				},
																				complete:function(data){
																					alert(data.responseText);
																					if(lastmarker!=null)new google.maps.event.trigger(lastmarker,'click');
																					/*$("#"+item+"view")[0].click();*/



																				}
																			})
																		})

																	})

																	$.each(data,function(k,edata){
																		var eitem = item;



																	})


																})/*infowindow domready*/


/*deleted google.maps.event.addListener(infowindow,'domready',function(){*/





	/*deleted})*/

})




}

/*kaka test add*/

}(item,infowindow,edata))


/*kaka added plz end*/
if(edata['category']!='拠点'){
	infowindow.setContent(""+item+"<br>"+"<button class='btn btn-default' id='"+item+"view'>更新・表示</button><button class='btn btn-default' id='"+item+"insert'>営業入力</button><button class='btn btn-default' id='"+name+"insertIntroduce'>紹介入力</button><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>");
	google.maps.event.addListenerOnce(infowindow,'domready',function(){
		console.log("previous click:"+$("#"+item+"view"));
		$("#"+item+"view")[0].click();

	})
	infowindow.open(map,marker);
}else{

	$.ajax({
		url:'getBranchIntroduce.php',
		dataType:'json',
		type:'POST',
		data:{
			branch:item
		},
		success:function(data){

			var branchinfostr='';
			$.each(data,function(i,data1){
				console.log(""+"<div style='color:"+getRankColor(edata['rank'])+";float:left;'>"+data1['date']+"</div>");
				branchinfostr+=(

					""+"<div style='color:"+getRankColor(edata['rank'])+";float:left;'>"+data1['date']+"</div>"+
					"<br>"+"<div align='left'>"+data1['name']+"</div>"+
						""+"<div align='left'><b>"+data1['introducer']+' 〜 '+data1['introduced']+"</b></div>"+
						data1['conditions']+""+
						
						"<hr>"





					/*""+""+'<div align="center"><b>'+edata['introducer']+" 〜 "+edata['introduced']+'</b><br>'+edata['conditions']+'</div>'+
 * 					""+"<div align='center'>"+edata['name']+"</div>"+
 *
 *
 * 										""+"<div align='center'>"+edata['date']+"</div>"+
 * 															"<hr>"*/



					);
			})


			var titleInfo = "<span class='collapse' id='"+item+"titleInfo'>"+'<i style="color:'+getRankColor(edata['rank'])+';"class="fas fa-map-marker-alt"></i>'+(edata['address'])+""+((edata['phone']!='0'&&edata['phone']!=null)?"<br>"+'<i style="color:'+getRankColor(edata['rank'])+';"class="fas fa-mobile-alt"></i>'+" "+edata['phone']:"")+"</span>";
							var title = "<span data-toggle='collapse' href='#"+item+"titleInfo'><h6 style='color:"+getRankColor(edata['rank'])+";'>"+""+$("#prefectures option:selected").text()+" "+$("#cities option:selected").text()+""+"</h6>"+"<div><h4>"+item+" 拠点"+"</h4></div>"+"</div>"+titleInfo+"<hr style='border:none;height:2px;background-color:"+getRankColor(edata['rank'])+";color:"+getRankColor(edata['rank'])+";'></span>";
							
							infowindow.setContent(title+"<hr><div align='center'><span data-toggle='collapse' href='#"+item+"branchCollapse'><b>紹介</b><span style='color:"+getRankColor(edata['rank'])+";'>("+data.length+")</span>"+"</span></div><hr><div id='"+item+"branchCollapse' class='collapse'>"+branchinfostr+"</div><hr><hr>");
			
			infowindow.open(map,marker);


		}
	})

}

}

})(marker,item,infowindow,map,edata) )
}catch(err){
	markerFlag=1;
	console.log(err+"\n"+k+"\n"+marker);
}

if(markerFlag==1){
	if(alertCount==0){
		alert("再読み込みしてください。");
		console.log(item+"再読み込みしてください。");

	}
	alertCount++;

	console.log('doAfterLocationChange change after error');
	console.log(item+"再読み込みしてください。");
	/*doAfterLocationChange();*/

}else{






}
}
/*})*/
})
}
}(i,edata));

})


/*markers put in callback end*/



					/*failed promise...but life goes on!
 * 					
 * 										async function callAddressLatLng(edata){
 *
 * 																await addressLatLng(edata['address'],true,true,function(i,item){
 *
 *
 *
 * 																						}());
 * 																												
 * 																																	}
 * 																																						const promises = data.map(callAddressLatLng);
 * 																																											await Promise.all(promises);
 * 																																																
 * 																																																					*/




/*
 * 	no callback for you
 * 					if(callback2){
 * 									
 * 														callback2();}*/

					if(mainCallback){
						console.log("mainCallback");
						mainCallback();

					}

				}


				currentPositionFunction1(function(){
					
					currentPositionFunction2(callback);
					
				});

				

				
				

				

				
			}


			function secondSuccessAfterMarker(){


			}




			firstSuccessForMarker(secondSuccessAfterMarker);						

		},
		error: function (jqxhr, status, error) {
			alert(jqxhr);
			alert(status);
			alert(error);
		}
	})

map.fitBounds(bounds);







}








$(document).ready(function(){

	
	$("#prefectures").change(function(){
		console.log("prefectures trigger");
		
		localStorage['prefectureKey']=$("#prefectures option:selected").val();

		

		$.ajax({
			url:'getCities.php',
			dataType:'json',
			type:'POST',
			data:{
				prefecture:$("#prefectures option:selected").val(),
			},
			success:function(data){
				citiesString = "<option value='%%'>全都市</option>";
				branchString = [];
				branchString['%%']="<option value='%%'>全拠点</option>";
				dbranchString = [];

				$.each(data,function(i,edata){
					citiesString+="<option value='"+edata['city']+"'>"+edata['city']+"</option>";

					$.ajax({
						url:'getBranches.php',
						dataType:'json',
						type:'POST',
						data:{
							prefecture:$("#prefectures option:selected").val(),
							city:edata['city'],

						},
						success:function(data){

							branchString[edata['city']] = "<option value='%%'>全拠点</option>";
							for(var j = 0; j < data.length;j++){

								
								branchString['%%']+="<option value='"+data[j]['name']+"'>"+data[j]['name']+"</option>";
								branchString[edata['city']]+="<option value='"+data[j]['name']+"'>"+data[j]['name']+"</option>";
								dbranchString['%%']+="<option value='"+data[j]['name']+"'>"+data[j]['name']+"</option>";
								dbranchString[edata['city']]+="<option value='"+data[j]['name']+"'>"+data[j]['name']+"</option>";
							}
							
						},
						complete:function(data){
							var citiesCache = localStorage[$("#prefectures option:selected").val()+"cities"]||'defaultValue';
							
							if(citiesCache!='defaultValue'){




								if(edata['city']==citiesCache){

									$('#branch').find('option').remove().end().append(branchString[$("#cities option:selected").val()]);
									var branchCache = localStorage[$("#cities option:selected").val()+"branch"]||'defaultValue';
									if(branchCache!='defaultValue'){
										$('#branch').val(branchCache);
									}
									$("#LocationMenuButton").text($("#prefectures option:selected").text().substring(0,1)+" "+$("#cities option:selected").text().substring(0,1)+" "+$("#branch option:selected").text().substring(0,1));


									$.ajax({
										url:'getIncharges.php',
										dataType:'json',
										type:'POST',
										data:{
											city:$('#cities option:selected').val(),
											prefecture:$("#prefectures option:selected").val(),
										},
										success:function(data){
											inchargesString = "";
											for(var i=0;i<data.length;i++){
												inchargesString+="<option value='"+data[i]['incharge']+"'>"+data[i]['incharge']+"</option>";
											}
										},complete:function(data){

											var graphSelectCache=localStorage['graphSelectKey']||'defaultValue';
											if(graphSelectCache!='defaultValue'){
		/*$("#graphSelect").val(graphSelectCache);
 * 		$("#graphSelect").trigger("change");*/
	}

}
})




									doAfterLocationChange();
								}


								/*koko */
								if('%%'==citiesCache){
									console.log('%% called');
									$('#branch').find('option').remove().end().append(branchString[$("#cities option:selected").val()]);
									var branchCache = localStorage[$("#cities option:selected").val()+"branch"]||'defaultValue';
									if(branchCache!='defaultValue'){
										$('#branch').val(branchCache);
									}
									$("#LocationMenuButton").text($("#prefectures option:selected").text().substring(0,1)+" "+$("#cities option:selected").text().substring(0,1)+" "+$("#branch option:selected").text().substring(0,1));


									$.ajax({
										url:'getIncharges.php',
										dataType:'json',
										type:'POST',
										data:{
											city:$('#cities option:selected').val(),
											prefecture:$("#prefectures option:selected").val(),
										},
										success:function(data){
											inchargesString = "";
											for(var i=0;i<data.length;i++){
												inchargesString+="<option value='"+data[i]['incharge']+"'>"+data[i]['incharge']+"</option>";
											}
										},complete:function(data){

											var graphSelectCache=localStorage['graphSelectKey']||'defaultValue';
											if(graphSelectCache!='defaultValue'){
												$("#graphSelect").val(graphSelectCache);
												$("#graphSelect").trigger("change");
											}

										}
									})
									doAfterLocationChange();
								}





							}

						}
					})

					
				})
				
			},complete:function(data){
				$("#cities").find('option').remove().end().append(citiesString);
				var citiesCache = localStorage[$("#prefectures option:selected").val()+"cities"]||'defaultValue';
				if(citiesCache!='defaultValue'){
					$('#cities').val(citiesCache);
					
					

				}
				$("#LocationMenuButton").text($("#prefectures option:selected").text().substring(0,1)+" "+$("#cities option:selected").text().substring(0,1)+" "+$("#branch option:selected").text().substring(0,1));

			}
		})





})
})

$(document).ready(function(){

	$.ajax({
		url:'getPrefectures.php',
		dataType:'json',
		type:'POST',
		success:function(data){
			var i;
			var optionsAsString = "<option value='%%'>全都道府県</option>";



			for(i = 0; i < data.length; i++){


				optionsAsString += "<option value='" + data[i]['prefecture'] + "'>" + data[i]['prefecture'] + "</option>";

			}
			$("#prefectures").find('option').remove().end().append(optionsAsString);






		},complete:function(data){
			var prefectureCache=localStorage['prefectureKey']|| 'defaultValue';

			if(prefectureCache!='defaultValue'){

				$("#prefectures").val(prefectureCache);
				$("#prefectures").trigger("change");


			}
		},
		error: function (jqxhr, status, error) {
			alert(jqxhr);
			alert(status);
			alert(error);
		}
	})

})

$(document).ready(function(){

	$("#nameSelect").change(function(){
		

		bounds = new google.maps.LatLngBounds();

		var name = $("#nameSelect option:selected").text();

		
		
		addressLatLng(addresses[name],true,false);

		
		

		map.fitBounds(bounds);



	})

})

$(document).ready(function(){
	$("#insertButton").click(function(){
		
		$.ajax({
			url:'insert.php',
			dataType:'text',
			type:'POST',
			data:{
				name:$("#name").val(),
				incharge:$("#incharge").val(),
				date:$("#date").val(),
				content:$("#content").val(),
				mendansya:$("#mendansya").val(),
				
			},
			success:function(data){
				alert(data);
			},
			error: function (jqxhr, status, error) {
				alert(jqxhr);
				alert(status);
				alert(error);
			}
		})
	})
})

$(document).ready(function(){
	$("#destinationButton").click(function(){
		
		$.ajax({
			url:'insertDestination.php',
			dataType:'text',
			type:'POST',
			data:{
				destinationCategory:$("#destinationCategory option:selected").text(),
				destinationName:$("#destinationName").val(),
				destinationAddress:$("#destinationAddress").val(),
				destinationPhone:$("#destinationPhone").val(),
				destinationFax:$("#destinationFax").val(),
				destinationCity:$("#destinationCity").val(),
				destinationRank:$("#destinationRank option:selected").text()
				
				
			},
			success:function(data){
				alert(data);
			},
			error: function (jqxhr, status, error) {

				alert(jqxhr);
				alert(status);
				alert(error);
			}
		})
	})
})

$(document).ready(function(){

	$("#navigationSubmit").change(function(){
		if($("#navigationSubmit").prop('checked')){

			
			calculateRoute();

		}else{
			directionsRenderer.setMap(null);
			$("#prefectures").trigger("change");


		}

	})
	
})

$(document).ready(function(){
	$("#from").change(function(){
		localStorage['fromKey']=$("#from").val();
	})
	$("#to").change(function(){
		localStorage['toKey']=$("#to").val();
	})
	$("#waypoints").change(function(){
		localStorage['waypointsKey']=JSON.stringify($("#waypoints").val());
	})
	$("#navigationSubmit").change(function(){
		localStorage['navigationSubmitKey']=$("#navigationSubmit").prop('checked')?"checked":"unchecked";
	})
})

var navigationOpen = 0;
var markerOpen = 0;
var graphOpen = 0;
var locationOpen = 0;

$(document).ready(function(){
	$("#navigationMenuButton").on("click",function(){
		
		if(lastinfowindow!=null){lastinfowindow.close();}

		if(markerOpen==1){
			$("#markerMenuButton")[0].click();

		}
		if(graphOpen==1){
			$("#graphMenuButton")[0].click();
			
		}
		if(locationOpen==1){
			$('#LocationMenuButton')[0].click();
		}
		navigationOpen = navigationOpen==1?0:1;

		
	});
	$("#markerMenuButton").on("click",function(){
		if(lastinfowindow!=null){lastinfowindow.close();}
		
		if(navigationOpen==1){
			$("#navigationMenuButton")[0].click();
			
		}
		if(graphOpen==1){
			$("#graphMenuButton")[0].click();
			
		}
		if(locationOpen==1){
			$('#LocationMenuButton')[0].click();
		}
		markerOpen = markerOpen==1?0:1;
		
	});
	$("#graphMenuButton").on("click",function(){
		if(lastinfowindow!=null){lastinfowindow.close();}
		
		if(markerOpen==1){
			$("#markerMenuButton")[0].click();
			
		}
		if(navigationOpen==1){
			$("#navigationMenuButton")[0].click();
			
		}
		if(locationOpen==1){
			$('#LocationMenuButton')[0].click();
		}
		graphOpen = graphOpen==1?0:1;
		
	});


	$("#LocationMenuButton").on("click",function(){
		if(lastinfowindow!=null){lastinfowindow.close();}
		
		if(markerOpen==1){
			$("#markerMenuButton")[0].click();
			
		}
		if(navigationOpen==1){
			$("#navigationMenuButton")[0].click();
			
		}
		if(graphOpen==1){
			$('#graphMenuButton')[0].click();
		}
		locationOpen = locationOpen==1?0:1;
		
	});

})

var yearOptions = "";
var lastOpenMenu;
$(document).ready(function(){
	$('#markerMenuButton').on('click',function(){
		lastOpenMenu = $('#markerMenuButton');
	})
	$('#navigationMenuButton').on('click',function(){
		lastOpenMenu = $('#navigationMenuButton');
	})
	$('#graphMenuButton').on('click',function(){
		lastOpenMenu = $('#graphMenuButton');
	})
	$('#LocationMenuButton').on('click',function(){
		lastOpenMenu = $('#LocationMenuButton');
	})
})


$(document).ready(function(){

	$(".hideAllCollapse").unbind().on('change',function(){
		console.log("hideAll");
		if(lastOpenMenu!=null){
			console.log(lastOpenMenu);
			lastOpenMenu[0].click();lastOpenMenu=null;}
		})
})
$(document).ready(function(){
	$("#graphSelect").change(function(){
		localStorage['graphSelectKey']=$("#graphSelect option:selected").val();
		var temp = getGraphOptions($("#graphSelect option:selected").val());
		
		$("#graphOptions").empty().end().append("");
		$("#graphOptions").append(temp);

		var graphMonthCache = localStorage['graphMonth']||'defaultValue';
		if(graphMonthCache!='defaultValue'){
			$('#graphMonth').val(graphMonthCache);
		}
		$('#graphMonth').change(function(){
			localStorage['graphMonth']=$('#graphMonth option:selected').val();
			$("#graphSelect").trigger('change');
		})
		
		var graphYearCache = localStorage['graphYear']||'defaultValue';
		if(graphYearCache!='defaultValue'){
			$('#graphYear').val(graphYearCache);
		}
		$('#graphYear').change(function(){
			localStorage['graphYear']=$('#graphYear option:selected').val();
			$("#graphSelect").trigger('change');
		})
		
		var graphInchargeCache = localStorage['graphIncharge']||'defaultValue';
		if(graphInchargeCache!='defaultValue'){
			$('#graphIncharge').val(graphInchargeCache);
		}
		$('#graphIncharge').change(function(){
			localStorage['graphIncharge']=$('#graphIncharge option:selected').val();
			$("#graphSelect").trigger('change');
		})


		$("#graphSubmit").on('click',function(){


			$("#graphDiv").empty().end();
			$("#graphDiv").append("<canvas id='graphCanvas'></canvas>");



			if($("#graphSelect option:selected").val()=="個人月別"){

				$.ajax({
					url:'getInchargeMonthCounts.php',
					type:'POST',
					dataType:'json',
					data:{
						city:$("#cities option:selected").val(),
						prefecture:$("#prefectures option:selected").val(),
						year:$("#graphYear option:selected").val(),
						incharge:$('#graphIncharge option:selected').val(),
					},

					success:function(data){

						var xlabels = [];
						var yvalues=[];

						var countSum = 0;
						for(var i=0;i<data.length;i++){

							xlabels.push(data[i]['month']+"月");
							yvalues.push(parseInt(data[i]['count']));
							countSum+=parseInt(data[i]['count']);
						}

						var avg = Math.round((countSum*1.0)/xlabels.length);




						var backgroundColor=[];


			/*
 * 					for(var i=0;i<data.length;i++){
 * 											if(yvalues[i]==avg){
 * 																		
 * 																									backgroundColor.push('#F26A7C');
 * 																															}else if(yvalues[i]>avg){
 * 																																						
 * 																																													backgroundColor.push('#DD2C44');
 * 																																																			}else if(yvalues[i]<avg){
 * 																																																										
 * 																																																																	backgroundColor.push('#F49CA8');
 * 																																																																							}
 * 																																																																													
 * 																																																																																		}*/

					for(var i = 0; i<data.length;i++){
						/*backgroundColor.push('#247BA0');*/
						backgroundColor.push(color2);
						/*backgroundColor.push('#B2DBBF');*/
						/*backgroundColor.push('#F3FFBD');
 * 						
 *
 * 												backgroundColor.push('#FF1654');
 * 																		backgroundColor.push('#F3FFBD');
 * 																								backgroundColor.push('#B2DBBF');
 * 																														backgroundColor.push('#70C1B3');*/
						
						
						
						
						
					}

					

					$('#graphCanvas').empty().end().append("");
					var ctx = document.getElementById("graphCanvas").getContext('2d');
					var myChart = new Chart(ctx, {
						type: 'bar',
						data: {
							labels: xlabels,
							datasets: [{
								label: '件数',
								data: yvalues,
								borderWidth: 1,
								backgroundColor:backgroundColor,
							}]
						},

						options: {
							title:{
								display:true,
								text:$('#branch option:selected').text()+'拠点'+' 個人月別'
							},

							scales: {
								yAxes: [{
									ticks: {
										userCallback: function(label, index, labels) {

											if (Math.floor(label) === label) {
												return label;
											}

										},

										beginAtZero:true
									}
								}],
								xAxes: [{
									ticks: {

										autoSkip:false
									}
								}]
							}
						}
					});
				}

			})

			}


			/*全紹介統計*/

			if($("#graphSelect option:selected").val()=="全紹介統計"){

				$.ajax({
					url:'getMonthIntroduce.php',
					type:'POST',
					dataType:'json',
					data:{
						city:$('#cities option:selected').val(),
						prefecture:$("#prefectures option:selected").val(),
						year:$("#graphYear option:selected").val(),
						branch:$('#branch option:selected').val()

					},

					success:function(data){

						var xlabels = [];
						var yvalues=[];

						var countSum = 0;
						for(var i=0;i<data.length;i++){

							xlabels.push(data[i]['month']+"月");
							yvalues.push(parseInt(data[i]['count']));
							countSum+=parseInt(data[i]['count']);
						}

						var avg = Math.round((countSum*1.0)/xlabels.length);


						var backgroundColor=[];

						for(var i = 0; i<data.length;i++){
							/*backgroundColor.push('#247BA0');*/
							backgroundColor.push(color2);
							/*backgroundColor.push('#B2DBBF');*/
						/*backgroundColor.push('#F3FFBD');
 * 						
 *
 * 												backgroundColor.push('#FF1654');
 * 																		backgroundColor.push('#F3FFBD');
 * 																								backgroundColor.push('#B2DBBF');
 * 																														backgroundColor.push('#70C1B3');*/
						
						
						
						
						
					}
					/*
 * 					for(var i=0;i<data.length;i++){
 * 											if(yvalues[i]==avg){
 * 																		
 * 																									backgroundColor.push('#F26A7C');
 * 																															}else if(yvalues[i]>avg){
 * 																																						
 * 																																													backgroundColor.push('#DD2C44');
 * 																																																			}else if(yvalues[i]<avg){
 * 																																																										
 * 																																																																	backgroundColor.push('#F49CA8');
 * 																																																																							}
 * 																																																																													
 * 																																																																																		}*/


					

					$('#graphCanvas').empty().end().append("");
					var ctx = document.getElementById("graphCanvas").getContext('2d');
					var myChart = new Chart(ctx, {
						type: 'bar',
						data: {
							labels: xlabels,
							datasets: [{
								label: '件数',
								data: yvalues,
								borderWidth: 1,
								backgroundColor:backgroundColor,
							}]
						},

						options: {

							title:{
								display:true,
								text:$('#branch option:selected').text()+'拠点'+' 全紹介統計'
							},

							scales: {
								yAxes: [{
									ticks: {

										userCallback: function(label, index, labels) {

											if (Math.floor(label) === label) {
												return label;
											}

										},

										beginAtZero:true
									}
								}],
								xAxes: [{
									ticks: {

										autoSkip:false
									}
								}]
							}
						}
					});
				}

			})

			}


			/*全紹介統計*/


			/*紹介先*/
			if($("#graphSelect option:selected").val()=="紹介先"){


				var counts = [];
				counts[0]=0;
				counts[1]=0;
				counts[2]=0;
				counts[3]=0;

				var labels=[];
				labels[0]='2km以下';
				labels[1]='2km以上5km以下';
				labels[2]='5km以上10km以下';
				labels[3]='10km以上';


				var backgroundColor=[];
				backgroundColor.push(color1);
				backgroundColor.push(color2);
				backgroundColor.push(color3);
				backgroundColor.push(color4);
				backgroundColor.push(color5);
				/*var iBCache = localStorage[addresses[$('#branch option:selected').text()]+"json"]||'defaultValue';*/

				/*var iBPosition={
 * 			lat:$.parseJSON(iBCache)['lat'],
 * 						lng:$.parseJSON(iBCache)['lng']
 * 								}*/


		/*kaka*/
		console.log("address of "+$('#branch option:selected').text()+":"+addresses[$('#branch option:selected').text()]);
		
		$.ajax({
			url:'getaddressjson.php',
			dataType:'json',
			type:'POST',
			data:{
				address:addresses[$('#branch option:selected').text()],
			},
			success:function(data){

				var iBCache=data[0]['json'];
				if(iBCache!='undefined'){
					var iBPosition={
						lat:$.parseJSON(iBCache)['lat'],
						lng:$.parseJSON(iBCache)['lng']
					}

					console.log(iBPosition);

					var addressescount=0;
					var addressestotalcount=0;
					for(var name in addresses){
						addressestotalcount+=1;
					}
					for(var name in addresses){


						console.log(name+":"+addresses[name]);


						$.ajax({
							url:'getaddressjson.php',
							dataType:'json',
							type:'POST',
							data:{
								address:addresses[name],
							},
							success:function(data){
								for(var i = 0; i < data.length;i++){
									var addressCache = data[i]['json'];
									var position={
										lat:$.parseJSON(addressCache)['lat'],
										lng:$.parseJSON(addressCache)['lng']
									}
									var distance = getDistance(position,iBPosition);
									if(distance!=0){
										counts[0]= (distance>=0&&distance<2000)?counts[0]+1:counts[0];
										counts[1]= (distance>=2000&&distance<5000)?counts[1]+1:counts[1];
										counts[2]= (distance>=5000&&distance<10000)?counts[2]+1:counts[2];
										counts[3]= (distance>=10000)?counts[3]+1:counts[3];
									}
									console.log('distance='+distance);

								}

							},
							complete:function(data){
								addressescount+=1;

								if(addressescount==addressestotalcount){


									$('#graphCanvas').empty().end().append("");

									console.log(labels);
									console.log(counts);

									for(var i=0;i<labels.length;i++){
										labels[i]+=": "+counts[i]+"";
										console.log("i="+i+"counts[i]="+counts[i]);
									}
									var ctx = document.getElementById("graphCanvas").getContext('2d');
									var myChart = new Chart(ctx, {
										type: 'pie',
										data: {
											labels: labels,
											datasets: [{

												data: counts,
												backgroundColor:backgroundColor,

											}]
										},
										options:{

											aspectRatio:1.1,
											title:{
												display:true,
												text:$('#branch option:selected').text()+'拠点'+' 紹介先'
											},
											tooltips: {
												callbacks: {
													label: function(tooltipItem, data) {
														var dataset = data.datasets[tooltipItem.datasetIndex];
														var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
															return previousValue + currentValue;
														});
														var currentValue = dataset.data[tooltipItem.index];
														var percentage = Math.floor(((currentValue/total) * 100)+0.5);
														var result=(percentage!=0?percentage+"%":""); 
														return result;  
														/*return percentage + "%";*/
													}
												}
											},
											showAllTooltips:true,

    	/*tooltips:{
 *     		 mode: 'label'
 *     		     		}*/

    	}


    });



								}
							}


						})




					}









				}

				

			}

		})








		

	}
	/*紹介先*/





	/*pie start*/


	if($("#graphSelect option:selected").val()=="紹介属性"){

		$.ajax({
			url:'getIntroduceCategoryPie.php',
			type:'POST',
			dataType:'json',
			data:{
				prefecture:$("#prefectures option:selected").val(),
				branch:$("#branch option:selected").val(),
				city:$('#cities option:selected').val(),
			},

			success:function(data){

				var xlabels = [];
				var yvalues=[];

				var countSum = 0;
				for(var i=0;i<data.length;i++){

					xlabels.push(data[i]['category']+": "+parseInt(data[i]['count']));
					yvalues.push(parseInt(data[i]['count']));
					countSum+=parseInt(data[i]['count']);
				}

				var avg = Math.round((countSum*1.0)/xlabels.length);





				var backgroundColor=[];
				backgroundColor.push(color1);
				backgroundColor.push(color2);
				backgroundColor.push(color3);
				backgroundColor.push(color4);
				backgroundColor.push(color5);





				$('#graphCanvas').empty().end().append("");
				var ctx = document.getElementById("graphCanvas").getContext('2d');
				var myChart = new Chart(ctx, {
					type: 'pie',
					data: {
						labels: xlabels,
						datasets: [{

							data: yvalues,
							backgroundColor:backgroundColor,

						}]
					},
					options:{
						aspectRatio:1.1,
						title:{
							display:true,
							text:$('#branch option:selected').text()+'拠点'+' 紹介属性'
						},
						showAllTooltips:true,
						tooltips: {
							callbacks: {
								label: function(tooltipItem, data) {
									var dataset = data.datasets[tooltipItem.datasetIndex];
									var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
										return previousValue + currentValue;
									});
									var currentValue = dataset.data[tooltipItem.index];
									var percentage = Math.floor(((currentValue/total) * 100)+0.5);
									var result=(percentage!=0?percentage+"%":""); 
									return result;  
									/*return percentage + "%";*/
								}
							}
						},
					}


				});
			}

		})

	}

	/*pie end*/





	if($("#graphSelect option:selected").val()=="月間個人別"){

		$.ajax({
			url:'getMonthIncharge.php',
			type:'POST',
			dataType:'json',
			data:{
				prefecture:$("#prefectures option:selected").val(),
				city:$('#cities option:selected').val(),
				year:$("#graphYear option:selected").val(),
				month:$('#graphMonth option:selected').val(),
			},

			success:function(data){

				var incharges = [];
				var counts=[];

				var countSum = 0;
				for(var i=0;i<data.length;i++){

					incharges.push(data[i]['incharge']);
					counts.push(parseInt(data[i]['count(*)']));
					countSum+=parseInt(data[i]['count(*)']);
				}

				var avg = Math.round((countSum*1.0)/incharges.length);


				var backgroundColor=[];

					/*
 * 					for(var i=0;i<data.length;i++){
 * 											if(counts[i]==avg){
 * 																		
 * 																									backgroundColor.push('#F26A7C');
 * 																															}else if(counts[i]>avg){
 * 																																						
 * 																																													backgroundColor.push('#DD2C44');
 * 																																																			}else if(counts[i]<avg){
 * 																																																										
 * 																																																																	backgroundColor.push('#F49CA8');
 * 																																																																							}
 * 																																																																													
 * 																																																																																		}*/

					for(var i = 0; i<data.length;i++){
						/*backgroundColor.push('#247BA0');*/
						backgroundColor.push(color2);
						/*backgroundColor.push('#B2DBBF');*/
						/*backgroundColor.push('#F3FFBD');
 * 						
 *
 * 												backgroundColor.push('#FF1654');
 * 																		backgroundColor.push('#F3FFBD');
 * 																								backgroundColor.push('#B2DBBF');
 * 																														backgroundColor.push('#70C1B3');*/
						
						
						
						
						
					}
					

					$('#graphCanvas').empty().end().append("");
					var ctx = document.getElementById("graphCanvas").getContext('2d');
					var myChart = new Chart(ctx, {
						type: 'bar',
						data: {
							labels: incharges,
							datasets: [{
								label: '件数',
								data: counts,
								borderWidth: 1,
								backgroundColor:backgroundColor,
							}]
						},

						options: {
							title:{
								display:true,
								text:$('#branch option:selected').text()+'拠点'+' 月間個人別'
							},

							scales: {
								yAxes: [{
									ticks: {
										userCallback: function(label, index, labels) {

											if (Math.floor(label) === label) {
												return label;
											}

										},

										beginAtZero:true
									}
								}],
								xAxes: [{
									ticks: {

										autoSkip:false
									}
								}]
							}
						}
					});
				}

			})

	}
})

$('#graphSubmit')[0].click();

})
})

function getGraphOptions(graphSelected){
	var result="";

	if(graphSelected=="個人月別"||graphSelected=="月間個人別"||graphSelected=='全紹介統計'){
		result+="<div align='center'>年</div><select class='form-control' id='graphYear'>";
		result+="<option value='2018'>2018</option><option value='2019'>2019</option>";
		result+="</select>";
		
	}
	if(graphSelected=="月間個人別"){
		result+="<div align='center'>月</div><select class='form-control' id='graphMonth'>";
		for(var i = 1; i <=12;i++){
			result+="<option value='"+i+"'>"+i+"</option>";
		}
		result+="</select>";

		
		
	}

	if(graphSelected=="個人月別"){
		result+="<div align='center'>個人名</div><select class='form-control' id='graphIncharge'>";
		
		result+=inchargesString;
		
		result+="</select>";

		
	}

	result+="<button class='form-control' id='graphSubmit'>グラフ作成</button><hr>";
	
	return result;
}

$(document).ready(function(){
	var visitCount=localStorage['visitCount']||"-1";
	visitCount = parseInt(visitCount);
	console.log(visitCount);
	var visitString = (visitCount++).toString();
	
	localStorage['visitCount']=(visitCount++).toString();
	
	/*
 * 	if(visitCount<5){
 * 			$("#prefectures").val("%%");
 * 					$("#cities").val("%%");
 * 							$("#branch").val("%%");
 * 									$("#prefectures").trigger("change");
 * 										}*/

})


$(document).ready(function(){
	$("#cities").change(function(){
		localStorage[$('#prefectures option:selected').val()+"cities"]=$("#cities option:selected").val();
		
		$('#branch').find('option').remove().end().append(branchString[$("#cities option:selected").val()]);
		var branchCache = localStorage[$("#cities option:selected").val()+"branch"]||'defaultValue';
		if(branchCache!='defaultValue'){
			$('#branch').val(branchCache);
		}
		console.log("cities trigger");
		$("#LocationMenuButton").text($("#prefectures option:selected").text().substring(0,1)+" "+$("#cities option:selected").text().substring(0,1)+" "+$("#branch option:selected").text().substring(0,1));
		doAfterLocationChange();
	})
	$("#branch").change(function(){
		localStorage[$('#cities option:selected').val()+"branch"]=$("#branch option:selected").val();
		console.log("branch trigger");
		$("#LocationMenuButton").text($("#prefectures option:selected").text().substring(0,1)+" "+$("#cities option:selected").text().substring(0,1)+" "+$("#branch option:selected").text().substring(0,1));
		doAfterLocationChange();
	})
})



function getInputFormContent(name){
	
	
	return "<form action='insert.php' method='post' data-type='text' name='"+name+"insertForm' id='"+name+"insertForm'>"
	+"<input type='text' placeholder='担当者'name='"+name+"incharge' id='"+name+"incharge' class='form-control'><hr>"
	+"<input type='text' placeholder='面談者'name='"+name+"mendansya' id='"+name+"mendansya' class='form-control'><hr>"
	+"<div align='center'><input type='date' name='"+name+"date' id='"+name+"date' class='form-control'></div><hr>"
	+"<input type='text' placeholder='内容'name='"+name+"content' id='"+name+"content' class='form-control'><hr>"
	
	
	+"<button type='submit' class='form-control'>入力</button>"
	+"</form>";
}

function getEditInputFormContent(name){
	
	
	return "<form action='insert.php' method='post' data-type='text' name='"+name+"editInsertForm' id='"+name+"editInsertForm'>"
	+"<input type='text' placeholder='担当者'name='"+name+"editIncharge' id='"+name+"editIncharge' class='form-control'><hr>"
	+"<input type='text' placeholder='面談者'name='"+name+"editMendansya' id='"+name+"editMendansya' class='form-control'><hr>"
	+"<div align='center'><input type='date' name='"+name+"editDate' id='"+name+"editDate' class='form-control'></div><hr>"
	+"<input type='text' placeholder='内容'name='"+name+"editContent' id='"+name+"editContent' class='form-control'><hr>"
	
	
	+"<button type='submit' class='form-control'>入力</button>"
	+"</form>";
}

function getInputIntroduceFormContent(name){
	
	/*return "<form action='insertIntroduce.php' method='post' type='text' name='"+name+"insertIntroduceForm' id='"+name+"insertIntroduceForm'>"
 * 	
 * 		+"<div align='center'>拠点</div><select name='"+name+"branchIntroduce' id='"+name+"branchIntroduce' class='form-control'>"+dbranchString[$("#cities option:selected").val()]+"</select><br>"
 * 			+"<div align='center'>紹介者</div><input type='text' name='"+name+"introducerIntroduce' id='"+name+"introducerIntroduce' class='form-control'><br>"
 * 				+"<div align='center'>被紹介者</div><input type='text' name='"+name+"introducedIntroduce' id='"+name+"introducedIntroduce' class='form-control'><br>"
 * 					+"<div align='center'>日時</div><div align='center'><input type='date' name='"+name+"dateIntroduce' id='"+name+"dateIntroduce' class='form-control' ></div><br>"
 * 						+"<div align='center'>状態</div><select name='"+name+"conditionsIntroduce' id='"+name+"conditionsIntroduce' class='form-control'>"+"<option value='問い合わせ'>問い合わせ</option><option value='見学'>見学</option><option value='面談'>面談</option><option value='入居'>入居</option><option value='非入居'>非入居</option>"+"</select><br>"
 *
 * 							
 * 								+"<button type='submit' class='form-control'>入力</button>"
 * 									+"</form>";*/

	return "<form action='insertIntroduce.php' method='post' type='text' name='"+name+"insertIntroduceForm' id='"+name+"insertIntroduceForm'>"
	
	+"<select name='"+name+"branchIntroduce' id='"+name+"branchIntroduce' class='form-control'>"+'<option value="" disabled selected>拠点</option>'+dbranchString[$("#cities option:selected").val()]+"</select><hr>"
	+"<input type='text' placeholder='紹介者'name='"+name+"introducerIntroduce' id='"+name+"introducerIntroduce' class='form-control'><hr>"
	+"<input type='text' placeholder='非紹介者'name='"+name+"introducedIntroduce' id='"+name+"introducedIntroduce' class='form-control'><hr>"
	+"<div align='center'><input type='date'name='"+name+"dateIntroduce' id='"+name+"dateIntroduce' class='form-control'></div><hr>"
	+"<select name='"+name+"conditionsIntroduce' id='"+name+"conditionsIntroduce' class='form-control'>"+"<option value='' disabled selected>状態</option>"+"<option value='問い合わせ'>問い合わせ</option><option value='見学'>見学</option><option value='面談'>面談</option><option value='入居'>入居</option><option value='非入居'>非入居</option>"+"</select><hr>"
	
	

	
	+"<button type='submit' class='form-control'>入力</button>"
	+"</form>";
}

function getEditInputIntroduceFormContent(name){
	
	/*return "<form action='insertIntroduce.php' method='post' type='text' name='"+name+"insertIntroduceForm' id='"+name+"insertIntroduceForm'>"
 * 	
 * 		+"<div align='center'>拠点</div><select name='"+name+"branchIntroduce' id='"+name+"branchIntroduce' class='form-control'>"+dbranchString[$("#cities option:selected").val()]+"</select><br>"
 * 			+"<div align='center'>紹介者</div><input type='text' name='"+name+"introducerIntroduce' id='"+name+"introducerIntroduce' class='form-control'><br>"
 * 				+"<div align='center'>被紹介者</div><input type='text' name='"+name+"introducedIntroduce' id='"+name+"introducedIntroduce' class='form-control'><br>"
 * 					+"<div align='center'>日時</div><div align='center'><input type='date' name='"+name+"dateIntroduce' id='"+name+"dateIntroduce' class='form-control' ></div><br>"
 * 						+"<div align='center'>状態</div><select name='"+name+"conditionsIntroduce' id='"+name+"conditionsIntroduce' class='form-control'>"+"<option value='問い合わせ'>問い合わせ</option><option value='見学'>見学</option><option value='面談'>面談</option><option value='入居'>入居</option><option value='非入居'>非入居</option>"+"</select><br>"
 *
 * 							
 * 								+"<button type='submit' class='form-control'>入力</button>"
 * 									+"</form>";*/

	return "<form action='insertIntroduce.php' method='post' type='text' name='"+name+"editInsertIntroduceForm' id='"+name+"editInsertIntroduceForm'>"
	
	+"<select name='"+name+"editBranchIntroduce' id='"+name+"editBranchIntroduce' class='form-control'>"+'<option value="" disabled selected>拠点</option>'+dbranchString[$("#cities option:selected").val()]+"</select><hr>"
	+"<input type='text' placeholder='紹介者'name='"+name+"editIntroducerIntroduce' id='"+name+"editIntroducerIntroduce' class='form-control'><hr>"
	+"<input type='text' placeholder='非紹介者'name='"+name+"editIntroducedIntroduce' id='"+name+"editIntroducedIntroduce' class='form-control'><hr>"
	+"<div align='center'><input type='date'name='"+name+"editDateIntroduce' id='"+name+"editDateIntroduce' class='form-control'></div><hr>"
	+"<select name='"+name+"editConditionsIntroduce' id='"+name+"editConditionsIntroduce' class='form-control'>"+"<option value='' disabled selected>状態</option>"+"<option value='問い合わせ'>問い合わせ</option><option value='見学'>見学</option><option value='面談'>面談</option><option value='入居'>入居</option><option value='非入居'>非入居</option>"+"</select><hr>"
	
	

	
	+"<button type='submit' class='form-control'>入力</button>"
	+"</form>";
}


/*here*/
function setContentFromName(name,infowindow,edata,mendansya,introducer){



	var content="";
	var contentL=0;
	var introduceContent="";
	var introduceL=0;
	var colorString = " style='color:"+getRankColor(edata['rank'])+";' ";
	$.ajax({
		url:'getInfoWindowContents.php',
		dataType:'json',
		type:'POST',
		data:{
			name:name,
			mendansya:mendansya,
		},
		success:function(data){

			/*content = "<span data-toggle='collapse' href='#"+name+"contentCollapse'><div align='center'>営業数："+data.length+"</div></span><hr>";*/
			contentL=data.length;
			content+="<div id='"+name+"contentCollapse' class='collapse'>";
			console.log(name+"mendansyaFilterSelect");
			content+="<select id='"+name+"mendansyaFilterSelect' class='form-control'>"+mendansyaString[name]+"</select>";
			console.log(mendansya);
			content+="<hr>";
			for(var j = 0; j < data.length;j++){
				content+=(
							/*
 * 						"<div align='center'>"+""+(j+1)+""+"</div>"+
 * 												"<br>"+"担当者："+data[j]['incharge']+
 * 																		"<br>"+"面談者："+data[j]['mendansya']+
 * 																								
 * 																														"<br>"+"日時：　"+data[j]['date']+
 * 																																				"<br>"+"内容：<div align='center'>「"+data[j]['content']+'」</div>'+
 *
 * 																																										*/

						/*"<div align='center'>"+""+(j+1)+""+"</div>"+*/
						



						/*""+"<div align='center'>"+data[j]['incharge']+' 〜 '+data[j]['mendansya']+"</div><div align='center'><br>「"+data[j]['content']+'」</div>'+
 * 						"<br>"+"<div align='center'>"+data[j]['date']+"</div>"+
 * 												
 * 																		
 * 																								
 * 																														
 * 																																				"<br>"+"<button class='form-control' id='"+name+(j+1)+"deleteInsert'>削除</button>"+'<hr>'
 * 																																										*/

						/*"<b>"+"<div align='center'>"+data[j]['incharge']+' 〜 '+data[j]['mendansya']+"</div></b><div align='center'>「"+data[j]['content']+'」</div>'+
 * 						""+"<div align='center'>"+data[j]['date']+"</div>"+*/

						/*"<b>"+"<div><span style='float:left;'>"+data[j]['incharge']+' 〜 '+data[j]['mendansya']+"</span></b><span style='float:right;color:"+getRankColor(edata['rank'])+";'>"+data[j]['date']+'</span></div>'+*/
						
						""+"<div style='color:"+getRankColor(edata['rank'])+";float:left;'>"+data[j]['date']+"</div><div style='float:right'><span id='"+name+(j+1)+"editInsert'><i class='fas fa-marker'></i></span><span style='width:11.39px;display:inline-block;'></span><span id='"+name+(j+1)+"deleteInsert'><i class='fas fa-trash'></i></span></div>"+
						"<br>"+"<div align='left'><b>"+data[j]['incharge']+' 〜 '+data[j]['mendansya']+"</b></div>"+
						
						""+data[j]['content']+
						/*"<br>"+(data[j]['content'].length>15?data[j]['content'].substring(0,15)+"...":data[j]['content'])+*/
						
						
						
						
						/*"<br>"+"<button class='form-control' id='"+name+(j+1)+"deleteInsert'>削除</button>"+*/
						'<hr>'
						

						);
			}
			content+="</div>";









		},
		complete:function(data){

			$.ajax({
				url:'getIntroducer.php',
				dataType:'json',
				type:'POST',
				data:{
					name:name,
					introducer:introducer,
				},
				success:function(data1){

					/*introduceContent = "<span data-toggle='collapse' href='#"+name+"introduceContentCollapse'><div>紹介("+data1.length+")</div></span><hr>";*/
					introduceContent+="<div id ='"+name+"introduceContentCollapse' class='collapse'>";
					introduceContent+="<select id='"+name+"introducerFilterSelect' class='form-control'>"+introducerString[name]+"</select>";
					introduceContent+="<hr>";
					introduceL=data1.length;
					for(var j=0;j<data1.length;j++){
						introduceContent+=(

						""+"<div style='color:"+getRankColor(edata['rank'])+";float:left;'>"+data1[j]['date']+"</div><div style='float:right'><span id='"+name+(j+1)+"editInsertIntroduce'><i class='fas fa-marker'></i></span><span style='width:11.39px;display:inline-block;'></span><span id='"+name+(j+1)+"deleteInsertIntroduce'><i class='fas fa-trash'></i></span></div>"+
						"<br>"+"<div align='left'><b>"+data1[j]['introducer']+' 〜 '+data1[j]['introduced']+"</b></div>"+
						data1[j]['conditions']+"<br>"+
						data1[j]['branch']+
						"<hr>"

									);
					}

					introduceContent+="</div>";
				},complete:function(data1){

							var titleInfo = "<span class='collapse' id='"+name+"titleInfo'>"+'<i style="color:'+getRankColor(edata['rank'])+';"class="fas fa-map-marker-alt"></i>'+(edata['address'])+""+((edata['phone']!='0'&&edata['phone']!=null)?"<br>"+'<i style="color:'+getRankColor(edata['rank'])+';"class="fas fa-mobile-alt"></i>'+" "+edata['phone']:"")+"</span>";
							var title = "<span data-toggle='collapse' href='#"+name+"titleInfo'><h6 style='color:"+getRankColor(edata['rank'])+";'>"+edata['rank']+"ランク"+edata['category']+"</h6>"+"<div><h4>"+name+"</h4></div>"+"</div>"+titleInfo+"<hr style='border:none;height:2px;background-color:"+getRankColor(edata['rank'])+";color:"+getRankColor(edata['rank'])+";'></span>";
							var introduceTitle = "<div><span style='float:left' data-toggle='collapse' id='"+name+"introduceContentCollapser'href='#"+name+"introduceContentCollapse'><b>紹介</b><span "+colorString+">("+introduceL+")</span></span><span id='"+name+"insertIntroduce' style='float:right'><i "+"class='fas fa-plus'></i></span></div><br>"+"<hr style='border:none;height:1px;background-color:"+getRankColor(edata['rank'])+";color:"+getRankColor(edata['rank'])+";'>";
							var contentTitle = "<div><span style='float:left' data-toggle='collapse' id='"+name+"contentCollapser'href='#"+name+"contentCollapse'><b>営業</b><span "+colorString+">("+contentL+")</span></span><span id='"+name+"insert' style='float:right'><i "+"class='fas fa-plus'></i></span></div><br>"+"<hr style='border:none;height:1px;background-color:"+getRankColor(edata['rank'])+";color:"+getRankColor(edata['rank'])+";'>";
							
							
							infowindow.setContent(title+introduceTitle+introduceContent+contentTitle+content);
							
							google.maps.event.addListener(infowindow,'domready',function(){


								$.each(data1.responseJSON,function(k,edata){




									$("#"+name+(k+1)+"deleteInsertIntroduce").unbind().on('click',function(){

										var confirm = window.confirm('削除しますか？');
										if(confirm){
											$.ajax({
												url:"deleteInsertIntroduce.php",
												type:'POST',
												dataType:'text',
												data:{
													name:name,
													introduced:edata['introduced'],
													introducer:edata['introducer'],
													date:edata['date'],
													conditions:edata['conditions'],
													branch:edata['branch'],

												},
												success:function(data2){
													alert('削除しました。');
													localStorage[name+'introducerFilterSelect']="%%%%";
													if(lastmarker!=null)new google.maps.event.trigger(lastmarker,'click');




												}
											})}




										})






									$("#"+name+(k+1)+"editInsertIntroduce").unbind().on('click',function(){
										var confirm = window.confirm("編集しますか？");
										if(confirm){

											infowindow.setContent("<button class='btn btn-default' id='"+name+"view'>戻る</button><hr>"/*"<hr><div align='center'><u>"+item+"</u></div><hr>"+*//*"<div align='center'><b>"+"営業入力"+"</b></div><hr>"*/+getEditInputIntroduceFormContent(name));

											google.maps.event.addListener(infowindow,'domready',function(){

												$('#'+name+"editIntroducerIntroduce").val(edata['introducer']);
												$('#'+name+"editIntroducedIntroduce").val(edata['introduced']);
												$('#'+name+"editDateIntroduce").val(edata['date']);
												$('#'+name+"editConditionsIntroduce").val(edata['conditions']);
												$('#'+name+"editBranchIntroduce").val(edata['branch']);


												$("#"+name+"editInsertIntroduceForm").submit(function(event){
													
													event.preventDefault();
													$.ajax({
														url:$("#"+name+"editInsertIntroduceForm").attr('action'),
														type:$("#"+name+"editInsertIntroduceForm").attr('method'),
														dataType:'text',
														data:{
															name:name,
															introducer:$("#"+name+"editIntroducerIntroduce").val(),
															introduced:$("#"+name+"editIntroducedIntroduce").val(),
															date:$("#"+name+"editDateIntroduce").val(),
															conditions:$("#"+name+"editConditionsIntroduce").val(),
															branch:$("#"+name+"editBranchIntroduce").val(),

														},
														complete:function(data){


															$.ajax({
																url:"deleteInsertIntroduce.php",
																type:'POST',
																dataType:'text',
																data:{
																	name:name,
																	introduced:edata['introduced'],
																	introducer:edata['introducer'],
																	date:edata['date'],
																	conditions:edata['conditions'],
																	branch:edata['branch'],


																},
																success:function(data2){
																	alert("編集しました。");


																},
																complete:function(data){
																	localStorage[name+'introducerFilterSelect']="%%%%";

																	if(lastmarker!=null)new google.maps.event.trigger(lastmarker,'click');

																	

																}
															})











														}
													})
												})


											})


										}



									})


								/*	$.ajax({
 *									url:'getInfoWindowContents.php',
 *																	dataType:'json',
 *																									type:'POST',
 *																																	data:{
 *																																										name:name,
 *																																																			mendansya:mendansya,
 *																																																											},
 *																																																																			success:function(data2){
 *
 *																																																																												console.log("is this happening?");
 *
 *																																																																																					console.log(data2);
 *
 *
 *																																																																																														console.log(infowindow);
 *																																																																																																							console.log("is listener added?");
 *																																																																																																																	
 *
 *																																																																																																																											$.each(data2,function(k,edata){
 *
 *
 *																																																																																																																																						var item = name;
 *																																																																																																																																																	var eitem = name;
 *
 *																																																																																																																																																												console.log("#"+eitem+(k+1)+"deleteInsert");
 *																																																																																																																																																																							$("#"+eitem+(k+1)+"deleteInsert").unbind().on('click',function(){
 *
 *																																																																																																																																																																																			var confirm = window.confirm("削除しますか？");
 *																																																																																																																																																																																															if(confirm){
 *
 *																																																																																																																																																																																																												$.ajax({
 *																																																																																																																																																																																																																										url:"deleteInsert.php",
 *																																																																																																																																																																																																																																								type:'POST',
 *																																																																																																																																																																																																																																																						dataType:'text',
 *																																																																																																																																																																																																																																																																				data:{
 *																																																																																																																																																																																																																																																																																			name:eitem,
 *																																																																																																																																																																																																																																																																																																		incharge:edata['incharge'],
 *																																																																																																																																																																																																																																																																																																																	date:edata['date'],
 *																																																																																																																																																																																																																																																																																																																																content:edata['content'],
 *																																																																																																																																																																																																																																																																																																																																															mendansya:edata['mendansya'],
 *
 *
 *																																																																																																																																																																																																																																																																																																																																																													},
 *																																																																																																																																																																																																																																																																																																																																																																											success:function(data){
 *																																																																																																																																																																																																																																																																																																																																																																																										alert("削除しました。");
 *																																																																																																																																																																																																																																																																																																																																																																																																									localStorage[name+'mendansyaFilterSelect']="%%%%";
 *																																																																																																																																																																																																																																																																																																																																																																																																																								if(lastmarker!=null)new google.maps.event.trigger(lastmarker,'click');
 *																																																																																																																																																																																																																																																																																																																																																																																																																																														
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																			}
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																							})}
 *
 *
 *
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																			})
 *
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																														$("#"+eitem+(k+1)+"editInsert").unbind().on('click',function(){
 *
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																										var confirm = window.confirm("編集しますか？");
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																						if(confirm){
 *
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																			infowindow.setContent("<button class='btn btn-default' id='"+item+"view'>戻る</button><hr>"+getEditInputFormContent(item));
 *
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																google.maps.event.addListener(infowindow,'domready',function(){
 *
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																														$('#'+item+"editIncharge").val(edata['incharge']);
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																												$('#'+item+"editDate").val(edata['date']);
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																										$('#'+item+"editContent").val(edata['content']);
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																								$('#'+item+"editMendansya").val(edata['mendansya']);
 *
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																						$("#"+item+"editInsertForm").submit(function(event){
 *
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																					event.preventDefault();
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																				console.log("put content:"+$("#"+item+"editContent").val());
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																			$.ajax({
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																			url:$("#"+item+"editInsertForm").attr('action'),
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																			type:$("#"+item+"editInsertForm").attr('method'),
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																			dataType:'text',
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																			data:{
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																				name:item,
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																					incharge:$("#"+item+"editIncharge").val(),
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																						date:$("#"+item+"editDate").val(),
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																							content:$("#"+item+"editContent").val(),
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																								mendansya:$("#"+item+"editMendansya").val(),
 *
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																								},
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																								complete:function(data){
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																									console.log("delete content:"+edata['content']+","+eitem+","+edata['incharge']+",");
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																										$.ajax({
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																												url:"deleteInsert.php",
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																														type:'POST',
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																dataType:'text',
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																		data:{
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																					name:eitem,
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																								incharge:edata['incharge'],
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																											date:edata['date'],
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																														content:edata['content'],
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																	mendansya:edata['mendansya'],
 *
 *
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																			},
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																					success:function(data){
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																								alert(data);
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																											alert("編集しました。");
 *
 *
 *
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																													},
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																															complete:function(data){
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																		localStorage[name+'mendansyaFilterSelect']="%%%%";
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																					if(lastmarker!=null)new google.maps.event.trigger(lastmarker,'click');
 *
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																							}
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																								})
 *
 *
 *
 *
 *
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																								}
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																							})
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																					})
 *
 *
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																		})
 *
 *
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																														}
 *
 *
 *
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																									})
 *
 *
 *
 *
 *
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																			})
 *
 *
 *
 *
 *
 *
 *
 *
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																											}
 *
 *																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																		})*/
















								})

		$.ajax({
								url:'getInfoWindowContents.php',
								dataType:'json',
								type:'POST',
								data:{
									name:name,
									mendansya:mendansya,
								},
								success:function(data2){

									console.log("is this happening?");

									console.log(data2);


									console.log(infowindow);
									console.log("is listener added?");
										

										$.each(data2,function(k,edata){


											var item = name;
											var eitem = name;

											console.log("#"+eitem+(k+1)+"deleteInsert");
											$("#"+eitem+(k+1)+"deleteInsert").unbind().on('click',function(){

												var confirm = window.confirm("削除しますか？");
												if(confirm){

													$.ajax({
														url:"deleteInsert.php",
														type:'POST',
														dataType:'text',
														data:{
															name:eitem,
															incharge:edata['incharge'],
															date:edata['date'],
															content:edata['content'],
															mendansya:edata['mendansya'],


														},
														success:function(data){
															alert("削除しました。");
															localStorage[name+'mendansyaFilterSelect']="%%%%";
															if(lastmarker!=null)new google.maps.event.trigger(lastmarker,'click');
																						
																					}
																				})}



												})

											$("#"+eitem+(k+1)+"editInsert").unbind().on('click',function(){

												var confirm = window.confirm("編集しますか？");
												if(confirm){

													infowindow.setContent("<button class='btn btn-default' id='"+item+"view'>戻る</button><hr>"+getEditInputFormContent(item));

													google.maps.event.addListener(infowindow,'domready',function(){

														$('#'+item+"editIncharge").val(edata['incharge']);
														$('#'+item+"editDate").val(edata['date']);
														$('#'+item+"editContent").val(edata['content']);
														$('#'+item+"editMendansya").val(edata['mendansya']);

														$("#"+item+"editInsertForm").submit(function(event){

															event.preventDefault();
															console.log("put content:"+$("#"+item+"editContent").val());
															$.ajax({
																url:$("#"+item+"editInsertForm").attr('action'),
																type:$("#"+item+"editInsertForm").attr('method'),
																dataType:'text',
																data:{
																	name:item,
																	incharge:$("#"+item+"editIncharge").val(),
																	date:$("#"+item+"editDate").val(),
																	content:$("#"+item+"editContent").val(),
																	mendansya:$("#"+item+"editMendansya").val(),

																},
																complete:function(data){
																	console.log("delete content:"+edata['content']+","+eitem+","+edata['incharge']+",");
																	$.ajax({
																		url:"deleteInsert.php",
																		type:'POST',
																		dataType:'text',
																		data:{
																			name:eitem,
																			incharge:edata['incharge'],
																			date:edata['date'],
																			content:edata['content'],
																			mendansya:edata['mendansya'],


																		},
																		success:function(data){
																			alert(data);
																			alert("編集しました。");



																		},
																		complete:function(data){
																			localStorage[name+'mendansyaFilterSelect']="%%%%";
																			if(lastmarker!=null)new google.maps.event.trigger(lastmarker,'click');

																		}
																	})





																}
															})
														})


													})


												}



											})





										})








								}

							})


							})








							



						}
					})

}
})
}

function putCurrentAddress(callback){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			var pos={
				lat:position.coords.latitude,
				lng:position.coords.longitude
			};

			geocoder = new google.maps.Geocoder();
			geocoder.geocode({'location':pos},function(results,status){
				if(status == google.maps.GeocoderStatus.OK){
					if(results[0]){


						if(callback)callback(results[0].formatted_address);
					}
				}
			})





		})
	}
}

function getRankColor(rank){
	return rank=='S'?scolor:rank=='A'?acolor:rank=='B'?bcolor:rank=='C'?ccolor:rank=='D'?dcolor:branchcolor;
}


function calculateRoute(){

	var origin;
	console.log("from text = "+$('#from option:selected').text());
	if($('#from').val()=="現在地"){
		console.log("genzaichi from");
		putCurrentAddress(function(address){
			origin=address;
			afterOriginGet();


		});
	}else{
		console.log("no genzaichi from");
		origin=$("#from").val();
		afterOriginGet();
	}
	

	function afterOriginGet(){
		console.log("afterOriginGet");
		console.log("origin = "+origin);
		var waypoints=[];
		var checkboxArray = document.getElementById("waypoints");
		for(var i = 0; i < checkboxArray.length;i++){
			if(checkboxArray.options[i].selected){
				waypoints.push({
					location:checkboxArray[i].value,
					stopover:true
				});
			}
		}



		var directionsService = new google.maps.DirectionsService();
		var directionsRequest = {
			origin: origin,
			destination: $('#to').val(),
			waypoints:waypoints,
			travelMode: google.maps.DirectionsTravelMode.DRIVING,
			optimizeWaypoints:true,


		}
		directionsService.route(
			directionsRequest,
			function(response,status){


				if(status == google.maps.DirectionsStatus.OK){

					originStr = "";

					originStr='origin='+response.routes[0].legs[0].start_location+"&";

					var waypointsStr = 'waypoints=';
					var destinationStr = 'destination=';
					for(var i =0;i<response.routes[0].legs.length;i++){
						if(i<response.routes[0].legs.length-1){
							waypointsStr+=response.routes[0].legs[i].end_location;
						}
						if(i<response.routes[0].legs.length-1-1){
							waypointsStr+="|";
						}else if(i==response.routes[0].legs.length-1-1){
							waypointsStr+="&";
						}
						if(i==response.routes[0].legs.length-1){
							destinationStr+=response.routes[0].legs[i].end_location;
						}

					}

					var startingurl="https";

					/*if 
 * 						((navigator.platform.indexOf("iPhone") != -1) || 
 * 													(navigator.platform.indexOf("iPad") != -1) || 
 * 																				(navigator.platform.indexOf("iPod") != -1)){
 * 																											startingurl="https";
 * 																																	}else{
 * 																																								startingurl="https";
 * 																																														}*/



						window.open(startingurl+"://maps.google.com/maps/dir/?api=1&dir_action=navigate&"+originStr+waypointsStr+destinationStr);
				/*
 * 				directionsRenderer.setDirections(response);
 * 								directionsRenderer.setMap(map);*/
			}

		})

	}
}

/*
 * function addressLatLng(address,boundsBool,markerBool){
 * 	
 * 		if(address=="現在地"){
 * 				if(navigator.geolocation){
 * 							navigator.geolocation.getCurrentPosition(function(position){
 * 											var pos={
 * 																lat:position.coords.latitude,
 * 																					lng:position.coords.longitude
 * 																									};
 * 																													if(boundsBool){
 * 																																	bounds.extend(pos);
 * 																																					map.fitBounds(bounds);
 * 																																								}
 * 																																											if(markerBool){
 * 																																															addMarker(pos);
 * 																																																		}
 *
 * 																																																					})
 * 																																																							}
 * 																																																								}
 * 																																																									
 * 																																																										geocoder = new google.maps.Geocoder();
 * 																																																											geocoder.geocode({'address':address},function(results,status){
 * 																																																													if(status == google.maps.GeocoderStatus.OK){
 * 																																																																if(markerBool){
 * 																																																																				
 * 																																																																								addMarker(results[0].geometry.location);
 * 																																																																											}
 * 																																																																														if(boundsBool){
 *
 * 																																																																																		bounds.extend(results[0].geometry.location);
 * 																																																																																						map.fitBounds(bounds);
 * 																																																																																									}
 * 																																																																																												
 * 																																																																																															
 * 																																																																																																		var listener = google.maps.event.addListener(map, "idle", function() { 
 * 																																																																																																		  if (map.getZoom() >= 22) map.setZoom(20); 
 * 																																																																																																		    google.maps.event.removeListener(listener); 
 * 																																																																																																		    });
 * 																																																																																																		    			
 * 																																																																																																		    					} else{
 * 																																																																																																		    								
 * 																																																																																																		    										}
 * 																																																																																																		    											})
 * 																																																																																																		    											}*/

var positionCount = 0;

function addressLatLng(address,boundsBool,markerBool,category,rank,callback){
	
	
	if(address=="現在地"){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function(position){
				var pos={
					lat:position.coords.latitude,
					lng:position.coords.longitude
				};
				if(boundsBool){
					bounds.extend(pos);
					map.fitBounds(bounds);
				}
				if(markerBool){
					addMarker(address,pos,category,rank);
				}

			})
		}
	}else{

		var taddress = address;

		/*kaka*/

		$.ajax({
			url:'getaddressjson.php',
			dataType:'json',
			type:'POST',
			data:{
				address:taddress,
			},
			success:function(data){
				console.log(taddress);
				if(data.length>0)
					for(var i = 0; i < data.length;i++){

						var addressCache = data[i]['json'];

						var position={
							lat:$.parseJSON(addressCache)['lat'],
							lng:$.parseJSON(addressCache)['lng']
						}
						if(positionCount<totalPositions){
							positionCount+=1;
						}


							


							console.log(positionCount+"/"+totalPositions);
							$('#positionCountDiv').empty().end();
							console.log($('#positionCountDiv'));
							$('#positionCountDiv').append(positionCount+"/"+totalPositions);
							if(positionCount==totalPositions){
								/*$('#positionCountDiv').empty().end();*/
							}
							console.log(position);

							if(markerBool){



								addMarker(taddress,position,category,rank);
								if(callback)callback();
							}
							if(boundsBool){

								bounds.extend(position);
								map.fitBounds(bounds);
							}


							var listener = google.maps.event.addListener(map, "idle", function() { 
								if (map.getZoom() >= 22) map.setZoom(20); 
								google.maps.event.removeListener(listener); 
							});

							

if((positionCount==totalPositions)&&positionCount!=0){


if(markerCluster!=null){
	markerCluster.clearMarkers();
}
							console.log('positionCount==totalPositions');
							console.log('map:'+map);
							console.log('markers:'+markers);

							markerCluster = new MarkerClusterer(map,markers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
							console.log('markerCluster:'+markerCluster);
						}

						}
						if(data.length==0){

							geocoder = new google.maps.Geocoder();
							geocoder.geocode({'address':taddress},function(results,status){

								if(status == google.maps.GeocoderStatus.OK){

									var json=JSON.stringify({
										lat:results[0].geometry.location.lat(),
										lng:results[0].geometry.location.lng()
									});


									/*localStorage[address+"json"]=json;*/

									$.ajax({
										url:'insertaddressjson.php',
										dataType:'json',
										type:'POST',
										data:{
											address:taddress,
											json:json,

										},
										success:function(data){

										},complete:function(data){



										}
									})

									if(markerBool){



										addMarker(taddress,results[0].geometry.location,category,rank);
										if(callback)callback();
									}
									if(boundsBool){

										bounds.extend(results[0].geometry.location);
										map.fitBounds(bounds);
									}


									var listener = google.maps.event.addListener(map, "idle", function() { 
										if (map.getZoom() >= 22) map.setZoom(20); 
										google.maps.event.removeListener(listener); 
									});

								} else{

								}
							})
						}
					}

				})



/*
 * 		var addressCache = localStorage[address+"json"]||'defaultValue';
 * 				
 * 						if(addressCache=='defaultValue'){
 * 							
 * 								geocoder = new google.maps.Geocoder();
 * 									geocoder.geocode({'address':address},function(results,status){
 *
 * 											if(status == google.maps.GeocoderStatus.OK){
 *
 * 														var json=JSON.stringify({
 * 																		lat:results[0].geometry.location.lat(),
 * 																						lng:results[0].geometry.location.lng()
 * 																									});
 *
 *
 * 																											localStorage[address+"json"]=json;
 *
 * 																													$.ajax({
 * 																																url:'insertaddressjson.php',
 * 																																			dataType:'json',
 * 																																						type:'POST',
 * 																																									data:{
 * 																																													address:address,
 * 																																																	json:json,
 * 																																																					
 * 																																																								},
 * 																																																											success:function(data){
 * 																																																															
 * 																																																																		},complete:function(data){
 *
 * 																																																																						
 *
 * 																																																																									}
 * 																																																																											})
 * 																																																																													
 * 																																																																																if(markerBool){
 *
 * 																																																																																				
 * 																																																																																								
 * 																																																																																												addMarker(results[0].geometry.location,category,rank);
 * 																																																																																																if(callback)callback();
 * 																																																																																																			}
 * 																																																																																																						if(boundsBool){
 *
 * 																																																																																																										bounds.extend(results[0].geometry.location);
 * 																																																																																																														map.fitBounds(bounds);
 * 																																																																																																																	}
 * 																																																																																																																				
 * 																																																																																																																							
 * 																																																																																																																										var listener = google.maps.event.addListener(map, "idle", function() { 
 * 																																																																																																																										  if (map.getZoom() >= 22) map.setZoom(20); 
 * 																																																																																																																										    google.maps.event.removeListener(listener); 
 * 																																																																																																																										    });
 * 																																																																																																																										    			
 * 																																																																																																																										    					} else{
 * 																																																																																																																										    								
 * 																																																																																																																										    										}
 * 																																																																																																																										    											})}else{
 * 																																																																																																																										    													var position={
 * 																																																																																																																										    																lat:$.parseJSON(localStorage[address+"json"])['lat'],
 * 																																																																																																																										    																			lng:$.parseJSON(localStorage[address+"json"])['lng']
 * 																																																																																																																										    																					}
 *
 * 																																																																																																																										    																							if(markerBool){
 *
 * 																																																																																																																										    																											
 * 																																																																																																																										    																															
 * 																																																																																																																										    																																			addMarker(position,category,rank);
 * 																																																																																																																										    																																							if(callback)callback();
 * 																																																																																																																										    																																										}
 * 																																																																																																																										    																																													if(boundsBool){
 *
 * 																																																																																																																										    																																																	bounds.extend(position);
 * 																																																																																																																										    																																																					map.fitBounds(bounds);
 * 																																																																																																																										    																																																								}
 * 																																																																																																																										    																																																											
 * 																																																																																																																										    																																																														
 * 																																																																																																																										    																																																																	var listener = google.maps.event.addListener(map, "idle", function() { 
 * 																																																																																																																										    																																																																	  if (map.getZoom() >= 22) map.setZoom(20); 
 * 																																																																																																																										    																																																																	    google.maps.event.removeListener(listener); 
 * 																																																																																																																										    																																																																	    });
 *
 *
 * 																																																																																																																										    																																																																	    }kaka*/

}
}


var rad = function(x) {
	return x * Math.PI / 180;
};

function getDistance(p1, p2) {
	var R = 6378137; /*Earth’s mean radius in meter*/
	var dLat = rad(p2.lat - p1.lat);
	var dLong = rad(p2.lng - p1.lng);
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
	Math.sin(dLong / 2) * Math.sin(dLong / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	return d; /* returns the distance in meter*/
};







