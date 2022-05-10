import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URL_API_OBTEN_USUARIO, URL_SERVIDOR_IMAGEN } from 'src/app/app.constantes';
import { ApiRazasService } from 'src/app/servicios/api-razas.service';


@Component({
  selector: 'mi-cuenta',
  templateUrl: './mi-cuenta.page.html',
  styleUrls: ['./mi-cuenta.page.scss'],
})
export class MiCuentaPage implements OnInit {

  usuario:any;

  urlServidorImagen:string=URL_SERVIDOR_IMAGEN;

  mostrarSpinner:boolean=true;
  mensajeError:string;

  constructor(private api:ApiRazasService, private http:HttpClient, private router:Router) {    
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.obtenerInfoUsuario();
  }

  obtenerInfoUsuario(){    
    console.log("Obteniendo info del usuario actual");
    this.mostrarSpinner=true;
    this.api.obtenUsuarioMe((infoUsuario)=>{
      console.log("usuario actual:",infoUsuario);
      this.usuario = infoUsuario;
      if(this.usuario.fecha_registro){            
        try{
          const fecha = new Date(this.usuario.fecha_registro);
          this.usuario.fecha_registro = fecha;              
        }catch(e){
          console.error("ocurrio un error al convertir cadena:",this.usuario.fecha_registro," a fecha", e);
          this.usuario.fecha_registro = null;
        }
      }
      this.mostrarSpinner=false;
    },(error)=>{
      this.mensajeError = "Ocurrio un error, no se pudo obtener información del usuario, por favor intenta más tarde";
      console.log(this.mensajeError,", error:",error);
    });
  }

}
