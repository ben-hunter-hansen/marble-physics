import { IAssetLoader } from "./IAssetLoader";

export class TextureLoader implements IAssetLoader<THREE.Texture> {
    constructor() {}
    
    load(url: string): Promise<THREE.Texture> {
        let loader = new THREE.TextureLoader();
        return Promise.resolve(loader.load(url));
    }
}