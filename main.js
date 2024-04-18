import gsap from "gsap/gsap-core";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// scene
const scene = new THREE.Scene();
console.log("scene", scene);

// Crated sphere
// const geometry = new THREE.IcosahedronGeometry(1.0, 2);
// const geometry = new THREE.SphereGeometry(1.0, 32, 32);
// const geometry = new THREE.BoxGeometry(1, 1, 1);
const geometry = new THREE.OctahedronGeometry(1.0, 0);
// const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#f00cca",
  // color: "#00ff83",
  // color: "#800080 ",
  roughness: 0.5,
  metalness: 0.5,
  flatShading: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
console.log("mesh", mesh);

// wireframe mesh
const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});

const wireMesh = new THREE.Mesh(geometry, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

// llght;

// const hemiLight = new THREE.HemisphereLight(0x111111, 0xffd700);
const hemiLight = new THREE.HemisphereLight(0x111111, 0xffffff);
scene.add(hemiLight);

// const light = new THREE.AmbientLight(0xffffff); // soft white light
// scene.add(light);

// console.log("light", light);
// Camera

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
// camera.position.set(0, 0, 3);
camera.position.z = 2;
scene.add(camera);
console.log("camera", camera);

// render
const canvas = document.querySelector(".webgl");
console.log("canvas", canvas);
const renderer = new THREE.WebGLRenderer({ canvas });

// renderer.render(scene, camera);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
controls.enablePan = false;
controls.enableZoom = false;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 8;

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Update the sphere rotation
  // mesh.rotation.x += 0.005;
  // mesh.rotation.y += 0.005;
  controls.update();
  renderer.render(scene, camera);
}

animate();

// Get the center of the screen
const center = { x: sizes.width / 2, y: sizes.height / 2 };

// Function to update cube rotation based on mouse position
function updateCubeRotation(event) {
  // Calculate the offset of mouse position from the center
  const offsetX = event.clientX - center.x;
  const offsetY = event.clientY - center.y;

  // Calculate rotation angles based on mouse position
  const rotationY = (Math.atan2(offsetX, sizes.height) * 180) / Math.PI;
  const rotationX = (Math.atan2(offsetY, sizes.width) * 180) / Math.PI;

  // Set cube rotation
  mesh.rotation.y = (rotationY * Math.PI) / 180;
  mesh.rotation.x = (-rotationX * Math.PI) / 180;
}

// Add mousemove event listener to update cube rotation
window.addEventListener("mousemove", updateCubeRotation);

// gsap animation
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
// tl.fromTo("nav", { x: 0, y: 0, z: 0 }, { z: 1, x: 1, y: 1 });
// tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });
// tl.fromTo(".title", { x: 0, y: 0, z: 0 }, { z: 1, x: 1, y: 1 });
