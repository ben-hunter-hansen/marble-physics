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
	var Util_1 = __webpack_require__(5);
	var Config_1 = __webpack_require__(16);
	function main() {
	    // Create rendering context and attach it to the document
	    var renderer = new THREE.WebGLRenderer({ antialias: true });
	    renderer.setSize(Config_1.ViewportDefaults.SCREEN_WIDTH, Config_1.ViewportDefaults.SCREEN_HEIGHT);
	    document.body.appendChild(renderer.domElement);
	    var loader = new Util_1.TextureLoader();
	    loader.loadAll([Config_1.AssetPaths.Textures.Ground.URL]).then(function (textures) {
	        init(renderer, textures);
	    });
	}
	function init(renderer, textures) {
	    // Initialize game engine
	    var engine = new Engine_1.Engine(renderer)
	        .setTextures(textures)
	        .setKeyboard(new Util_1.Keyboard())
	        .setCamera(new Engine_1.Camera(Config_1.ViewportDefaults))
	        .setScene(new THREE.Scene())
	        .initPhysics()
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
	var Physics_1 = __webpack_require__(3);
	var Lighting_1 = __webpack_require__(4);
	exports.Lighting = Lighting_1.Lighting;
	var Util_1 = __webpack_require__(5);
	var AssetPaths_1 = __webpack_require__(9);
	var World_1 = __webpack_require__(10);
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
	        var _this = this;
	        this.scene.add(this.camera);
	        Lighting_1.Lighting.initCamLight(this.scene);
	        this.ground = new World_1.Ground(this.textures[AssetPaths_1.AssetPaths.Textures.Ground.ID]);
	        this.skybox = new World_1.Skybox();
	        this.marble = new World_1.Marble();
	        this.ground.attachTo(this.scene);
	        this.skybox.attachTo(this.scene);
	        this.marble.attachTo(this.scene);
	        this.camera.addTarget({
	            name: 'marble',
	            targetObject: this.marble.getMesh(),
	            cameraPosition: new THREE.Vector3(0, 8, 30),
	            fixed: false,
	            stiffness: 0.1,
	            matchRotation: true
	        });
	        this.camera.setTarget('marble');
	        this.physics.track(this.marble);
	        // Add test mesh
	        var loader = new Util_1.MeshLoader();
	        loader.load(AssetPaths_1.AssetPaths.Models.Ramp).then(function (mesh) {
	            _this.scene.add(mesh);
	            _this.physics.setCollidables([mesh]);
	        });
	        this.physics.setGroundY(this.ground.getPosition().y);
	        this.physics.startClock();
	        return this;
	    };
	    Engine.prototype.initPhysics = function () {
	        this.physics = new Physics_1.Physics(new THREE.Clock());
	        return this;
	    };
	    Engine.prototype.update = function () {
	        if (this.keyboard.isKeyPressed('w')) {
	            this.marble.moveForward(1);
	        }
	        else if (this.keyboard.isKeyPressed('s')) {
	            this.marble.moveBackward(1);
	        }
	        if (this.keyboard.isKeyPressed('a')) {
	            this.marble.turnLeft(Math.PI / 180);
	        }
	        else if (this.keyboard.isKeyPressed('d')) {
	            this.marble.turnRight(Math.PI / 180);
	        }
	        this.camera.update();
	        this.physics.update();
	    };
	    Engine.prototype.render = function () {
	        this.renderer.render(this.scene, this.camera);
	    };
	    Engine.prototype.animate = function () {
	        var _this = this;
	        requestAnimationFrame(function () { return _this.animate(); });
	        this.render();
	        this.update();
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

	/**
	 * TypeScript implementation for this:
	 * https://github.com/squarefeet/THREE.TargetCamera
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Camera = (function (_super) {
	    __extends(Camera, _super);
	    function Camera(config) {
	        _super.call(this, config.FOV, config.ASPECT_RATIO, config.NEAR, config.FAR);
	        this.targets = {};
	        this.targetOrder = [];
	        this.currentTargetName = null;
	        this.idealObject = new THREE.Object3D();
	        this.isTransitioning = false;
	        this.defaults = {
	            name: null,
	            targetObject: new THREE.Object3D(),
	            cameraPosition: new THREE.Vector3(0, 30, 50),
	            cameraRotation: undefined,
	            fixed: false,
	            stiffness: 0.4,
	            matchRotation: true
	        };
	        this.updateProjectionMatrix();
	    }
	    Camera.prototype.translateIdealObject = function (vec) {
	        var obj = this.idealObject;
	        if (vec.x !== 0)
	            obj.translateX(vec.x);
	        if (vec.y !== 0)
	            obj.translateY(vec.y);
	        if (vec.z !== 0)
	            obj.translateZ(vec.z);
	    };
	    Camera.prototype.createNewTarget = function () {
	        var defaults = this.defaults;
	        return {
	            name: defaults.name,
	            targetObject: defaults.targetObject,
	            cameraPosition: defaults.cameraPosition,
	            cameraRotation: defaults.cameraRotation,
	            fixed: defaults.fixed,
	            stiffness: defaults.stiffness,
	            matchRotation: defaults.matchRotation
	        };
	    };
	    Camera.prototype.determineCameraRotation = function (rotation) {
	        var ret = null;
	        if (rotation instanceof THREE.Euler)
	            ret = new THREE.Quaternion().setFromEuler(rotation);
	        else
	            ret = rotation;
	        return ret;
	    };
	    Camera.prototype.addTarget = function (settings) {
	        var target = this.createNewTarget();
	        for (var prop in settings) {
	            if (target.hasOwnProperty(prop)) {
	                if (prop === 'cameraRotation')
	                    target[prop] = this.determineCameraRotation(settings[prop]);
	                else
	                    target[prop] = settings[prop];
	            }
	        }
	        this.targets[settings.name] = target;
	        this.targetOrder.push(settings.name);
	    };
	    Camera.prototype.setTarget = function (name) {
	        if (this.targets.hasOwnProperty(name))
	            this.currentTargetName = name;
	        else
	            console.warn("Camera.setTarget: No target with name: " + name);
	    };
	    Camera.prototype.removeTarget = function (name) {
	        var targets = this.targets;
	        var targetOrder = this.targetOrder;
	        if (targetOrder.length === 1) {
	            console.warn('Camera: Will not remove only existing camera target.');
	        }
	        else if (targets.hasOwnProperty(name)) {
	            targetOrder.splice(targetOrder.indexOf(name), 1);
	            targets[name] = null;
	        }
	        this.setTarget(targetOrder[targetOrder.length - 1]);
	    };
	    Camera.prototype.update = function () {
	        var target = this.targets[this.currentTargetName];
	        var ideal = this.idealObject;
	        if (!target)
	            return;
	        if (!target.fixed) {
	            ideal.position.copy(target.targetObject.position);
	            ideal.quaternion.copy(target.targetObject.quaternion);
	            if (target.cameraRotation !== undefined)
	                ideal.quaternion.multiply(target.cameraRotation);
	            this.translateIdealObject(target.cameraPosition);
	            this.position.lerp(ideal.position, target.stiffness);
	            if (target.matchRotation)
	                this.quaternion.slerp(ideal.quaternion, target.stiffness);
	            else
	                this.lookAt(target.targetObject.position);
	        }
	        else {
	            this.position.copy(target.cameraPosition);
	            this.lookAt(target.targetObject.position);
	        }
	    };
	    return Camera;
	}(THREE.PerspectiveCamera));
	exports.Camera = Camera;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var Physics = (function () {
	    function Physics(clock) {
	        this.clock = clock;
	        this.trackedMeshes = [];
	        this.collidables = [];
	    }
	    Physics.prototype.startClock = function (delay) {
	        delay ? setTimeout(this.clock.start, delay) : this.clock.start();
	    };
	    Physics.prototype.setGroundY = function (coordinate) {
	        this.groundY = coordinate;
	    };
	    Physics.prototype.setCollidables = function (meshes) {
	        this.collidables = meshes;
	    };
	    Physics.prototype.track = function (mesh) {
	        this.trackedMeshes.push(mesh);
	    };
	    Physics.prototype.update = function () {
	        var dt = this.clock.getDelta(); // use this eventually
	        // WARNING: bad code!
	        for (var _i = 0, _a = this.trackedMeshes; _i < _a.length; _i++) {
	            var trackedMesh = _a[_i];
	            for (var _b = 0, _c = this.collidables; _b < _c.length; _b++) {
	                var collidable = _c[_b];
	                var intersection = trackedMesh.collidesWith(collidable);
	                if (intersection)
	                    this.handleCollision(trackedMesh, intersection);
	                else
	                    this.applyGravity(trackedMesh);
	            }
	        }
	    };
	    Physics.prototype.applyGravity = function (mesh) {
	        var offsetHeight;
	        var geometry = mesh.getMesh().geometry;
	        if (geometry instanceof THREE.SphereGeometry) {
	            offsetHeight = geometry.boundingSphere.radius;
	        }
	        if (mesh.getPosition().y > this.groundY + offsetHeight) {
	            mesh.getMesh().translateY(-0.5);
	        }
	    };
	    Physics.prototype.handleCollision = function (subjectMesh, intersect) {
	        var normal = intersect.face.normal.clone();
	        subjectMesh.getMesh().translateY(normal.y);
	    };
	    return Physics;
	}());
	exports.Physics = Physics;


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
	var Keyboard_1 = __webpack_require__(6);
	exports.Keyboard = Keyboard_1.Keyboard;
	var TextureLoader_1 = __webpack_require__(7);
	exports.TextureLoader = TextureLoader_1.TextureLoader;
	var MeshLoader_1 = __webpack_require__(8);
	exports.MeshLoader = MeshLoader_1.MeshLoader;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	var Keyboard = (function () {
	    function Keyboard(element) {
	        var _this = this;
	        this.keyStates = {
	            87: { ascii: "w", pressed: false },
	            65: { ascii: "a", pressed: false },
	            83: { ascii: "s", pressed: false },
	            68: { ascii: "d", pressed: false }
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
	        "d": 68
	    };
	    return Keyboard;
	}());
	exports.Keyboard = Keyboard;


/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports) {

	"use strict";
	var MeshLoader = (function () {
	    function MeshLoader() {
	    }
	    MeshLoader.prototype.loadAll = function (urls) {
	        var loader = new THREE.JSONLoader();
	        var promises = urls.map(function (url) {
	            return new Promise(function (res, rej) {
	                loader.load(url, function (geometry) { return res(new THREE.Mesh(geometry)); });
	            });
	        });
	        return Promise.all(promises);
	    };
	    MeshLoader.prototype.load = function (url) {
	        var loader = new THREE.JSONLoader();
	        return new Promise(function (res, rej) {
	            loader.load(url, function (geometry) { return res(new THREE.Mesh(geometry)); });
	        });
	    };
	    return MeshLoader;
	}());
	exports.MeshLoader = MeshLoader;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	var AssetPaths = {
	    Textures: {
	        Ground: { ID: 0, URL: 'assets/scratch-metal-texture.jpg' }
	    },
	    Models: {
	        Ramp: 'assets/ramp.json'
	    }
	};
	exports.AssetPaths = AssetPaths;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Marble_1 = __webpack_require__(11);
	exports.Marble = Marble_1.Marble;
	var Ground_1 = __webpack_require__(14);
	exports.Ground = Ground_1.Ground;
	var Skybox_1 = __webpack_require__(15);
	exports.Skybox = Skybox_1.Skybox;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Types_1 = __webpack_require__(12);
	var Marble = (function (_super) {
	    __extends(Marble, _super);
	    function Marble(config) {
	        _super.call(this);
	        this.config = config ? config : Marble.DEFAULT_MESH_CONFIG;
	        this.mesh = new THREE.Mesh(this.config.geometry, this.config.material);
	        this.mesh.position.set(0, 5, 0);
	    }
	    Marble.prototype.getMesh = function () {
	        return this.mesh;
	    };
	    Marble.prototype.moveForward = function (distance) {
	        this.mesh.translateZ(-Math.abs(distance));
	        return this.mesh.position;
	    };
	    Marble.prototype.moveBackward = function (distance) {
	        this.mesh.translateZ(Math.abs(distance));
	        return this.mesh.position;
	    };
	    Marble.prototype.turnRight = function (theta) {
	        this.mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.abs(theta));
	        return this.mesh.position;
	    };
	    Marble.prototype.turnLeft = function (theta) {
	        this.mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.abs(theta));
	        return this.mesh.position;
	    };
	    Marble.INITIAL_POSITION = new THREE.Vector3(0, 5, 0);
	    Marble.DEFAULT_MESH_CONFIG = {
	        material: new THREE.MeshLambertMaterial({ color: 0x000088 }),
	        geometry: new THREE.SphereGeometry(3, 12, 16)
	    };
	    return Marble;
	}(Types_1.Mesh));
	exports.Marble = Marble;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Mesh_1 = __webpack_require__(13);
	exports.Mesh = Mesh_1.Mesh;


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	var Mesh = (function () {
	    function Mesh() {
	    }
	    Mesh.prototype.attachTo = function (scene) {
	        scene.add(this.mesh);
	    };
	    Mesh.prototype.getMesh = function () {
	        return this.mesh;
	    };
	    Mesh.prototype.getPosition = function () {
	        return this.mesh.position;
	    };
	    Mesh.prototype.getMatrix = function () {
	        return this.mesh.matrix;
	    };
	    Mesh.prototype.getVertexCount = function () {
	        return this.config.geometry.vertices.length;
	    };
	    Mesh.prototype.getVertex = function (index) {
	        return this.config.geometry.vertices[index].clone();
	    };
	    Mesh.prototype.collidesWith = function (object) {
	        var origin = this.getPosition().clone();
	        var result;
	        for (var i = 0; i < this.getVertexCount() && !result; i++) {
	            var localVertex = this.getVertex(i);
	            var globalVertex = localVertex.applyMatrix4(this.getMatrix());
	            var directionVector = globalVertex.sub(this.getPosition());
	            var ray = new THREE.Raycaster(origin, directionVector.clone().normalize());
	            var collisionResult = ray.intersectObject(object);
	            if (collisionResult.length && collisionResult[0].distance < directionVector.length()) {
	                result = collisionResult[0];
	            }
	        }
	        return result;
	    };
	    return Mesh;
	}());
	exports.Mesh = Mesh;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Types_1 = __webpack_require__(12);
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
	            geometry: new THREE.PlaneGeometry(500, 500, 10, 10)
	        };
	        this.mesh = new THREE.Mesh(this.config.geometry, this.config.material);
	        this.mesh.position.y = -0.5;
	        this.mesh.rotation.x = Math.PI / 2;
	    }
	    return Ground;
	}(Types_1.Mesh));
	exports.Ground = Ground;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Types_1 = __webpack_require__(12);
	var Skybox = (function (_super) {
	    __extends(Skybox, _super);
	    function Skybox(config) {
	        _super.call(this);
	        this.config = config ? config : Skybox.DEFAULT_MESH_CONFIG;
	        this.mesh = new THREE.Mesh(this.config.geometry, this.config.material);
	    }
	    Skybox.DEFAULT_MESH_CONFIG = {
	        material: new THREE.MeshBasicMaterial({
	            color: 0x9999ff,
	            side: THREE.BackSide
	        }),
	        geometry: new THREE.CubeGeometry(500, 500, 500)
	    };
	    return Skybox;
	}(Types_1.Mesh));
	exports.Skybox = Skybox;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var AssetPaths_1 = __webpack_require__(9);
	exports.AssetPaths = AssetPaths_1.AssetPaths;
	var ViewportDefaults_1 = __webpack_require__(17);
	exports.ViewportDefaults = ViewportDefaults_1.ViewportDefaults;


/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	var ViewportDefaults = {
	    SCREEN_WIDTH: window.innerWidth,
	    SCREEN_HEIGHT: window.innerHeight,
	    FOV: 45,
	    ASPECT_RATIO: window.innerWidth / window.innerHeight,
	    NEAR: 0.1,
	    FAR: 500
	};
	exports.ViewportDefaults = ViewportDefaults;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map