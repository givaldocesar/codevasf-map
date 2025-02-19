import { CacheIndex } from "../interfaces";

export default class LayerCache {
    database_: IDBDatabase | null;
    name_: string;
    keyPath_?: string;
    indexes_: CacheIndex[];

    constructor({
        name, 
        keyPath, 
        indexes=[]
    } : {
        name: string;
        keyPath?: string;
        indexes?: CacheIndex[];
    }){
        this.database_ = null;
        this.name_ = name;
        this.keyPath_ = keyPath;
        this.indexes_ = indexes;
    }

    async connect(){
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.name_, 3);

            request.onupgradeneeded = (evt) => {
                evt.stopPropagation();

                const target = evt.target as IDBOpenDBRequest;
                this.database_ = target.result;

                const store = this.database_.createObjectStore("features", 
                    this.keyPath_ ? { keyPath: this.keyPath_ } : { autoIncrement: true }
                );

                this.indexes_.forEach(index => {
                    store.createIndex(
                        index.name, 
                        index.keyPath || index.name, 
                        { unique: index.unique }
                    );
                });

                const transaction = target.transaction as IDBTransaction;
                transaction.oncomplete = () => resolve(true);
            }

            request.onsuccess = (evt) => {
                evt.stopPropagation();
                const target = evt.target as IDBOpenDBRequest;
                this.database_ = target.result;
                resolve(true);
            }

            request.onerror = (evt) => {
                evt.stopPropagation();
                reject(evt);
            }
        });
    }

    async insert(data: any){
        return new Promise((resolve, reject) => {
            const transaction = this.database_?.transaction(['features'], 'readwrite') as IDBTransaction;
            transaction.oncomplete = () => resolve(true);
            transaction.onerror = (error) => reject(error);

            const store = transaction.objectStore('features');
            store.put(data);
        });
    }

    async get(key?: string){
        return new Promise<any>((resolve, reject) => {
            const transaction = this.database_?.transaction(['features']) as IDBTransaction;
            const store = transaction.objectStore('features');
            let request;
            if(key){
                request = store.get(key);
            } else {
                request = store.getAll();
            }
            
            request.onsuccess = (evt) => {
                evt.stopPropagation();
                const target = evt.target as IDBRequest;
                resolve(target.result);
            }

            request.onerror = (evt) => {
                evt.stopPropagation();
                reject(evt);
            }
        });
    }

    async delete(key: string){
        return new Promise<any>((resolve, reject) => {
            const transaction = this.database_?.transaction(['features'], "readwrite") as IDBTransaction;
            const store = transaction.objectStore('features');
            const request = store.delete(key);

            request.onsuccess = (evt) => {
                evt.stopPropagation();
                const target = evt.target as IDBRequest;
                resolve(target.result);
            }

            request.onerror = (evt) => {
                evt.stopPropagation();
                reject(evt);
            }
        });
    }
}