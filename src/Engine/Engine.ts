import { Camera } from "./Camera";
import { Ground } from "./Ground";
import { Lighting } from "./Lighting";
import { Skybox } from "./Skybox";
import { TextureLoader, Keyboard } from "../Util/Util";
import { AssetPaths } from "../Config/AssetPaths";
import { World } from "../World/World";

/**
 * Singleton driver class for the marble game
 */
class Engine {
    
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private keyboard: Keyboard;
    
    constructor(renderer: THREE.WebGLRenderer) {
        this.renderer = renderer;
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
        return this;
    }
    
    public drawGroud(): Promise<Engine> {
        return new Promise((resolve, reject) => {
            const texLoader = new TextureLoader();
            texLoader.load(AssetPaths.FLOOR_TEXTURE).then((texture) => {
                Ground.init(texture, this.scene);
                resolve(this);
            });
        });
    }
    
    public drawSkybox(skybox: Skybox): Promise<Engine> {
        skybox.attachTo(this.scene);
        
        // This will be async at some point
        return Promise.resolve(this);
    }
    
    public createWorld(): Promise<Engine> {
        const world = new World(this.scene);
        world.init();
        
        // This will be async at some point
        return Promise.resolve(this);
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