/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Engine_1 = __webpack_require__(1);
	var Viewport_1 = __webpack_require__(3);
	function main() {
	    // Create rendering context and attach it to the document
	    var renderer = new THREE.WebGLRenderer({ antialias: true });
	    renderer.setSize(Viewport_1.Viewport.SCREEN_WIDTH, Viewport_1.Viewport.SCREEN_HEIGHT);
	    document.body.appendChild(renderer.domElement);
	    // Start game engine
	    Engine_1.Engine.start(renderer, new THREE.Scene());
	}
	main();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Camera_1 = __webpack_require__(2);
	var Ground_1 = __webpack_require__(4);
	var Lighting_1 = __webpack_require__(5);
	var Skybox_1 = __webpack_require__(6);
	var Texture_1 = __webpack_require__(7);
	var Assets_1 = __webpack_require__(8);
	var Marble_1 = __webpack_require__(9);
	var Engine = (function () {
	    function Engine() {
	    }
	    Engine.start = function (renderer, scene) {
	        var camera = Camera_1.Camera.create();
	        scene.add(camera);
	        camera.lookAt(scene.position);
	        Lighting_1.Lighting.initCamLight(scene);
	        Texture_1.Texture.load(Assets_1.Assets.FLOOR_TEXTURE).then(function (texture) {
	            Ground_1.Ground.init(texture, scene);
	        });
	        Skybox_1.Skybox.init(scene);
	        scene.add(Marble_1.Marble.createMesh());
	        function animate() {
	            requestAnimationFrame(animate);
	            render();
	        }
	        function render() {
	            renderer.render(scene, camera);
	        }
	        animate();
	    };
	    return Engine;
	}());
	exports.Engine = Engine;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Viewport_1 = __webpack_require__(3);
	var Camera = (function () {
	    function Camera() {
	    }
	    Camera.create = function () {
	        var cam = new THREE.PerspectiveCamera(Viewport_1.Viewport.FOV, Viewport_1.Viewport.ASPECT_RATIO, Viewport_1.Viewport.NEAR, Viewport_1.Viewport.FAR);
	        cam.position.set(0, 150, 400);
	        return cam;
	    };
	    return Camera;
	}());
	exports.Camera = Camera;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var Viewport = {
	    SCREEN_WIDTH: window.innerWidth,
	    SCREEN_HEIGHT: window.innerHeight,
	    FOV: 45,
	    ASPECT_RATIO: window.innerWidth / window.innerHeight,
	    NEAR: 0.1,
	    FAR: 1000
	};
	exports.Viewport = Viewport;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var Ground = (function () {
	    function Ground() {
	    }
	    Ground.init = function (tex, scene) {
	        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
	        tex.repeat.set(10, 10);
	        var floorMaterial = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide });
	        var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	        floor.position.y = -0.5;
	        floor.rotation.x = Math.PI / 2;
	        scene.add(floor);
	    };
	    return Ground;
	}());
	exports.Ground = Ground;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var Lighting = (function () {
	    function Lighting() {
	    }
	    Lighting.initCamLight = function (scene) {
	        var light = new THREE.PointLight(0xffffff);
	        light.position.set(100, 250, 100);
	        scene.add(light);
	    };
	    return Lighting;
	}());
	exports.Lighting = Lighting;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	var Skybox = (function () {
	    function Skybox() {
	    }
	    Skybox.init = function (scene) {
	        var skyBoxGeometry = new THREE.CubeGeometry(1000, 1000, 1000);
	        var skyBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x9999ff, side: THREE.BackSide });
	        var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
	        scene.add(skyBox);
	    };
	    return Skybox;
	}());
	exports.Skybox = Skybox;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	var Texture = (function () {
	    function Texture() {
	    }
	    Texture.load = function (url) {
	        var loader = new THREE.TextureLoader();
	        return Promise.resolve(loader.load(url));
	    };
	    return Texture;
	}());
	exports.Texture = Texture;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	var Assets = {
	    FLOOR_TEXTURE: 'assets/grasslight-big.jpg'
	};
	exports.Assets = Assets;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	var Marble = (function () {
	    function Marble() {
	    }
	    Marble.createMesh = function () {
	        var geometry = new THREE.SphereGeometry(30, 32, 16);
	        var material = new THREE.MeshLambertMaterial({ color: 0x000088 });
	        var mesh = new THREE.Mesh(geometry, material);
	        mesh.position.set(0, 40, 0);
	        return mesh;
	    };
	    return Marble;
	}());
	exports.Marble = Marble;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map