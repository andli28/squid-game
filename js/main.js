const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//set background color. First arg is the color, second arg is the opacity
renderer.setClearColor( 0xb7c3f3, 1);

//add light
const light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.z = 5;


//load model and scene
const loader = new THREE.GLTFLoader();

class Doll{
    constructor(){
        loader.load("../models/scene.gltf", (gltf) =>{ //arrow function because we want "this" to point to this class 
            scene.add(gltf.scene);
            gltf.scene.scale.set(0.4, 0.4, 0.4);
            gltf.scene.position.set(0, -1, 0);
            this.doll = gltf.scene;
        })
    }

    lookBackward(){
        //this.doll.rotation.y = -3.15;
        gsap.to(this.doll.rotation, {y: -3.15, duration: .45})
    }

    lookForward(){
        //this.doll.rotation.y = 0;
        gsap.to(this.doll.rotation, {y: 0, duration: .45})
    }

}

//make new doll object
let doll = new Doll();

//set a timeout of 1 second so scene has time to load
setTimeout(() => {
    doll.lookBackward()
}, 1000);


//update model automatically over time, creating an animation
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();


//resize the screen whenever window size changes
window.addEventListener( 'resize', onWindowResize, false);

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}