import { Camera } from "./Camera";
import { Physics } from "./Physics";
import { Lighting } from "./Lighting";
import { MeshLoader, Keyboard } from "../Util/Util";
import { AssetPaths } from "../Config/AssetPaths";
import { Marble, Skybox, Ground } from "../World/World";

/**
 *  driver class for the marble game
 */
class Engine {
    
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: Camera;
    private keyboard: Keyboard;
    private textures: THREE.Texture[];
    private physics: Physics;
    private ground: Ground;
    private marble: Marble;
    private skybox: Skybox;
    
    
    constructor(renderer: THREE.WebGLRenderer) {
        this.renderer = renderer;
    }
    
    public setTextures(textures: THREE.Texture[]): Engine {
        this.textures = textures;
        return this;
    }
    
    public setCamera(camera: Camera): Engine {
        this.camera = camera;
        return this;
    }
    
    public setScene(scene: THREE.Scene): Engine {
        this.scene = scene;
        return this;
    }
    
    public setKeyboard(keyboard: Keyboard): Engine {
        this.keyboard = keyboard;
        return this;
    }
    
    
    public initCameraAndScene(): Engine {
        this.scene.add(this.camera);
        Lighting.initCamLight(this.scene);
        
        this.ground = new Ground(this.textures[AssetPaths.Textures.Ground.ID]);
        this.skybox = new Skybox();
        this.marble = new Marble();
        
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
        const loader = new MeshLoader();
        loader.load(AssetPaths.Models.Ramp).then((mesh) => {
            this.scene.add(mesh);
            this.physics.setCollidables([mesh]);
        });
        this.physics.setGroundY(this.ground.getPosition().y);
        this.physics.startClock();
        return this;
    }
    
    public initPhysics(): Engine {
        this.physics = new Physics(new THREE.Clock());
        return this;
    }
    
    
    private update(): void {
        
        if(this.keyboard.isKeyPressed('w')) {
            this.marble.moveForward(1);
        } else if(this.keyboard.isKeyPressed('s')) {
            this.marble.moveBackward(1);
        }
        
        if(this.keyboard.isKeyPressed('a')) {
            this.marble.turnLeft(Math.PI/180);
        } else if(this.keyboard.isKeyPressed('d')) {
            this.marble.turnRight(Math.PI/180);
        }
        
        
        this.camera.update();
        this.physics.update();
    }
    
    public render(): void {
        this.renderer.render(this.scene, this.camera);
    }
    
    private animate(): void {
        requestAnimationFrame(() => this.animate());
        
        this.render();
        this.update();
    }
    
    public start(): void {
        this.animate();
    }
}

export { Engine, Skybox, Ground, Camera, Lighting}