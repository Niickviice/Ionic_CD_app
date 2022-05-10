import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URL_SERVIDOR, URL_SERVIDOR_IMAGEN } from 'src/app/app.constantes';
import { ApiRazasService } from 'src/app/servicios/api-razas.service';

@Component({
  selector: 'app-mis-fotos',
  templateUrl: './mis-fotos.page.html',
  styleUrls: ['./mis-fotos.page.scss'],
})
export class MisFotosPage implements OnInit {
  URL_SERVIDOR_IMAGEN:string = URL_SERVIDOR_IMAGEN;
  mostrarSpinner:boolean;
  mensajeError:string;
  fotos:any[];

  TAM_LOTE_DEFAULT=100000; //el totaal de fotos a mostrar, @TODO: AGREGAR PAGINACIÓN
  PAG_DEFAULT = 0; //la pagina default de la paginación, @TODO: AGREGAR PAGINACIÓN

  constructor(private api:ApiRazasService, private activatedRoute:ActivatedRoute) { 

  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.obtenerFotosComunitario();
  }

  obtenerFotosComunitario(){        
    this.mostrarSpinner=true;    
    //obtenemos las fotos
    this.api.obtenerFotosClasificadasUsuario(this.TAM_LOTE_DEFAULT,this.PAG_DEFAULT,(fotos)=>{        
      console.log("fotos del usuario:", fotos);
      this.mostrarSpinner=false;
      this.fotos = fotos;
    },(e)=>{
      this.mensajeError="Ocurrió un error, no se pudieron obtener las fotos, por favor intenta más tarde";
      console.error(this.mensajeError,", error:",e);
    });      
  }

}
