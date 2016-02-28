import { Viewport } from "../Config/Viewport";

export class Camera {
    static create(): THREE.PerspectiveCamera {
        let cam = new THREE.PerspectiveCamera(
            Viewport.FOV,
            Viewport.ASPECT_RATIO,
            Viewport.NEAR,
            Viewport.FAR  
        );
    
        cam.position.set(0,150,400);
        return cam;
    }
}