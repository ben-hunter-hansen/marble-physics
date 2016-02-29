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
    private camera: THREE.Camera;
    private keyboard: Keyboard;
    private textures: THREE.Texture[];
    
    constructor(renderer: THREE.WebGLRenderer) {
        this.renderer = renderer;
    }
    
    public setTextures(textures: THREE.Texture[]): Engine {
        this.textures = textures;
        return this;
    }
    
    public setCamera(camera: THREE.Camera): Engine {
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
        this.camera.lookAt(this.scene.position);
        Lighting.initCamLight(this.scene);
        
        const ground = new Ground(this.textures[AssetPaths.Ground.ID]);
        const skybox = new Skybox();
        const marble = new Marble();
        
        ground.attachTo(this.scene);
        skybox.attachTo(this.scene);
        marble.attachTo(this.scene);
        
        return this;
    }
    
    public render(): void {
        this.renderer.render(this.scene, this.camera);
    }
    
    animate(): void {
        requestAnimationFrame(() => this.animate());
        this.render();
    }
    
    start(): void {
        this.animate();
    }
}

export { Engine, Skybox, Ground, Camera, Lighting}