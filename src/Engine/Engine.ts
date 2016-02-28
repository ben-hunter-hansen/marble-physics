import { Camera } from "./Camera";
import { Ground } from "./Ground";
import { Lighting } from "./Lighting";
import { Skybox } from "./Skybox";
import { Texture } from "../Util/Texture";
import { Assets } from "../Config/Assets";
import { Marble } from "../World/Marble";

export class Engine {
    
    static start(renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
        let camera = Camera.create();
        
        scene.add(camera);
        camera.lookAt(scene.position);
        
        Lighting.initCamLight(scene);
        
        Texture.load(Assets.FLOOR_TEXTURE).then((texture) => {
            Ground.init(texture, scene);
        });
        
    
        Skybox.init(scene);
        
        scene.add(Marble.createMesh());
        
        function animate() {
            requestAnimationFrame(animate);
            render();
        }
        
        
        function render() {
            renderer.render(scene, camera);
        }
        
        animate();
    }
}