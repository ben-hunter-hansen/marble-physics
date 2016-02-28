export class Texture {
    static load(url: string): Promise<THREE.Texture> {
        let loader = new THREE.TextureLoader();
        return Promise.resolve(loader.load(url));
    }
}