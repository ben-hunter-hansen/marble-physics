export class Marble {
    static createMesh(): THREE.Mesh {
        let geometry = new THREE.SphereGeometry( 30, 32, 16 );
        let material = new THREE.MeshLambertMaterial( { color: 0x000088 } );
        let mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(0,40,0);
        return mesh;
    }  
}