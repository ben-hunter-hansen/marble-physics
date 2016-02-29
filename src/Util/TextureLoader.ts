import { IAssetLoader } from "../Types/Types";

export class TextureLoader implements IAssetLoader<THREE.Texture> {
    constructor() {}
    
    loadAll(urls: Array<string>): Promise<THREE.Texture[]> {
        let loader = new THREE.TextureLoader();
        let promises = urls.map((url) => {
            return Promise.resolve(loader.load(url));
        });
        
        return Promise.all(promises);
    }
    
    load(url: string): Promise<THREE.Texture> {
        let loader = new THREE.TextureLoader();
        return Promise.resolve(loader.load(url));
    }
}