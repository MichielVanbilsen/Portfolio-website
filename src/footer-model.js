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
document.getElementById("bunny-container").appendChild(renderer.domElement);

const container = document.getElementById("bunny-container");

const width = container.clientWidth;
const height = container.clientHeight;

renderer.setSize(width, height);

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

// Set up the raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Track the mouse position
document.addEventListener('mousemove', event => {
  // Calculate normalized device coordinates from the pixel coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Create the orbit controls and bind them to the camera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

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
    const model = gltf.scene;
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error(error);
  }
);

// Set the background color of the scene
renderer.setClearColor(0xffffff);

// Set the position of the camera and update it with the orbit controls
camera.position.z = 3;
camera.position.y = 2;
camera.position.x = -1;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
