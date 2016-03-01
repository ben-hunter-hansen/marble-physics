import { Camera } from "./Camera";
import { Lighting } from "./Lighting";
import { TextureLoader, Keyboard } from "../Util/Util";
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
    
    // TODO make these part of World
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
    
    public setKeyboard(keyboard: Keyboard) {
        this.keyboard = keyboard;
        return this;
    }
    
    public initCameraAndScene(): Engine {
        this.scene.add(this.camera);
        Lighting.initCamLight(this.scene);
        
        this.ground = new Ground(this.textures[AssetPaths.Ground.ID]);
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
        
        return this;
    }
    
    
    private update(): void {
        if(this.keyboard.isKeyPressed('w')) {
            this.marble.getMesh().translateZ(-1);
        }
        this.camera.update();
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