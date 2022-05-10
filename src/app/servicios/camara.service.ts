import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {

  constructor() { }

  public tomarFoto(callbackOk,callbackError) {
    // Take a photo
    Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    }).then((fotoCamara)=>{
      console.log("generando blob para foto obtenida de la camara:", fotoCamara);
      this.obtenerBlob(fotoCamara, (blobBlock)=>{        
        console.log("se obtuvo blob:", blobBlock);
        const foto ={
          rutaWebTemporal:fotoCamara.webPath,
          blob: blobBlock
        };        
        callbackOk(foto);        
      },callbackError);      
    }).catch(callbackError);
  }

  private obtenerBlob(fotoCamara,callbackOk, callbackError) {
    // Fetch the photo, read as a blob
    fetch(fotoCamara.webPath).then((response)=>{
      response.blob().then((blobBlock)=>{
        callbackOk(blobBlock);
      }).catch(callbackError);
    });
  }
}
