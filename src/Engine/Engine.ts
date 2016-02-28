import { Camera } from "./Camera";
import { Ground } from "./Ground";
import { Lighting } from "./Lighting";
import { Skybox } from "./Skybox";
import { TextureLoader } from "../Util/TextureLoader";
import { Assets } from "../Config/Assets";
import { World } from "../World/World";

export class Engine {
    
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    
    constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
        this.renderer = renderer;
        this.scene = scene;
        this.camera = Camera.create();
        
        this.scene.add(this.camera);
        this.camera.lookAt(this.scene.position);
    }
    
    lightsOn(): void {
        Lighting.initCamLight(this.scene);
    }
    
    drawGroud(): Promise<Engine> {
        return new Promise((resolve, reject) => {
            const texLoader = new TextureLoader();
            texLoader.load(Assets.FLOOR_TEXTURE).then((texture) => {
                Ground.init(texture, this.scene);
                resolve(this);
            });
        });
    }
    
    drawSkybox(): Promise<Engine> {
        Skybox.init(this.scene);
        
        // This will be async at some point
        return Promise.resolve(this);
    }
    
    createWorld(): Promise<Engine> {
        const world = new World(this.scene);
        world.init();
        
        // This will be async at some point
        return Promise.resolve(this);
    }
    
    render(): void {
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