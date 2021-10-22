//Valentina Gonzalez 63503 y Santiago Varela 63421 

import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  5000,
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
let loader = new GLTFLoader();

let car;
let hlight;
let directionalLight;
let light;
let light2;
let light3;
let light4;


document.body.onload = () => {
  main();
};

window.onresize = () => {
  scene.background = new THREE.Color(0xdddddd);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth * 0.8, window.innerHeight, true);
};

export function reset() {
  scene.children = [];
  renderer.setSize(0, 0, true);
}

export function main() {
  reset();
  
  // Configuracion inicial
  renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
  renderer.shadowMap.enabled = true;
  scene.background = new THREE.Color(0xdddddd);
  document.body.appendChild(renderer.domElement);

  // Visual Configs
  cameraConfig();
  controlsConfig();

  // Light
  setupLights();

  // Modelo
  loadInitialModel();

}

function loadInitialModel() {
  loader.load(
    'assets/modelOne/scene.gltf',
    function (gltf) {
      car = gltf.scene.children[0];
      scene.add(car);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );
}

// Funcion Cargar Modelos

export function changeModel(assetFolder) {
  scene.children = [];
  // Light
  setupLights();
  loader.load(
    `assets/${assetFolder}/scene.gltf`,
    function (gltf) {
      car = gltf.scene.children[0];
      scene.add(car);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );
}

//Funcion Cargar Texturas

export function changeTexture(textura) {
  //Se añade la funcion de texturas dentro de la funcion changeTexture para poder indicarle el valor "textura" del index
  // Funcion de Texturas

  const textureLoader = new THREE.TextureLoader();
  const map = textureLoader.load(
  `assets/${textura}/texture1.jpg`, //Todas las texturas se llaman texture1.jpg en sus respectivas carpetas.
  );
  
  map.encoding = THREE.sRGBEncoding;
  map.flipY = false;


  car.traverse(function (node) {
    if (node instanceof THREE.Mesh) {
      node.material.map = map;
    }
  });
  //car.material = new THREE.MeshPhongMaterial({ map: map, color: 0xff00ff });
  animate();
}

function controlsConfig() {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  controls.enablePan = false;
}

function cameraConfig() {
  camera.position.x = 8;
  camera.position.y = 2;
  camera.position.z = 8;
}

//Configuracion de Luces.

function setupLights() {
  hlight = new THREE.AmbientLight(0x404040, 20);
  scene.add(hlight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 20);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  light = new THREE.PointLight(0xc4c4c4, 1.5);
  light.position.set(0, 300, 500);
  scene.add(light);

  light2 = new THREE.PointLight(0xc4c4c4, 1.5);
  light2.position.set(500, 100, 0);
  scene.add(light2);

  light3 = new THREE.PointLight(0xc4c4c4, 1.5);
  light3.position.set(0, 100, -500);
  scene.add(light3);

  light4 = new THREE.PointLight(0xc4c4c4, 1.5);
  light4.position.set(-500, 300, 500);
  scene.add(light4);
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}