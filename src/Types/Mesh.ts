import { MeshData } from "./MeshData";

abstract class Mesh {
    protected mesh: THREE.Mesh;
    protected config: MeshData;
    abstract attachTo(scene: THREE.Scene): void;
}

export { Mesh };