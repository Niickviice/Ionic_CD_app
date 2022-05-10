import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { URL_SERVIDOR_IMAGEN } from 'src/app/app.constantes';
import { ApiRazasService } from 'src/app/servicios/api-razas.service';

@Component({
  selector: 'app-editar-foto',
  templateUrl: './editar-foto.page.html',
  styleUrls: ['./editar-foto.page.scss'],
})
export class EditarFotoPage implements OnInit {

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
    this.mostrarSpinner=true;
    this.api.obtenUsuarioMe((usuario)=>{
      this.mostrarSpinner=false;
      this.rutaAvatar = usuario.ruta_avatar;
    },(error)=>{
      this.mensajeError = "El archivo " + this.archivo.name + " no se reconoce como una imagen, intenta con otro archivo";
      console.error(this.mensajeError + ", error:", error);
    });
  }

  ngOnInit() {
  }

  guardarArchivo(){  
    console.log("guardando archivo");
    let formData = new FormData();
    this.mostrarSpinner=true;
    formData.append('foto', this.archivo, this.archivo.name);
    this.api.guardarAvatarUsuarioMe(formData,(infoAvatar)=>{
      this.mostrarSpinner=false;
      console.log("avatar guardado:",infoAvatar);
      this.datosGuardados = true;
      this.rutaAvatar = infoAvatar.foto;
    },(error)=>{
      this.mensajeError = "El archivo " + this.archivo.name + " no se reconoce como una imagen, intenta con otro archivo";
      console.error(this.mensajeError + ", error:", error);
    });

  }

  enArchivoSeleccionado(evento) {
    this.archivo = evento.target.files[0];
    console.log("archivo seleccionado:", this.archivo);
    this.formulario.patchValue({
      archivoNombre: this.archivo.name,
    });
    
  }

}
