import './style.css'

// TODO: R eset the canvas when the window is resized

import * as THREE from 'three' // Import the Three.js library

const scene = new THREE.Scene() // Create a new Three.js scene

const camera = new THREE.PerspectiveCamera(
  75, // Field of view, 360 degrees
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane (VIEW FRUSTUM)
  1000 // Far clipping plane (VIEW FRUSTUM)

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
