export interface IAssetLoader<T> {
    loadAll(urls: Array<string>): Promise<T[]>
    load(url: string): Promise<T>
}