import { Mesh, MeshData } from "../Types/Types";

export class Marble extends Mesh {
    public static INITIAL_POSITION = new THREE.Vector3(0,5,0);
    
    private static DEFAULT_MESH_CONFIG: MeshData = {
        material: new THREE.MeshLambertMaterial({ color: 0x000088 }),
        geometry: new THREE.SphereGeometry( 5, 8, 16 )
    };
    
    constructor(config?: MeshData) {
        super();
        this.config = config ? config : Marble.DEFAULT_MESH_CONFIG;
        this.mesh = new THREE.Mesh(this.config.geometry, this.config.material);
        //this.mesh.position.set(0,5,0); 
          
    }
    
    public attachTo(scene: THREE.Scene): void {
        scene.add(this.mesh);
    }
    
    public getPosition(): THREE.Vector3 {
        return this.mesh.position;
    }
    
    public getMesh(): THREE.Mesh {
        return this.mesh;
    }
    
    public setPosition(pos: THREE.Vector3): void {
        this.mesh.position.set(pos.x, pos.y, pos.z);
    }
}