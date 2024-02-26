// 
// IMPORTS 
// 
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.19.0/+esm';

// 
// TEXTURES 
// 
var loader = new THREE.TextureLoader();
var backgroundTexture = loader.load('sky.jpg');

// 
// UTILS 
// 
let sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}
let aspectRatio = sizes.width / sizes.height;
const canvas = document.querySelector('canvas.webgl');

// 
// SCENE 
// 
const scene = new THREE.Scene();
scene.background = backgroundTexture;

// 
// OBJECTS 
// 
let torusKnotMesh = new THREE.Mesh(new THREE.TorusKnotGeometry(1, 0.4, 64, 20, 2, 3), new THREE.MeshStandardMaterial({ color: 'white', flatShading: false }));
scene.add(torusKnotMesh);

// 
// LIGHTS 
// 
let ambientLight = new THREE.AmbientLight('white', 1);
scene.add(ambientLight);

let directionalLight = new THREE.DirectionalLight('white', 6);
directionalLight.position.z = 10;
directionalLight.position.y = 2;
scene.add(directionalLight);

// 
// CAMERA 
// 
let camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 100);
camera.position.z = 10;
camera.position.y = 2;
camera.position.x = 3;
scene.add(camera);

// 
// RENDERER 
// 
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// 
// CONTROLS 
// 
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

// 
// RESIZE HANDLE 
// 
window.addEventListener('resize', () => {
    sizes.height = window.innerHeight;
    sizes.width = window.innerWidth;

    renderer.setSize(sizes.width, sizes.height);
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
})

// 
// ANIMATION 
// 
let clock = new THREE.Clock();

let animation = () => {
    let deltaTimeSinceBeginning = clock.getElapsedTime();

    torusKnotMesh.rotation.x = deltaTimeSinceBeginning * 0.75;
    torusKnotMesh.rotation.y = deltaTimeSinceBeginning * 0.75;

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
}

animation()