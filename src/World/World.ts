import { Marble } from "./Marble";

export class World {
    private scene: THREE.Scene;
    constructor(scene: THREE.Scene) {
        this.scene = scene;
    }
    
    init(): void {
        this.scene.add(Marble.createMesh());
    }
}