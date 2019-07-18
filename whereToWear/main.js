var camera;
var canvas = document.getElementById('canvas');
//var canvas2 = document.getElementById('canvas2');//for little planet
var texture;
var material;
var renderer;
var imageHeight;
var imageWidth;
var scene;
var littlePlanetBool = false;
var viewer;

var imgSrc = 'https://hikruschips.github.io/whereToWear/goldenLouvre.jpg';
var littlePlanet;

(function(){

  


  var width = window.innerWidth,
      height = window.innerHeight;

  /*scene*/

  scene = new THREE.Scene();

  /*mesh*/

  var geometry = new THREE.SphereGeometry( 5, 60, 40 );
    geometry.scale( - 1, 1, 1 );

  texture = new THREE.TextureLoader().load(imgSrc) /*THREE.ImageUtils.loadTexture( 'https://github.com/hikruschips/vr/blob/master/hongkong-stereo.jpg' )*/
  material = new THREE.MeshBasicMaterial( {
       map: texture
  } );


  var sphere = new THREE.Mesh( geometry, material );
  scene.add( sphere );


  /*camera*/


/*1000 how far to infinity*/
  camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
  
  camera.position.set(0,0,0.1);
  camera.lookAt(sphere.position);


  /*render*/

  //antialias removes jaggies
  renderer = new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer: true});
  renderer.setSize(width,height);
  renderer.setClearColor({color: 0x000000});

  canvas.setAttribute('style','width:100%;height:100%;');
  viewer = new PANOLENS.Viewer( { container:canvas,controlBar: false} );

  littlePlanet = new PANOLENS.ImageLittlePlanet(imgSrc);
  viewer.add(littlePlanet);

  //document.getElementById('canvas').appendChild(renderer.domElement);
  

  renderer.render(scene,camera);

  /*control*/

  var cameraMode = document.getElementById('cameraMode');

  cameraMode.addEventListener('change',function(){
    var value = cameraMode.value;

    if(value =='fisheye'){setFishEye();}
    else if(value =='perspective'){setPerspective();}
    else if(value=='littlePlanet'){setLittlePlanet();}
    else if(value=='flat'){};

  })

  var controls = new THREE.OrbitControls(camera,renderer.domElement);

  function render(){
    requestAnimationFrame(render);
    sphere.rotation.y += 0.05 * Math.PI/180;
    /*画面リサイズ対応*/
    window.addEventListener( 'resize', onWindowResize, false );
    renderer.render(scene,camera);
    controls.update();
  }
  render();


  function onWindowResize() {
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }


  addEventListeners();


})();

function addEventListeners(){

  addUserImageEventListener();
  addCaptureButtonEventListener();
  
}

function addUserImageEventListener(){
  var image = document.createElement('img');
  
  image.onload = function(){

    material.map = new THREE.TextureLoader().load(image.src);
    imageHeight = image.height;
    imageWidth = image.width;
    texture.needsUpdate = true;
    material.needsUpdate = true;
    material.map.needsUpdate = true;

    


  };

  var userImage = document.getElementById('userImage');

  userImage.addEventListener('change',function(){

    var reader = new FileReader();

    reader.onload = function(e){
      image.src = e.target.result;
      imgSrc = e.target.result;
      littlePlanet.updateTexture(new THREE.TextureLoader().load(imgSrc));
      littlePlanet.reset();
    }
    reader.readAsDataURL(userImage.files[0]);

  });
}

function addCaptureButtonEventListener(){
  document.getElementById('captureButton').addEventListener('click',function(){
    saveAsImage(renderer);
  });
}



function setPerspective(){

  notLittlePlanetSetting();
  littlePlanetBool = false;
  camera.fov = 75;
  camera.position.set(0,0,0.1);
  camera.updateProjectionMatrix();

}

function setLittlePlanet(){

  littlePlanetSetting();
  

  /*if(viewer==null){
    console.log('null');
  viewer = new PANOLENS.Viewer( { container: canvas2} );
  //littlePlanet already set
  littlePlanet = new PANOLENS.ImageLittlePlanet(imgSrc);//incase ingsrc changed from previous first one and then little planet called
  viewer.add(littlePlanet);

}else{

  viewer.remove(littlePlanet);//remove old little planet
  littlePlanet = new PANOLENS.ImageLittlePlanet(imgSrc);
  viewer.add(littlePlanet);//add new little planet
}*/

littlePlanet.updateTexture(new THREE.TextureLoader().load(imgSrc));
littlePlanet.reset();
  
}


function setFishEye(){

  camera.fov = 140;
  camera.position.set(0,0,0.1);/*position reset if it was littlePlanetBefore*/
  camera.updateProjectionMatrix();

}

function setFlat(){


}

function littlePlanetSetting(){
  
  littlePlanetBool = true;
}
function notLittlePlanetSetting(){
  
  littlePlanetBool = false;
}


function saveAsImage(renderer) {
  //saves image 
        var imgData, imgNode;

        try {
            var strDownloadMime = "image/octet-stream"; 
            var strMime = "image/jpeg";

            camera.aspect = imageWidth/imageHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(imageWidth,imageHeight);
            renderer.render(scene,camera);

            //imgData = renderer.domElement.toDataURL(strMime);

            imgData = renderer.domElement.toBlob(function(blob){
              saveAs(blob,"Final");
            });
            //saveFile(imgData.replace(strMime, strDownloadMime), "test.jpg");

        } catch (e) {
            console.log(e);
            return;
        }

    }

//var a = function doesnt use directly
var saveFile = function (strData, filename) {
        var link = document.createElement('a');
        if (typeof link.download === 'string') {
            document.body.appendChild(link); //Firefox requires the link to be in the body
            link.download = filename;
            link.href = strData;
            link.click();
            document.body.removeChild(link); //remove the link when done
        } else {
            location.replace(uri);
        }
    }



