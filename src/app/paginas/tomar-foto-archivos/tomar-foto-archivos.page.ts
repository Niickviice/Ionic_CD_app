import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { URL_SERVIDOR_IMAGEN } from 'src/app/app.constantes';
import { ApiRazasService } from 'src/app/servicios/api-razas.service';


@Component({
  selector: 'app-tomar-foto-archivos',
  templateUrl: './tomar-foto-archivos.page.html',
  styleUrls: ['./tomar-foto-archivos.page.scss'],
})
export class TomarFotoArchivosPage implements OnInit {
  formulario:FormGroup;
  mensajeError:string;
  mostrarSpinner:boolean=true;
  datosGuardados:boolean;
  archivo:File;
  rutaAvatar:string;
  urlServidorImagen:string=URL_SERVIDOR_IMAGEN;

  //Inyectamos formBuilder es una variable de nombre formBuilder
  constructor(private api:ApiRazasService, private formBuilder:FormBuilder, private enrutador:Router) {         
    this.formulario = this.formBuilder.group({            
      archivoNombre:["",[Validators.required]]
    });  
  }  

  ionViewWillEnter(){   
    this.mostrarSpinner=false; 
  }

  ngOnInit() {
  }
  
  enArchivoSeleccionado(evento) {
    this.archivo = evento.target.files[0];
    console.log("archivo seleccionado:", this.archivo);
    this.formulario.patchValue({
      archivoNombre: this.archivo.name,
    });    
  }

  buscarRaza(){
    this.mostrarSpinner=true;
    let formData = new FormData();
    this.mostrarSpinner=true;
    formData.append('foto', this.archivo, this.archivo.name);
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

