import { MeshData } from "../Types/MeshData";
import { Mesh } from "../Types/Mesh";

class Skybox extends Mesh {
    
    private static DEFAULT_MESH_CONFIG: MeshData = {
        material: new THREE.MeshBasicMaterial({ 
            color: 0x9999ff, 
            side: THREE.BackSide
        }),
        geometry: new THREE.CubeGeometry(1000, 1000, 1000)
    };
    
    constructor(config?: MeshData) {
        super();
        
        this.config = config ? config : Skybox.DEFAULT_MESH_CONFIG;
        this.mesh = new THREE.Mesh(this.config.geometry, this.config.material);
    }
    
    public attachTo(scene: THREE.Scene) {
        scene.add(this.mesh);
    }
    
    public getPosition(): THREE.Vector3 {
        return this.mesh.position;
    }
    
    public setPosition(pos: THREE.Vector3): void {
        this.mesh.position.set(pos.x, pos.y, pos.z);
    }
}

export { Skybox }