import { Marble } from "./Marble";

class World {
    private scene: THREE.Scene;
    constructor(scene: THREE.Scene) {
        this.scene = scene;
    }
    
    public init(): void {
        this.scene.add(Marble.createMesh());
    }
}

export { World, Marble }