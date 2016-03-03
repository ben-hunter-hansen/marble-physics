import { Mesh } from "../Types/Types";

class Physics {
    
    private trackedMeshes: Array<Mesh>;
    private collidables: Array<THREE.Mesh>;
    private clock: THREE.Clock;
    
    constructor(clock: THREE.Clock) {
        this.clock = clock;
        this.trackedMeshes = [];
        this.collidables = [];
    }
    
    public startClock(delay?: number): void {
        delay ? setTimeout(this.clock.start, delay) : this.clock.start();
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
                if(trackedMesh.collidesWith(collidable)) {
                    console.log("A collision occured!");
                }
            }
        }
    }
}

export { Physics }