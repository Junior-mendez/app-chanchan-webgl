
var scene,camera,renderer,mixer;
var WIDTH,HEIGHT,controls;
var clock = new THREE.Clock();
 // Crear renderizador
function initRenderer(){
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    renderer = new THREE.WebGLRenderer({animation:true});
    renderer.setSize(WIDTH,HEIGHT);
    renderer.setPixelRatio(WIDTH/HEIGHT);
    renderer.setClearColor(0xeeeeee);
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
}
 // Crear escena
function initScene(){
    scene = new THREE.Scene();
}
 // Crear cámara
function initCamera(){
    camera = new THREE.PerspectiveCamera(50,WIDTH/HEIGHT,1,10000);
    camera.position.set(0,300,350);
    camera.lookAt(0,0,0);
         // Crear controlador
    controls = new THREE.OrbitControls( camera, renderer.domElement );
}
 // Crear luz
function initLight(){
         // luz ambiental
    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );
         // Luz paralela
    light = new THREE.DirectionalLight(0xffffff);
    scene.add(light);
}
 
function initObject(){
 
         // Suelo
    var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0xffffff, depthWrite: false } ) );
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add( mesh );
 
         // Agregar secante de piso
    var grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add( grid );
}
 // Carga el modelo y reproduce la primera animación
 function initLoad(){
    var loader  = new THREE.FBXLoader();
    loader.load("models/machupicchu/machu pichu.fbx", function (mesh) {
        
        scene.add(mesh);
                 // AnimationMixer Animation Mixer es un reproductor para la animación de objetos específicos en la escena. Cuando varios objetos de la escena se animan de forma independiente, cada objeto puede utilizar el mismo mezclador de animación.
        mixer = new THREE.AnimationMixer( mesh );
        console.log(mesh.animations.length);
        for(var i = 0 ; i < mesh.animations.length; i++){
            var action = mixer.clipAction( mesh.animations[ i ] );
            action.stop();
        }
                 // clipAction devuelve AnimationAction del parámetro clip pasado, el parámetro del objeto raíz es opcional y el valor predeterminado es el objeto raíz predeterminado del mezclador.
                 // El primer parámetro puede ser un objeto AnimationClip o el nombre de un clip de animación.
        mixer.clipAction( mesh.animations[ 0 ] ).play();
        
    });
}

 
function initThree(){
    
    initRenderer();
    initScene();
    initCamera();
    initLight();
    initObject();
    initLoad();
    animation();
}
 
function animation(){
    requestAnimationFrame(animation);
    renderer.render(scene,camera);
    controls.update();
    var time = clock.getDelta();
         // actualiza avanza el tiempo del mezclador y actualiza la animación 
    if (mixer) {
 
        mixer.update(time);
 
    }
}