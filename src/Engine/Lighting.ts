export class Lighting {
    
    static initCamLight(scene: THREE.Scene) {
        let light = new THREE.PointLight(0xffffff);
        light.position.set(100,250,100);
        scene.add(light);
    }
}