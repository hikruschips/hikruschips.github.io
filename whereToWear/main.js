var camera;
var canvas = document.getElementById('canvas');

(function(){

  initBody();


  var width = window.innerWidth,
      height = window.innerHeight;

  /*scene*/

  var scene = new THREE.Scene();

  /*mesh*/

  var geometry = new THREE.SphereGeometry( 5, 60, 40 );
    geometry.scale( - 1, 1, 1 );

  
  var material = new THREE.MeshBasicMaterial( {
       map: new THREE.TextureLoader().load('https://hikruschips.github.io/whereToWear/goldenLouvre.jpg') /*THREE.ImageUtils.loadTexture( 'https://github.com/hikruschips/vr/blob/master/hongkong-stereo.jpg' )*/
  } );

  var sphere = new THREE.Mesh( geometry, material );
  scene.add( sphere );


  /*camera*/


/*1000 how far to infinity*/
  camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
  
  camera.position.set(0,0,0.1);
  camera.lookAt(sphere.position);


  /*render*/

  var renderer = new THREE.WebGLRenderer();
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


})();

function initBody(){


}

function setPerspective(){

  camera.fov = 75;
  camera.position.set(0,0,0.1);
  camera.updateProjectionMatrix();

}

function setLittlePlanet(){

  

  canvas.innerHTML='';

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



