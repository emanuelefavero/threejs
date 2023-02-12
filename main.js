import './style.css'

// TODO: R eset the canvas when the window is resized

import * as THREE from 'three' // Import the Three.js library

const scene = new THREE.Scene() // Create a new Three.js scene

/**
 * Create a new Three.js camera
 *
 * @desc A camera is an object that defines the position and orientation of the viewer in the scene. There are many cameras available in Three.js.
 * @param {Number} fov - Field of view, 360 degrees
 * @param {Number} aspect - Aspect ratio
 * @param {Number} near - Near clipping plane (VIEW FRUSTUM)
 * @param {Number} far - Far clipping plane (VIEW FRUSTUM)
 * @see https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000

  // ? Near clipping plane (0.1): This determines the minimum distance from the camera that objects will be drawn. Objects closer to the camera than the near clipping plane will not be visible.
  // ? Far clipping plane (1000): This determines the maximum distance from the camera that objects will be drawn. Objects farther from the camera than the far clipping plane will not be visible.
)

// Create the component that actually draws the 3D scene on the screen
const renderer = new THREE.WebGLRenderer({
  // render to the canvas element with the id 'bg'
  canvas: document.querySelector('#bg'),
})

// Set the pixel ratio of the renderer to the device's pixel ratio
renderer.setPixelRatio(window.devicePixelRatio)

// Set the size of the renderer to the size of the window
renderer.setSize(window.innerWidth, window.innerHeight)

// move the camera back (on the Z axis) so we can view the scene
camera.position.setZ(30)

// DRAW render
renderer.render(scene, camera)

/**
 * Create a new Three.js geometry
 * @desc A geometry is a collection of vertices, faces, and other elements that describe the shape of an object. There are many geometries available in Three.js.
 * @param {Number} radius - Radius of the torus, from the center of the torus to the center of the tube. Default is 100.
 * @param {Number} tube - Diameter of the tube. Default is 40.
 * @param {Number} radialSegments - Default is 8
 * @param {Number} tubularSegments - Default is 6
 * @see https://threejs.org/docs/#api/en/geometries/TorusGeometry
 */
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)

/**
 * Create a new Three.js material
 *
 * @desc MeshBasicMaterial is a material for non-shiny (matte) surfaces with no specular highlights. There are many materials available in Three.js.
 * @param {Object} color - The color of the material
 * @param {Object} wireframe - A 3D model that is represented by a set of lines, rather than by a set of polygons.
 * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
 */
const material = new THREE.MeshBasicMaterial({
  color: 0x5983ff,
  wireframe: true,
})

// Create a new Three.js mesh by combining the geometry and material
const torus = new THREE.Mesh(geometry, material)

// Add the mesh to the scene
scene.add(torus)

// Render the scene (game loop)
function animate() {
  requestAnimationFrame(animate)

  // Every shape that we create has different properties that we can manipulate. For example, we can rotate the torus by 0.01 radians every frame.
  torus.rotation.x += 0.01
  torus.rotation.y += 0.008
  torus.rotation.z += 0.01
  // torus.scale.x += 0.01

  renderer.render(scene, camera)
}

animate()
