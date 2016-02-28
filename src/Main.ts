import { Engine } from "./Engine/Engine";
import { Viewport } from "./Config/Viewport";

function main(): void {
    
    // Create rendering context and attach it to the document
    let renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(Viewport.SCREEN_WIDTH, Viewport.SCREEN_HEIGHT);
    document.body.appendChild( renderer.domElement );
    
    // Start game engine
    Engine.start(renderer, new THREE.Scene());
}


main();


