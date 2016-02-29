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
	var Util_1 = __webpack_require__(7);
	var Config_1 = __webpack_require__(13);
	function main() {
	    // Create rendering context and attach it to the document
	    var renderer = new THREE.WebGLRenderer({ antialias: true });
	    renderer.setSize(Config_1.ViewportDefaults.SCREEN_WIDTH, Config_1.ViewportDefaults.SCREEN_HEIGHT);
	    document.body.appendChild(renderer.domElement);
	    // Initialize game engine
	    var engine = new Engine_1.Engine(renderer)
	        .setKeyboard(new Util_1.Keyboard())
	        .setCamera(Engine_1.Camera.create(Config_1.ViewportDefaults))
	        .setScene(new THREE.Scene())
	        .initCameraAndScene();
	    // Carry out async initializations,
	    // then begin the game loop
	    engine.drawGroud()
	        .then(function (engine) { return engine.drawSkybox(new Engine_1.Skybox()); })
	        .then(function (engine) { return engine.createWorld(); })
	        .then(function (engine) { return engine.start(); });
	}
	main();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Camera_1 = __webpack_require__(2);
	exports.Camera = Camera_1.Camera;
	var Ground_1 = __webpack_require__(3);
	exports.Ground = Ground_1.Ground;
	var Lighting_1 = __webpack_require__(4);
	exports.Lighting = Lighting_1.Lighting;
	var Skybox_1 = __webpack_require__(5);
	exports.Skybox = Skybox_1.Skybox;
	var Util_1 = __webpack_require__(7);
	var AssetPaths_1 = __webpack_require__(10);
	var World_1 = __webpack_require__(11);
	/**
	 * Singleton driver class for the marble game
	 */
	var Engine = (function () {
	    function Engine(renderer) {
	        this.renderer = renderer;
	    }
	    Engine.prototype.setCamera = function (camera) {
	        this.camera = camera;
	        return this;
	    };
	    Engine.prototype.setScene = function (scene) {
	        this.scene = scene;
	        return this;
	    };
	    Engine.prototype.setKeyboard = function (keyboard) {
	        this.keyboard = keyboard;
	        return this;
	    };
	    Engine.prototype.initCameraAndScene = function () {
	        this.scene.add(this.camera);
	        this.camera.lookAt(this.scene.position);
	        Lighting_1.Lighting.initCamLight(this.scene);
	        return this;
	    };
	    Engine.prototype.drawGroud = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            var texLoader = new Util_1.TextureLoader();
	            texLoader.load(AssetPaths_1.AssetPaths.FLOOR_TEXTURE).then(function (texture) {
	                Ground_1.Ground.init(texture, _this.scene);
	                resolve(_this);
	            });
	        });
	    };
	    Engine.prototype.drawSkybox = function (skybox) {
	        skybox.attachTo(this.scene);
	        // This will be async at some point
	        return Promise.resolve(this);
	    };
	    Engine.prototype.createWorld = function () {
	        var world = new World_1.World(this.scene);
	        world.init();
	        // This will be async at some point
	        return Promise.resolve(this);
	    };
	    Engine.prototype.render = function () {
	        this.renderer.render(this.scene, this.camera);
	    };
	    Engine.prototype.animate = function () {
	        var _this = this;
	        requestAnimationFrame(function () { return _this.animate(); });
	        this.render();
	    };
	    Engine.prototype.start = function () {
	        this.animate();
	    };
	    return Engine;
	}());
	exports.Engine = Engine;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var Camera = (function () {
	    function Camera() {
	    }
	    Camera.create = function (config) {
	        var cam = new THREE.PerspectiveCamera(config.FOV, config.ASPECT_RATIO, config.NEAR, config.FAR);
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
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Mesh_1 = __webpack_require__(6);
	var Skybox = (function (_super) {
	    __extends(Skybox, _super);
	    function Skybox(config) {
	        _super.call(this);
	        this.config = config ? config : Skybox.DEFAULT_MESH_CONFIG;
	        this.mesh = new THREE.Mesh(this.config.geometry, this.config.material);
	    }
	    Skybox.prototype.attachTo = function (scene) {
	        scene.add(this.mesh);
	    };
	    Skybox.DEFAULT_MESH_CONFIG = {
	        material: new THREE.MeshBasicMaterial({
	            color: 0x9999ff,
	            side: THREE.BackSide
	        }),
	        geometry: new THREE.CubeGeometry(1000, 1000, 1000)
	    };
	    return Skybox;
	}(Mesh_1.Mesh));
	exports.Skybox = Skybox;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	var Mesh = (function () {
	    function Mesh() {
	    }
	    return Mesh;
	}());
	exports.Mesh = Mesh;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Keyboard_1 = __webpack_require__(8);
	exports.Keyboard = Keyboard_1.Keyboard;
	var TextureLoader_1 = __webpack_require__(9);
	exports.TextureLoader = TextureLoader_1.TextureLoader;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	var Keyboard = (function () {
	    function Keyboard(element) {
	        var _this = this;
	        this.keyStates = {
	            87: { ascii: "w", pressed: false },
	            65: { ascii: "a", pressed: false },
	            83: { ascii: "s", pressed: false },
	            67: { ascii: "d", pressed: false }
	        };
	        this.element = element || document;
	        this.element.addEventListener("keydown", function (e) {
	            if (e.keyCode in _this.keyStates)
	                _this.setKeyState(e);
	        });
	        this.element.addEventListener("keyup", function (e) {
	            if (e.keyCode in _this.keyStates)
	                _this.setKeyState(e);
	        });
	    }
	    Keyboard.prototype.setKeyState = function (e) {
	        this.keyStates[e.keyCode].pressed = (e.type === 'keydown');
	    };
	    Keyboard.prototype.isKeyPressed = function (key) {
	        return this.keyStates[Keyboard.KEYS[key]].pressed;
	    };
	    Keyboard.KEYS = {
	        "w": 87,
	        "a": 65,
	        "s": 83,
	        "d": 67
	    };
	    return Keyboard;
	}());
	exports.Keyboard = Keyboard;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	var TextureLoader = (function () {
	    function TextureLoader() {
	    }
	    TextureLoader.prototype.load = function (url) {
	        var loader = new THREE.TextureLoader();
	        return Promise.resolve(loader.load(url));
	    };
	    return TextureLoader;
	}());
	exports.TextureLoader = TextureLoader;


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	var AssetPaths = {
	    FLOOR_TEXTURE: 'assets/grasslight-big.jpg'
	};
	exports.AssetPaths = AssetPaths;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Marble_1 = __webpack_require__(12);
	var World = (function () {
	    function World(scene) {
	        this.scene = scene;
	    }
	    World.prototype.init = function () {
	        this.scene.add(Marble_1.Marble.createMesh());
	    };
	    return World;
	}());
	exports.World = World;


/***/ },
/* 12 */
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


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var AssetPaths_1 = __webpack_require__(10);
	exports.AssetPaths = AssetPaths_1.AssetPaths;
	var ViewportDefaults_1 = __webpack_require__(14);
	exports.ViewportDefaults = ViewportDefaults_1.ViewportDefaults;


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	var ViewportDefaults = {
	    SCREEN_WIDTH: window.innerWidth,
	    SCREEN_HEIGHT: window.innerHeight,
	    FOV: 45,
	    ASPECT_RATIO: window.innerWidth / window.innerHeight,
	    NEAR: 0.1,
	    FAR: 1000
	};
	exports.ViewportDefaults = ViewportDefaults;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map