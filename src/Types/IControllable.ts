export interface IControllable {
    moveForward(distance: number): THREE.Vector3;
    moveBackward(distance: number): THREE.Vector3;
    turnLeft(theta: number): THREE.Vector3;
    turnRight(theta: number): THREE.Vector3;
}