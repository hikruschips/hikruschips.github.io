<!DOCTYPE html>
<html>
<head>
  <title>Simple Map</title>
  
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta charset="utf-8">
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

<link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
<script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.js"></script>
  

  <script src="simplemapv5test.js"></script>

<style>
  
  select, textarea, input[type="text"], input[type="password"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="number"], input[type="email"], input[type="url"], input[type="search"], input[type="tel"], input[type="color"] { font-size: 16px; }
  
  #nameSelect{
    width:100%;
  }
  #prefectures{

    position:absolute;
    top:8px;
    height:34px;
    left:8px;


  }
  #map{


  height: 100%;
}
  .floating-panel{

    margin:0px;
    position: absolute;
    top: 62px;
    left:10%;
    z-index:5;
    
    
    
    width:80%;
    
    
    
    
  }
  .form-control{
    font-size:16px;
  }



html,body{
  height:100%;
  margin:0;
  padding:0;
}
body{
  padding-top: 52px;
}

</style>

</head>
<body>

  <nav class="navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">

      <select class="custom-select my-1 mr-sm-2" id="prefectures">
  </select>


  
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false" id="markerMenuButton">
        <span class="sr-only">Toggle navigation</span>
        マーカー
      </button>

      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navigationCollapse" aria-expanded="false" id="navigationMenuButton">
        <span class="sr-only">Toggle navigation</span>
        ナビ
      </button>

      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#graphCollapse" aria-expanded="false" id="graphMenuButton">
        <span class="sr-only">Toggle navigation</span>
        グラフ
      </button>


      
    </div>

    <div class="collapse navbar-collapse" id="graphCollapse">

      

      <div class="nav navbar-nav">

          
          <div>
          <select class="form-control" id="graphSelect" name="graphSelect">
            <optgroup label="個別営業数">
              <option value="個人月別">個人月別</option>
              
              <option value="月間個人別">月間個人別</option>
            
            </optgroup>
            <optgroup label="紹介数">
              <option value="紹介属性">紹介属性</option>
              <option value="紹介先">紹介先</option>
              <option value="全紹介統計">全紹介統計</option>
            </optgroup>
            <optgroup label="広告費用帯効果">
              <option value="広告費用帯効果">広告費用帯効果</option>
            </optgroup>
            
          </select>
          </div>
          <div>
            <div id="graphOptions">
              ha
            </div>
            <canvas id="graphCanvas"></canvas>
          </div>

          

          

        
     
      
    </div>


    </div>



    <div class="collapse navbar-collapse" id="navigationCollapse">

      

      <div class="nav navbar-nav">

          出発地
          <select class="form-control" id="from" name="from"></select>
          到着地
          <select class="form-control" multiple id="waypoints" name="waypoints"></select>
          最終地
          <select class="form-control" id="to" name="to"></select>

          <span  data-toggle="collapse" data-target="#navigationCollapse" >
          <input type="checkbox" data-toggle="toggle" data-on="オン" data-off="オフ" id="navigationSubmit" unchecked >
        </span>



        
     
      
    </div>


    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">




<!-- -->
<a class="nav navbar-nav" data-toggle="collapse" href="#temp_marker" role="button">マーカー表示</a>


    <div class="collapse" id="temp_marker">

      
        <label>
          病院
          <input type="checkbox" data-toggle="toggle" data-on="表示" data-off="非表示" id="hospitalMarker" checked>
          
        </label>
        <br>
        <label>
          老人保健施設
        <input type="checkbox" data-toggle="toggle" data-on="表示" data-off="非表示" id="rouMarker" checked>
          
        </label>
        <br>
        <label>
          居宅介護支援事業所
        <input type="checkbox" data-toggle="toggle" data-on="表示" data-off="非表示" id="jyuuMarker" checked>
          
        </label>
        <br>
        <label>
          その他
        <input type="checkbox" data-toggle="toggle" data-on="表示" data-off="非表示" id="otherMarker"checked>
          
        </label>
     
      
    </div>

<!-- navigation -->

      
  <!-- -->

    <a class="nav navbar-nav" data-toggle="collapse" href="#addr_form" role="button">アドレス入力</a>


    <div class="collapse" id="addr_form">
      

        <div class="form-group">
        <label class="my-1 mr-2" for="inlineFormCustomSelectPref">カテゴリー：</label>
  <select  class="custom-select my-1 mr-sm-2" id="destinationCategory">
    <option selected>病院</option>
    <option value="1">老人保健施設</option>
    <option value="2">居宅介護支援事業所</option>
    <option value="3">その他</option>
    
  </select>
        </div>

        <div class="form-group">
          <label>拠点：</label>
          <input type="text" class="form-control" id="destinationCity">
        </div>

        <div class="form-group">
          <label>名前：</label>
          <input type="text" class="form-control" id="destinationName">
        </div>

        <div class="form-group">
          <label>住所：</label>
          <input type="text" class="form-control" id="destinationAddress">
        </div>

        <div class="form-group">
          <label>ランク：</label>
          <select  class="custom-select my-1 mr-sm-2" id="destinationRank">
            <option value="1">S</option>
            <option value="2">A</option>
            <option value="3">B</option>
            <option value="4">C</option>
            <option value="5">D</option>
          </select>
        </div>

        <div class="form-group">
          <label>電話番号：</label>
          <input type="text" class="form-control" id="destinationPhone">
        </div>

        <div class="form-group">
          <label>fax：</label>
          <input type="text" class="form-control" id="destinationFax">
        </div>

        
        <button class="btn btn-default" id="destinationButton">入力</button>

       
    </div>

    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>



  <div class="floating-panel">
  
      
     <select id="nameSelect">
  </select>
</div>


<div id="map"></div>
  
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA71qjxNbOg2c3ZIiSzY1rMe2BMUZ-jCoI&language=ja&region=JP&libraries=places&callback=initMap"async defer></script>
  


</body>
</html>
