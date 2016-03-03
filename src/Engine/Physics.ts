import { Mesh, Intersection } from "../Types/Types";

class Physics {
    
    private trackedMeshes: Array<Mesh>;
    private collidables: Array<THREE.Mesh>;
    private groundY: number;
    private clock: THREE.Clock;
    
    
    constructor(clock: THREE.Clock) {
        this.clock = clock;
        this.trackedMeshes = [];
        this.collidables = [];
    }
    
    public startClock(delay?: number): void {
        delay ? setTimeout(this.clock.start, delay) : this.clock.start();
    }
    
    public setGroundY(coordinate: number) {
        this.groundY = coordinate;
    }
    
    public setCollidables(meshes: THREE.Mesh[]) {
        this.collidables = meshes;
    }
    
    public track(mesh: Mesh): void {
        this.trackedMeshes.push(mesh);
    }
    
    public update(): void {
        const dt = this.clock.getDelta(); // use this eventually
        
        // WARNING: bad code!
        for(let trackedMesh of this.trackedMeshes) {
            for(let collidable of this.collidables) {
                const intersection: Intersection = trackedMesh.collidesWith(collidable);
                if(intersection) 
                    this.handleCollision(trackedMesh, intersection);
                else
                    this.applyGravity(trackedMesh);
            }
        }
    }
    
    private applyGravity(mesh: Mesh) {
        let offsetHeight: number;
        const geometry = mesh.getMesh().geometry;
        
        if(geometry instanceof THREE.SphereGeometry) { 
            offsetHeight = geometry.boundingSphere.radius;
        }
        
        if(mesh.getPosition().y > this.groundY + offsetHeight) {
            mesh.getMesh().translateY(-0.5);
        }
    }
    
    private handleCollision(subjectMesh: Mesh, intersect: Intersection) {
        const normal = intersect.face.normal.clone();
        subjectMesh.getMesh().translateY(normal.y);
        
    }
}

export { Physics }