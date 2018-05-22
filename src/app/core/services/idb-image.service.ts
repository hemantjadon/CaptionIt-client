import { Injectable } from '@angular/core';
import * as idb from 'idb';

import { ImageSchema } from '../../shared/schema/image';

@Injectable()
export class IDBImageService {
  private dbName = 'caption-it-db';
  private imageStoreName = 'images';

  private upgrade(upgradeDB: idb.UpgradeDB) {
    switch (upgradeDB.oldVersion) {
      case 0: {
        upgradeDB.createObjectStore(this.imageStoreName, { keyPath: 'id', autoIncrement: true });
      }
    }
  }

  public async getStore(
    mode: 'readonly' | 'readwrite'
  ): Promise<idb.ObjectStore<any, any>> {
    const db = await idb.default.open(this.dbName, 1, this.upgrade.bind(this));
    const tx = db.transaction(this.imageStoreName, mode);
    const store = tx.objectStore(this.imageStoreName);
    return Promise.resolve(store);
  }

  public async count(): Promise<number> {
    const store = await this.getStore('readonly');
    return store.count();
  }

  public async getAll(): Promise<ImageSchema[]> {
    const store = await this.getStore('readonly');
    return store.getAll();
  }

  public async get(id: IDBValidKey): Promise<ImageSchema> {
    const store = await this.getStore('readonly');
    return store.get(id);
  }

  public async add(image: ImageSchema): Promise<IDBValidKey> {
    const store = await this.getStore('readwrite');
    return store.add(image);
  }

  public async put(image: ImageSchema): Promise<IDBValidKey> {
    const store = await this.getStore('readwrite');
    return store.add(image);
  }

  public async clear(): Promise<void> {
    const store = await this.getStore('readwrite');
    return store.clear();
  }

  public async delete(key: IDBValidKey | IDBKeyRange): Promise<void> {
    const store = await this.getStore('readwrite');
    return store.delete(key);
  }
 }
