scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);
//render
renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var sol = new THREE.DirectionalLight( 0xffffff , 1.5);
sol.position.set( -10, 5, 0 ).normalize();
scene.add(sol);
scene.add(new THREE.AmbientLight(0x404040))
var geoTierra = new THREE.SphereGeometry( 10, 32, 32);
var material = new THREE.MeshPhongMaterial( { ambient: 0x050505, color: 0x0033ff, specular: 0x555555, shininess: 30 });
//enlazo geometría y material
meshTierra = new THREE.Mesh( geoTierra, material );
//colocamos y añadimos a la escena.
meshTierra.position.z = -50;
scene.add( meshTierra );
var geoTierra = new THREE.SphereGeometry( 10, 32, 32);
//creamos una textura
var txTierra = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('img/tierra.jpg') } );
//enlazamos geometría y textura.
meshTierra = new THREE.Mesh( geoTierra, txTierra );
//colocamos y añadimos a la escena.
meshTierra.position.z = -50;
scene.add( meshTierra );
//anima el movimiento de la Tierra.
function animate() {
    meshTierra.rotation.y += .01;
    render();
    requestAnimationFrame( animate );
}
//renderiza la escena en la cámara.
function render() {
    renderer.render( scene, camera );
}
//cambia el tamaño en función del tamaño de la ventana.
function onWindowResize() {
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
   renderer.setSize( window.innerWidth, window.innerHeight );
   render();
}