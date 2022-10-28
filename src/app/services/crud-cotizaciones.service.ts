import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const STORAGE_KEY = "Quoties";

@Injectable({
  providedIn: 'root',
})
export class CrudCotizacionesService {

  constructor(
    private storage: Storage
  ) {
    this.init();
  }

  async init(){
    await this.storage.create();
  }

  getData(){
    return this.storage.get(STORAGE_KEY);
  }

  async addData(item){
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.push(item);
    return this.storage.set(STORAGE_KEY, storedData);
  }

  async removeItem(index){
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.splice(index, 1);
    return this.storage.set(STORAGE_KEY, storedData);
  }

}
