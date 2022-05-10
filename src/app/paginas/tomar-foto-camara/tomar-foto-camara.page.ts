import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRazasService } from 'src/app/servicios/api-razas.service';
import { CamaraService } from 'src/app/servicios/camara.service';

@Component({
  selector: 'app-tomar-foto-camara',
  templateUrl: './tomar-foto-camara.page.html',
  styleUrls: ['./tomar-foto-camara.page.scss'],
})
export class TomarFotoCamaraPage implements OnInit {
  mensajeError:string;
  mostrarSpinner:boolean;
  foto:any;
  
  constructor(private camaraServ:CamaraService, private api:ApiRazasService, private enrutador:Router) { }

  ngOnInit() {
  }

  tomarFoto(){
    
    this.camaraServ.tomarFoto((foto)=>{
      this.foto = foto;
      console.log("foto obtenida:",this.foto);      
    },(e)=>{
      this.mensajeError = "Ocurrió un error al tomar la foto"
      console.error(this.mensajeError, ", error:",e);
    });    
  }

  buscarRaza(foto){
    this.mostrarSpinner=true;
    let formData = new FormData();    
    formData.append('foto', this.foto.blob,"archivo-foto");
    this.api.guardarYClasificarFoto(formData,(fotoClasificada)=>{
      console.log("foto clasificada del servidor:",fotoClasificada);
      this.mostrarSpinner = false;
      this.enrutador.navigate(["/foto-clasificada"],{queryParams:{idFoto:fotoClasificada.id,fotoNueva:true}});
    },(e)=>{
      this.mostrarSpinner = false;
      this.mensajeError = "Ocurrió un error en el servidor al clasificar la foto, por favor intenta más tarde.";
      console.error(this.mensajeError, ", error:",e);
    });
  }

}
