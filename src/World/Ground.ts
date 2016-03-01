
import { Mesh, MeshData } from "../Types/Types";

export class Ground extends Mesh {
    
    constructor(texture: THREE.Texture, config?: MeshData) {
        super();
        
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
        texture.repeat.set(10, 10);
        
        this.config = {
            material: new THREE.MeshBasicMaterial({
                map: texture, side: THREE.DoubleSide
            }),
            geometry: new THREE.PlaneGeometry(500, 500, 10, 10) 
        };
        
        this.mesh = new THREE.Mesh(this.config.geometry, this.config.material);
        this.mesh.position.y = -0.5;
        this.mesh.rotation.x = Math.PI / 2;
    }
}