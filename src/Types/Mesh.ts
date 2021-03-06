import { MeshData } from "./MeshData";
import { Intersection } from "./Intersection";

abstract class Mesh {
    protected mesh: THREE.Mesh;
    protected config: MeshData;
    
    public attachTo(scene: THREE.Scene): void {
        scene.add(this.mesh);
    }
    
    public getMesh(): THREE.Mesh {
        return this.mesh;
    }
    
    public getPosition(): THREE.Vector3 {
        return this.mesh.position;
    }
    
    public getMatrix(): THREE.Matrix4 {
        return this.mesh.matrix;
    }
    
    public getVertexCount(): number {
        return this.config.geometry.vertices.length;
    }
    
    public getVertex(index: number): THREE.Vector3 {
        return this.config.geometry.vertices[index].clone();
    }
    
    public collidesWith(object: THREE.Mesh): Intersection {
        
        let origin = this.getPosition().clone();
        let result: Intersection;
        
        for(let i = 0; i < this.getVertexCount() && !result; i++) {
            let localVertex = this.getVertex(i);
            let globalVertex = localVertex.applyMatrix4(this.getMatrix());
            let directionVector = globalVertex.sub(this.getPosition());

            let ray = new THREE.Raycaster(origin, directionVector.clone().normalize());
            let collisionResult = ray.intersectObject(object);
            if(collisionResult.length && collisionResult[0].distance < directionVector.length()) {
                result = collisionResult[0];
            }
        }
        
        return result;
    }
}

export { Mesh };