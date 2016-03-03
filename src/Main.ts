import { Engine, Skybox, Camera } from "./Engine/Engine";
import { Keyboard, TextureLoader, MeshLoader } from "./Util/Util";
import { ViewportDefaults, AssetPaths } from "./Config/Config";

function main(): void {
    
    // Create rendering context and attach it to the document
    let renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(
        ViewportDefaults.SCREEN_WIDTH, 
        ViewportDefaults.SCREEN_HEIGHT
    );
    document.body.appendChild( renderer.domElement );
    
    const loader = new TextureLoader();
    loader.loadAll([AssetPaths.Textures.Ground.URL]).then((textures) => {
        init(renderer, textures);
    });
    
}

function init(renderer: THREE.WebGLRenderer, textures: THREE.Texture[]): void {
    // Initialize game engine
    const engine = new Engine(renderer)
        .setTextures(textures)
        .setKeyboard(new Keyboard())
        .setCamera(new Camera(ViewportDefaults))
        .setScene(new THREE.Scene())
        .initPhysics()
        .initCameraAndScene()
        
    engine.start();
}


main();


