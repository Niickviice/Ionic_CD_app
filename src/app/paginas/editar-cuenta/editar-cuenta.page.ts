import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRazasService } from 'src/app/servicios/api-razas.service';

@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.page.html',
  styleUrls: ['./editar-cuenta.page.scss'],
})
export class EditarCuentaPage implements OnInit {

  formulario:FormGroup;
  mensajeError:string;
  emailOk:boolean;
  mostrarSpinner:boolean=true;
  datosGuardados:boolean;
  usuarioOriginal:any;

  //Inyectamos formBuilder es una variable de nombre formBuilder
  constructor(private api:ApiRazasService, private formBuilder:FormBuilder, private enrutador:Router) { 
    //inicializamos el formulario (más adelante lo actualizamos con los valores reales)
    this.formulario = this.formBuilder.group({
      email:["", [Validators.required,Validators.email]],
      nombre:["", [Validators.required]],      
      telefono:["",[]]
    });      
  }

  ionViewWillEnter(){
    this.obtenerInfoUsuario();
  }

  obtenerInfoUsuario(){
    this.emailOk = true;
    this.mostrarSpinner=true;
    this.datosGuardados=false;
    //hacemos petición al servidor
    this.api.obtenUsuarioMe((usuario)=>{
      //guardamos la innfo del usuario original por si cambia el email
      this.usuarioOriginal = usuario;
      //inicializamos el formulario con la info del usuario
      this.formulario.get("email").setValue(usuario.email_user);
      this.formulario.get("nombre").setValue(usuario.nombre);
      this.formulario.get("telefono").setValue(usuario.telefono);
      this.mostrarSpinner=false;
    },(error)=>{
      this.mensajeError = "ocurrió un error, no se pudo obtener información del usuario";
      console.error(this.mensajeError + ", error:", error);
    })
  }

  guardarInfo(){
    this.mostrarSpinner=true;
    this.emailOk=true;
    const info = {
      email:this.formulario.get("email").value,
      nombre:this.formulario.get("nombre").value,
      telefono:this.formulario.get("telefono").value
    }

    this.api.actualizarUsuarioMe(info,(resp)=>{
      console.log("usuario actualizado del servidor:", resp);      
      if(this.usuarioOriginal.email_user !== resp.email_user){
        console.log("se cambió el email del usuario, es necesario hacer logout");
        this.enrutador.navigate(["/logout"],{queryParams:{expiro:true}});
      } else {
        //mostramos mensaje de actualizado
        this.datosGuardados = true;
        this.mostrarSpinner = false;
      }
    },(e)=>{
      if(e.status===409){
        this.emailOk = false;
        this.mostrarSpinner = false;
        this.datosGuardados = false;
      } else {
        this.mensajeError = "ocurrió un error, no se pudo guardar la información del usuario";
        console.error(this.mensajeError + ", error:", e);
      }      
    });
  }

  ngOnInit() {
  }

}
