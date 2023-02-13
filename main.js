import './style.css'

// TODO: Reset the canvas when the window is resized

// Import the Three.js library
import * as THREE from 'three'

// Import the OrbitControls library
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Create a new Three.js scene
const scene = new THREE.Scene()

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
  100,
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
 * @desc A material is a collection of properties that define how a surface reacts to light. There are many materials available in Three.js. We will use MeshStandardMaterial, which is a physically based material that is designed to work with lights. It needs light sources to be visible
 * @param {Object} color - The color of the material
 * @param {Object} wireframe - A 3D model that is represented by a set of lines, rather than by a set of polygons.
 * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
 */
const material = new THREE.MeshStandardMaterial({
  color: 0xf983ff, // ? 0x is the hexadecimal prefix
  // wireframe: true,
})

// Create a new Three.js mesh by combining the geometry and material
const torus = new THREE.Mesh(geometry, material)

// Add the mesh to the scene
scene.add(torus)

/**
 * Create a new Three.js light
 * @desc A light is an object that emits light. There are many lights available in Three.js. We will use PointLight, which emits light in all directions from a single point.
 * @param {Object} color - The color of the light
 * @see https://threejs.org/docs/#api/en/lights/PointLight
 */
const pointLight = new THREE.PointLight(0xfddad3)
pointLight.position.set(14, 16, 5) // Set the position of the light (x, y, z)

/**
 * Create a new Three.js ambient light
 * @desc This light globally illuminates all objects in the scene equally.
 * @param {Object} color - The color of the light
 * @see https://threejs.org/docs/#api/en/lights/AmbientLight
 */
const ambientLight = new THREE.AmbientLight(0x5ab5fa)

scene.add(pointLight, ambientLight)

/**
 * Create a new Three.js helper
 * @desc A helper is an object that visualizes some aspect of a parent object. There are many helpers available in Three.js. We will use PointLightHelper, which visualizes the position of a PointLight.
 * @param {Object} light - The light to visualize
 * @see https://threejs.org/docs/#api/en/helpers/PointLightHelper
 */
const lightHelper = new THREE.PointLightHelper(pointLight)

/**
 * Create a new Three.js grid helper
 * @desc A helper is an object that visualizes grids. Grids are two-dimensional arrays of lines.
 * @param {Number} size - The size of the grid
 * @param {Number} divisions - The number of divisions in the grid
 * @see https://threejs.org/docs/#api/en/helpers/GridHelper
 */
const gridHelper = new THREE.GridHelper(200, 50)

scene.add(lightHelper, gridHelper) // !

/**
 * Create a new Three.js orbit controls
 * @desc Orbit controls allow the camera to orbit around a target
 * @param {Object} object - The object to orbit around
 * @param {Object} domElement - The DOM element to listen for mouse events
 * @see https://threejs.org/docs/#examples/en/controls/OrbitControls
 */
const controls = new OrbitControls(camera, renderer.domElement)

// Generate random stars
function addStar() {
  // Create a new Three.js mesh
  // SphereGeometry(radius, widthSegments, heightSegments)
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  // Generate random x, y, z coordinates - fill the array with 3 empty elements, then map over the array ad fill the array with random numbers
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100))
  // ? randFloatSpread: Returns a random float between 0 and given value

  // Set the position of the star
  star.position.set(x, y, z)
  scene.add(star)
}

// Add 200 stars - fill the array with 200 empty elements, then call the addStar function 200 times
Array(200).fill().forEach(addStar)

// Add a background image
const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture

// Add texture mapping
// @see https://threejs.org/docs/#api/en/textures/Texture
const emanueleTexture = new THREE.TextureLoader().load('emanuele.png')

const emanuele = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: emanueleTexture })
)
// emanuele.rotateY(0.5)
// emanuele.rotateX(-0.1)
// emanuele.rotateZ(-0.03)
// emanuele.scale.x = 1.5
// emanuele.scale.y = 1.5

scene.add(emanuele)

// Add a normal map - a normal map is a texture that is used to simulate the direction of the surface of an object. It is used to create the illusion of depth and detail on a flat surface.
const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
)

moon.position.z = 30
moon.position.setX(-10) // setX does the same as .x

scene.add(moon)

// Move camera and objects when scrolling
function moveCamera() {
  // get the scroll position
  const t = document.body.getBoundingClientRect().top

  // move moon
  moon.rotation.x += 0.05
  moon.rotation.y += 0.075
  moon.rotation.z += 0.05

  // move avatar
  emanuele.rotation.y += 0.01
  emanuele.rotation.z += 0.01

  // move camera
  // ? t is negative so we need to multiply by negative number
  camera.position.z = t * -0.01
  camera.position.x = t * -0.0002
  camera.position.y = t * -0.0002

  // NOTE: Play with the values to adjust the animation
}
document.body.onscroll = moveCamera

// Render the scene (game loop)
function animate() {
  requestAnimationFrame(animate)

  // Every shape that we create has different properties that we can manipulate. For example, we can rotate the torus by 0.01 radians every frame.
  torus.rotation.x += 0.01
  torus.rotation.y += 0.008
  torus.rotation.z += 0.01
  // torus.scale.x += 0.01

  // emanuele.rotation.y += 0.005

  // Call controls update method to update the camera position
  controls.update()

  renderer.render(scene, camera)
}

animate()
