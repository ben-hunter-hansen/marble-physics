export interface IAssetLoader<T> {
    load(url: string): Promise<T>
}