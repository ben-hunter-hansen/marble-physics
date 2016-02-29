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
	var Util_1 = __webpack_require__(11);
	var Config_1 = __webpack_require__(14);
	function main() {
	    // Create rendering context and attach it to the document
	    var renderer = new THREE.WebGLRenderer({ antialias: true });
	    renderer.setSize(Config_1.ViewportDefaults.SCREEN_WIDTH, Config_1.ViewportDefaults.SCREEN_HEIGHT);
	    document.body.appendChild(renderer.domElement);
	    var loader = new Util_1.TextureLoader();
	    loader.loadAll([Config_1.AssetPaths.Ground.URL]).then(function (textures) {
	        init(renderer, textures);
	    });
	}
	function init(renderer, textures) {
	    // Initialize game engine
	    var engine = new Engine_1.Engine(renderer)
	        .setTextures(textures)
	        .setKeyboard(new Util_1.Keyboard())
	        .setCamera(Engine_1.Camera.create(Config_1.ViewportDefaults))
	        .setScene(new THREE.Scene())
	        .initCameraAndScene();
	    engine.start();
	}
	main();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Camera_1 = __webpack_require__(2);
	exports.Camera = Camera_1.Camera;
	var Lighting_1 = __webpack_require__(3);
	exports.Lighting = Lighting_1.Lighting;
	var AssetPaths_1 = __webpack_require__(4);
	var World_1 = __webpack_require__(5);
	exports.Skybox = World_1.Skybox;
	exports.Ground = World_1.Ground;
	/**
	 *  driver class for the marble game
	 */
	var Engine = (function () {
	    function Engine(renderer) {
	        this.renderer = renderer;
	    }
	    Engine.prototype.setTextures = function (textures) {
	        this.textures = textures;
	        return this;
	    };
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
	        var ground = new World_1.Ground(this.textures[AssetPaths_1.AssetPaths.Ground.ID]);
	        var skybox = new World_1.Skybox();
	        var marble = new World_1.Marble();
	        ground.attachTo(this.scene);
	        skybox.attachTo(this.scene);
	        marble.attachTo(this.scene);
	        return this;
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
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var AssetPaths = {
	    Ground: { ID: 0, URL: 'assets/grasslight-big.jpg' }
	};
	exports.AssetPaths = AssetPaths;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Marble_1 = __webpack_require__(6);
	exports.Marble = Marble_1.Marble;
	var Ground_1 = __webpack_require__(9);
	exports.Ground = Ground_1.Ground;
	var Skybox_1 = __webpack_require__(10);
	exports.Skybox = Skybox_1.Skybox;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Types_1 = __webpack_require__(7);
	var Marble = (function (_super) {
	    __extends(Marble, _super);
	    function Marble(config) {
	        _super.call(this);
	        this.config = config ? config : Marble.DEFAULT_MESH_CONFIG;
	        this.mesh = new THREE.Mesh(this.config.geometry, this.config.material);
	        this.mesh.position.set(0, 40, 0);
	    }
	    Marble.prototype.attachTo = function (scene) {
	        scene.add(this.mesh);
	    };
	    Marble.prototype.getPosition = function () {
	        return this.mesh.position;
	    };
	    Marble.prototype.setPosition = function (pos) {
	        this.mesh.position.set(pos.x, pos.y, pos.z);
	    };
	    Marble.DEFAULT_MESH_CONFIG = {
	        material: new THREE.MeshLambertMaterial({ color: 0x000088 }),
	        geometry: new THREE.SphereGeometry(30, 32, 16)
	    };
	    return Marble;
	}(Types_1.Mesh));
	exports.Marble = Marble;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Mesh_1 = __webpack_require__(8);
	exports.Mesh = Mesh_1.Mesh;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	var Mesh = (function () {
	    function Mesh() {
	    }
	    return Mesh;
	}());
	exports.Mesh = Mesh;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Types_1 = __webpack_require__(7);
	var Ground = (function (_super) {
	    __extends(Ground, _super);
	    function Ground(texture, config) {
	        _super.call(this);
	        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	        texture.repeat.set(10, 10);
	        this.config = {
	            material: new THREE.MeshBasicMaterial({
	                map: texture, side: THREE.DoubleSide
	            }),
	            geometry: new THREE.PlaneGeometry(1000, 1000, 10, 10)
	        };
	        this.mesh = new THREE.Mesh(this.config.geometry, this.config.material);
	        this.mesh.position.y = -0.5;
	        this.mesh.rotation.x = Math.PI / 2;
	    }
	    Ground.prototype.attachTo = function (scene) {
	        scene.add(this.mesh);
	    };
	    Ground.prototype.getPosition = function () {
	        return this.mesh.position;
	    };
	    Ground.prototype.setPosition = function (pos) {
	        this.mesh.position.set(pos.x, pos.y, pos.z);
	    };
	    return Ground;
	}(Types_1.Mesh));
	exports.Ground = Ground;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Mesh_1 = __webpack_require__(8);
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
	    Skybox.prototype.getPosition = function () {
	        return this.mesh.position;
	    };
	    Skybox.prototype.setPosition = function (pos) {
	        this.mesh.position.set(pos.x, pos.y, pos.z);
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Keyboard_1 = __webpack_require__(12);
	exports.Keyboard = Keyboard_1.Keyboard;
	var TextureLoader_1 = __webpack_require__(13);
	exports.TextureLoader = TextureLoader_1.TextureLoader;


/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports) {

	"use strict";
	var TextureLoader = (function () {
	    function TextureLoader() {
	    }
	    TextureLoader.prototype.loadAll = function (urls) {
	        var loader = new THREE.TextureLoader();
	        var promises = urls.map(function (url) {
	            return Promise.resolve(loader.load(url));
	        });
	        return Promise.all(promises);
	    };
	    TextureLoader.prototype.load = function (url) {
	        var loader = new THREE.TextureLoader();
	        return Promise.resolve(loader.load(url));
	    };
	    return TextureLoader;
	}());
	exports.TextureLoader = TextureLoader;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var AssetPaths_1 = __webpack_require__(4);
	exports.AssetPaths = AssetPaths_1.AssetPaths;
	var ViewportDefaults_1 = __webpack_require__(15);
	exports.ViewportDefaults = ViewportDefaults_1.ViewportDefaults;


/***/ },
/* 15 */
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