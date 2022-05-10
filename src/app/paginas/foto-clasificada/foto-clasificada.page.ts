import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URL_SERVIDOR_IMAGEN } from 'src/app/app.constantes';
import { ApiRazasService } from 'src/app/servicios/api-razas.service';

@Component({
  selector: 'app-foto-clasificada',
  templateUrl: './foto-clasificada.page.html',
  styleUrls: ['./foto-clasificada.page.scss'],
})
export class FotoClasificadaPage implements OnInit {
  mensajeError:string;
  mostrarSpinner:boolean;
  fotoNueva:boolean;
  foto:any;
  idFoto:number;

  URL_SERVIDOR_IMAGEN = URL_SERVIDOR_IMAGEN;
  
  constructor(private api:ApiRazasService, private ar:ActivatedRoute) { 

  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.mostrarSpinner = true;
    this.ar.queryParams.subscribe((params)=>{
      if(params.fotoNueva){
        this.fotoNueva = params.fotoNueva == "true";
      }
      this.idFoto = parseInt(params.idFoto);
      console.log("obteniendo foto clasificada con id:",this.idFoto);
      this.api.obtenerFotoClasificadaPorId(this.idFoto,(foto)=>{
        console.log("foto obtenida del servidor:", foto);
        this.mostrarSpinner = false;
        this.foto = foto;
        this.foto.porcentajePrimario = parseFloat((parseFloat(this.foto.porcentaje_clasificacion_primaria)*100).toFixed(0));
        this.foto.porcentajeSecundario = parseFloat((parseFloat(this.foto.porcentaje_clasificacion_secundaria)*100).toFixed());
        this.foto.porcentajeTerciario = parseFloat((parseFloat(this.foto.porcentaje_clasificacion_terciaria)*100).toFixed(0));
        this.foto.porcentajeOtros = 100 - this.foto.porcentajePrimario - this.foto.porcentajeSecundario - this.foto.porcentajeTerciario;
      },(e)=>{
        this.mensajeError = "Ocurrió un error en el servidor al obtener la foto, por favor intenta más tarde";
        console.error(this.mensajeError, ", error:",e);
      });
    });
  }

}
