var camera;
var canvas = document.getElementById('canvas');

var texture;
var material;
var renderer;
(function(){

  


  var width = window.innerWidth,
      height = window.innerHeight;

  /*scene*/

  var scene = new THREE.Scene();

  /*mesh*/

  var geometry = new THREE.SphereGeometry( 5, 60, 40 );
    geometry.scale( - 1, 1, 1 );

  texture = new THREE.TextureLoader().load('https://hikruschips.github.io/whereToWear/goldenLouvre.jpg') /*THREE.ImageUtils.loadTexture( 'https://github.com/hikruschips/vr/blob/master/hongkong-stereo.jpg' )*/
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

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width,height);
  renderer.setClearColor({color: 0x000000});
  document.getElementById('canvas').appendChild(renderer.domElement);
  

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



  var image = document.createElement('img');
  
  image.onload = function(){

    material.map = new THREE.TextureLoader().load(image.src);
    texture.needsUpdate = true;
    material.needsUpdate = true;
    material.map.needsUpdate = true;



  };

  var userImage = document.getElementById('userImage');

  userImage.addEventListener('change',function(){

    var reader = new FileReader();

    reader.onload = function(e){
      image.src = e.target.result;
    }
    reader.readAsDataURL(userImage.files[0]);

  });



  document.getElementById('captureButton').addEventListener('click',function(){
    saveAsImage(renderer);
  });
}



function setPerspective(){

  camera.fov = 75;
  camera.position.set(0,0,0.1);
  camera.updateProjectionMatrix();

}

function setLittlePlanet(){

  

  //canvas.innerHTML='';
  //for test panolens
  var canvas2 = document.getElementById('canvas2');
  var viewer = new PANOLENS.Viewer( { controlBar: false,container: canvas} );
  var littlePlanet = new PANOLENS.ImageLittlePlanet('https://s3-ap-northeast-1.amazonaws.com/hikruschips/vr/goldenLouvre.jpg');

  
}

function setFishEye(){


  camera.fov = 140;
  camera.position.set(0,0,0.1);/*position reset if it was littlePlanetBefore*/
  camera.updateProjectionMatrix();

}

function setFlat(){


}

function saveAsImage(renderer) {
  //saves image 
        var imgData, imgNode;

        try {
            var strDownloadMime = "image/octet-stream"; 
            var strMime = "image/jpeg";
            imgData = renderer.domElement.toDataURL(strMime);

            saveFile(imgData.replace(strMime, strDownloadMime), "test.jpg");

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



