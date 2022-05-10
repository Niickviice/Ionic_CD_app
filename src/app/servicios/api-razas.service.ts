import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API_ACTUALIZAR_USUARIO, URL_API_CREAR_USUARIO, URL_API_ELIMINAR_USUARIO, URL_API_GUARDAR_AVATAR_USUARIO, URL_API_GUARDAR_Y_CLASIFICAR_FOTO_USUARIO, URL_API_OBTENER_FOTOS_CLASIFICADAS_USUARIO, URL_API_OBTENER_FOTO_CLASIFICADA, URL_API_OBTENER_RAZAS, URL_API_OBTENER_RAZA_POR_ID, URL_API_OBTENER_USUARIOS, URL_API_OBTEN_USUARIO } from '../app.constantes';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiRazasService {
  
  constructor(private almacenServicio:StorageService, private http:HttpClient) { 
    
  }

  private obtenToken(callbackOk){
    this.almacenServicio.almacen.get("token").then((token)=>{    
      callbackOk(token);
    });
  }

  private obtenIdUsuario(callbackOk){
    this.almacenServicio.almacen.get("idUsuario").then((id)=>{    
      callbackOk(id);
    });
  }

  private obtenHeadersConToken(callbackOk){
    this.obtenToken((token)=>{
      const headers={
        Authorization:"Bearer " + token
      };
      callbackOk(headers);
    });
  }

  private solicitudGetConToken(url,opciones,callbackOk,callbackError){
    //obtenemos header con el token de autorización
    this.obtenHeadersConToken((headers)=>{
      //unimos las opciones que  nos hayan pasado con los headers del token
      const opcionesFinales = {
        ...{  // ... es el operador de extensión
          headers:headers
        },
        ...opciones // ... es el operador de extensión
      };      
      //hacemos la petición get con las opciones y los callback
      this.http.get(url,opcionesFinales).subscribe({
        next:callbackOk,
        error:callbackError
      });
    });
  }

  private solicitudDeleteConToken(url,opciones,callbackOk,callbackError){
    //obtenemos header con el token de autorización
    this.obtenHeadersConToken((headers)=>{
      //unimos las opciones que  nos hayan pasado con los headers del token
      const opcionesFinales = {
        ...{  // ... es el operador de extensión
          headers:headers
        },
        ...opciones // ... es el operador de extensión
      };      
      //hacemos la petición delete con las opciones y los callback
      this.http.delete(url,opcionesFinales).subscribe({
        next:callbackOk,
        error:callbackError
      });
    });
  }

  
  private solicitudPostConToken(url,body,opciones,callbackOk,callbackError){
    //obtenemos header con el token de autorización
    this.obtenHeadersConToken((headers)=>{
      //unimos las opciones que  nos hayan pasado con los headers del token
      const opcionesFinales = {
        ... {  // ... es el operador de extensión               
          headers:headers
        }, 
        ... opciones // ... es el operador de extensión
      };      
      //hacemos la petición post con el body, las opciones y los callback
      this.http.post(url,body,opcionesFinales).subscribe({
        next:callbackOk,
        error:callbackError
      });
    });
  }

  private solicitudPutConToken(url,body,opciones,callbackOk,callbackError){
    //obtenemos header con el token de autorización
    this.obtenHeadersConToken((headers)=>{
      //unimos las opciones que  nos hayan pasado con los headers del token
      const opcionesFinales = {
        ... {  // ... es el operador de extensión               
          headers:headers
        }, 
        ... opciones // ... es el operador de extensión
      };      
      //hacemos la petición put con el body, las opciones y los callback
      this.http.put(url,body,opcionesFinales).subscribe({
        next:callbackOk,
        error:callbackError
      });
    });
  }


  obtenerUsuarios(callbackOk,callbackError){    
    this.solicitudGetConToken(URL_API_OBTENER_USUARIOS,{},callbackOk,callbackError);
  }

  obtenUsuarioPorId(idUsuario, callbackOk,callbackError){
    //armamos la url para obtener la info del usuario
    const url = URL_API_OBTEN_USUARIO.replace("{idUsuario}",idUsuario);
    //hacemos la petición al servidor
    this.solicitudGetConToken(url,{},callbackOk,callbackError);
  }

  obtenUsuarioMe(callbackOk, callbackError){
    //obtenemos el id del usuario logeado
    this.obtenIdUsuario((idUsuario)=>{
      this.obtenUsuarioPorId(idUsuario,callbackOk,callbackError);
    });
  }  

  crearUsuario(info,callbackOk,callbackError){
    this.http.post(URL_API_CREAR_USUARIO,info,{}).subscribe({
      next:callbackOk,
      error:callbackError
    });
  }

  actualizarUsuario(idUsuario,info,callbackOk,callbackError){
    const url = URL_API_ACTUALIZAR_USUARIO.replace("{idUsuario}",idUsuario);    
    console.log("url:",url)
    this.solicitudPutConToken(url,info,{},callbackOk,callbackError);
  }

  actualizarUsuarioMe(info, callbackOk,callbackError){
    this.obtenIdUsuario((idUsuario)=>{
      this.actualizarUsuario(idUsuario,info,callbackOk,callbackError);
    })
  }

  eliminarUsuario(idUsuario, callbackOk, callbackError){
    const url = URL_API_ELIMINAR_USUARIO.replace("{idUsuario}",idUsuario);    
    this.solicitudDeleteConToken(url,{},callbackOk,callbackError);
  }

  eliminarUsuarioMe(callbackOk, callbackError){
    this.obtenIdUsuario((idUsuario)=>{
      this.eliminarUsuario(idUsuario,callbackOk,callbackError);
    });
  }

  guardarAvatarUsuario(idUsuario,body,callbackOk,callbackError){
    const url = URL_API_GUARDAR_AVATAR_USUARIO.replace("{idUsuario}",idUsuario);
    this.solicitudPostConToken(url,body,{},callbackOk,callbackError);
  }

  guardarAvatarUsuarioMe(body,callbackOk,callbackError){
    this.obtenIdUsuario((idUsuario)=>{
      this.guardarAvatarUsuario(idUsuario,body,callbackOk,callbackError);
    });
  }

  guardarYClasificarFoto(body,callbackOk,callbackError){
    this.obtenIdUsuario((idUsuario)=>{
      const url =URL_API_GUARDAR_Y_CLASIFICAR_FOTO_USUARIO.replace("{idUsuario}",idUsuario);
      this.solicitudPostConToken(url,body,{},callbackOk,callbackError)
    });    
  }

  obtenerFotoClasificadaPorId(idFoto,callbackOk,callbackError){
    const url = URL_API_OBTENER_FOTO_CLASIFICADA.replace("{idFoto}",idFoto);
    this.solicitudGetConToken(url,{},callbackOk,callbackError);
  }

  obtenerFotosClasificadasUsuario(tamLote, pagina,callbackOk,callbackError){
    this.obtenIdUsuario((idUsuario)=>{
      const url = URL_API_OBTENER_FOTOS_CLASIFICADAS_USUARIO.replace("{idUsuario}",idUsuario);
      const opc = {
        params:{
          lote:tamLote,
          pag:pagina
        }
      };
      this.solicitudGetConToken(url,opc,callbackOk,callbackError);
    });
  }

  obtenerRazas(tamLote, pagina, callbackOk,callbackError){
    const opc = {
      params:{
        lote:tamLote,
        pag:pagina
      }
    };
    this.solicitudGetConToken(URL_API_OBTENER_RAZAS,opc,callbackOk,callbackError);
  }

  obtenerRazaPorId(idRaza,callbackOk,callbackError){
    const url = URL_API_OBTENER_RAZA_POR_ID.replace("{idRaza}",idRaza);
    this.solicitudGetConToken(url,{},callbackOk,callbackError);
  }

}
