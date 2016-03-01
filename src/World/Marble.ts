import { Mesh, MeshData, IControllable } from "../Types/Types";

export class Marble extends Mesh implements IControllable {
    public static INITIAL_POSITION = new THREE.Vector3(0,5,0);
    
    private static DEFAULT_MESH_CONFIG: MeshData = {
        material: new THREE.MeshLambertMaterial({ color: 0x000088 }),
        geometry: new THREE.SphereGeometry( 5, 8, 16 )
    };
    
    constructor(config?: MeshData) {
        super();
        this.config = config ? config : Marble.DEFAULT_MESH_CONFIG;
        this.mesh = new THREE.Mesh(this.config.geometry, this.config.material);
    }
    
    public attachTo(scene: THREE.Scene): void {
        scene.add(this.mesh);
    }
    
    public getMesh(): THREE.Mesh {
        return this.mesh;
    }
    
    public moveForward(distance: number): THREE.Vector3 {
        this.mesh.translateZ(-Math.abs(distance));
        return this.mesh.position;
    }
    
    public moveBackward(distance: number): THREE.Vector3 {
        this.mesh.translateZ(Math.abs(distance));
        return this.mesh.position;
    }
    
    public turnRight(theta: number): THREE.Vector3 {
        this.mesh.rotateOnAxis(new THREE.Vector3(0,1,0), -Math.abs(theta));
        return this.mesh.position;
    }
    
    public turnLeft(theta: number): THREE.Vector3 {
        this.mesh.rotateOnAxis(new THREE.Vector3(0,1,0), Math.abs(theta));
        return this.mesh.position;
    }
}