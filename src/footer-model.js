import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Initialize Three.js components
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, 400);
document.getElementById("bunny-container").appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xff0000, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xff0000, 0.6);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(-5, 5, 0);
scene.add(directionalLight);

// Create the orbit controls and bind them to the camera
const controls = new OrbitControls(camera, renderer.domElement);

// Load the bunny model with Draco compression
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.4.1/"
);
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.load(
  "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/bunny/model.gltf",
  (gltf) => {
    scene.add(gltf.scene);
  },
  undefined,
  (error) => {
    console.error(error);
  }
);

// Set the background color of the scene
renderer.setClearColor(0xffffff);

// Set the position of the camera and update it with the orbit controls
camera.position.z = 5;
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
