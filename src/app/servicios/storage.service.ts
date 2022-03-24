import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  set(arg0: string, id: any) {
    throw new Error('Method not implemented.');
  }

  constructor(public almacen: Storage) {
    // forzar a que espere a que termine el método asíncrono
    this.inicializar();
  }
  //No se puede usar await sí no está el keyword ASYNC en la función
  /* Método asíncrono */
  async inicializar(){
  await this.almacen.create();
 }
}
