import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    if (!this._storage) {
      const storage = await this.storage.create();
      this._storage = storage;
    }
  }

  async getData(path: string) {
    await this.init()
    const data = await this._storage.get(path);
    return data ? data : null;
    // if (doc) {
    //   return doc;
    // } else {
    //   return null
    // }
  }

  async setData(path: string, data: any) {
    return this.storage.set(path, data);
  }

  async deleteData(path: string) {
    await this.init()
    return this.storage.remove(path);
  }




}
