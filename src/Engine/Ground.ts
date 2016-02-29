

export class Ground {
    
    static init(tex: THREE.Texture, scene: THREE.Scene) {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping; 
        tex.repeat.set( 10, 10 );
        let floorMaterial = new THREE.MeshBasicMaterial( { map: tex, side: THREE.DoubleSide } );
        let floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
        let floor = new THREE.Mesh(floorGeometry, floorMaterial);
        
        floor.position.y = -0.5;
        floor.rotation.x = Math.PI / 2;
        scene.add(floor);
    }
}