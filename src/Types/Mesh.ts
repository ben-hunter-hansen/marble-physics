import { MeshData } from "./MeshData";

abstract class Mesh {
    protected mesh: THREE.Mesh;
    protected config: MeshData;
    abstract attachTo(scene: THREE.Scene): void;
    abstract getPosition(): THREE.Vector3;
    abstract setPosition(pos: THREE.Vector3): void;
}

export { Mesh };