import { Engine, Skybox, Camera } from "./Engine/Engine";
import { Keyboard } from "./Util/Util";
import { ViewportDefaults } from "./Config/Config";

function main(): void {
    
    // Create rendering context and attach it to the document
    let renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(
        ViewportDefaults.SCREEN_WIDTH, 
        ViewportDefaults.SCREEN_HEIGHT
    );
    document.body.appendChild( renderer.domElement );
    
    // Initialize game engine
    const engine = new Engine(renderer)
        .setKeyboard(new Keyboard())
        .setCamera(Camera.create(ViewportDefaults))
        .setScene(new THREE.Scene())
        .initCameraAndScene();
    
    // Carry out async initializations,
    // then begin the game loop
    engine.drawGroud()
        .then(engine => engine.drawSkybox(new Skybox()))
        .then(engine => engine.createWorld())
        .then(engine => engine.start()); 
}


main();


