import { IAssetLoader } from "../Types/Types";

export class MeshLoader implements IAssetLoader<THREE.Mesh> {
    constructor() {}
    
    loadAll(urls: Array<string>): Promise<THREE.Mesh[]> {
        let loader = new THREE.JSONLoader();
        let promises = urls.map((url) => {
            return new Promise((res,rej) => {
                loader.load(url, geometry => res(new THREE.Mesh(geometry)));
            });
        });
        
        return Promise.all(promises);
    }
    
    load(url: string): Promise<THREE.Mesh> {
        let loader = new THREE.JSONLoader();
        return new Promise((res,rej) => {
            loader.load(url, geometry => res(new THREE.Mesh(geometry)));
        });
    }
}