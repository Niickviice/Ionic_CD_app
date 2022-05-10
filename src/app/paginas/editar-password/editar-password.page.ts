import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRazasService } from 'src/app/servicios/api-razas.service';
import { Validadores } from 'src/app/validadores/validadores';

@Component({
  selector: 'app-editar-password',
  templateUrl: './editar-password.page.html',
  styleUrls: ['./editar-password.page.scss'],
})
export class EditarPasswordPage implements OnInit {

  formulario:FormGroup;
  mensajeError:string;
  mostrarSpinner:boolean=false;
  datosGuardados:boolean;

  //Inyectamos formBuilder es una variable de nombre formBuilder
  constructor(private api:ApiRazasService, private formBuilder:FormBuilder, private enrutador:Router) {     
    this.formulario = this.formBuilder.group({      
      password:["", [Validators.required, Validators.minLength(5)]],      
      confirmarPassword:["", [Validators.required,Validadores.mismoValor("password")]],            
    });  
  }  

  ngOnInit() {
  }

  guardarInfo(){
    console.log("actualizando password");
    this.mostrarSpinner=true;
    const info = {
      password:this.formulario.get("password").value
    }

    this.api.actualizarUsuarioMe(info,(resp)=>{
      console.log("password actualizado");
      this.datosGuardados = true;
      //this.mostrarSpinner=false;
      //hacemos logout:
      this.enrutador.navigate(["/logout"]);
    },(error)=>{
      this.mensajeError = "ocurrió un error, no se pudo actualizar el password del usuario";
      console.error(this.mensajeError + ", error:", error);
    });
  }



}
