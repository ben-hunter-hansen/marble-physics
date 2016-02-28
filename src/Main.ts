import { Engine } from "./Engine/Engine";
import { Viewport } from "./Config/Viewport";

function main(): void {
    
    // Create rendering context and attach it to the document
    let renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(Viewport.SCREEN_WIDTH, Viewport.SCREEN_HEIGHT);
    document.body.appendChild( renderer.domElement );
    
    // Initialize game engine
    const engine = new Engine(renderer, new THREE.Scene());
    
    // Turn on the lights
    engine.lightsOn();
    
    // Carry out async initializations,
    // then begin the game loop/
    engine.drawGroud()
    .then(engine => engine.drawSkybox())
    .then(engine => engine.createWorld())
    .then(engine => engine.start()); 
}


main();


