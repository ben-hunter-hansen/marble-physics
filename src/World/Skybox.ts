import { MeshData, Mesh, IControllable } from "../Types/Types";

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
}

export { Skybox }