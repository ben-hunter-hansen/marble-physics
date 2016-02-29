import { Viewport } from "../Types/Types";

export class Camera {
    
    static create(config: Viewport): THREE.PerspectiveCamera {
        let cam = new THREE.PerspectiveCamera(
            config.FOV,
            config.ASPECT_RATIO,
            config.NEAR,
            config.FAR  
        );
    
        cam.position.set(0,150,400);
        return cam;
    }
}