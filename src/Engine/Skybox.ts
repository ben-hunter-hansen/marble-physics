export class Skybox {
    
    static init(scene: THREE.Scene) {
        let skyBoxGeometry = new THREE.CubeGeometry( 1000, 1000, 1000 );
	    let skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	    let skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
        scene.add(skyBox);
    } 
}