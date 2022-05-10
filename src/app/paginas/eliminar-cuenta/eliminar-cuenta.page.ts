import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRazasService } from 'src/app/servicios/api-razas.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { Validadores } from 'src/app/validadores/validadores';

@Component({
  selector: 'app-eliminar-cuenta',
  templateUrl: './eliminar-cuenta.page.html',
  styleUrls: ['./eliminar-cuenta.page.scss'],
})
export class EliminarCuentaPage implements OnInit {

  formulario:FormGroup;
  mensajeError:string;

  //Inyectamos formBuilder es una variable de nombre formBuilder
  constructor(private api:ApiRazasService, private formBuilder:FormBuilder, private enrutador:Router, private almacenServ:StorageService) {     
    this.formulario = this.formBuilder.group({      
      confirmar:["destruir mi cuenta", [Validators.required]],      
      confirmarTexto:["", [Validators.required,Validadores.mismoValor("confirmar")]],            
    });  
  }  

  ngOnInit() {
  }

  eliminarCuenta(){
    
    if(this.formulario.get("confirmarTexto").value!=="destruir mi cuenta"){    
      this.mensajeError="Error, no has escrito en el recuadro el texto: acepto"
    }else {
      this.api.eliminarUsuarioMe((resp)=>{
        console.log("usuario eliminado, limpiando almacen")
        this.almacenServ.almacen.clear().then(()=>{
          console.log("usuario eliminardo, redirigiendo a login");
          this.enrutador.navigate(["login"]).then(()=>{
            window.location.reload();
          });
        })
      },(error)=>{
        this.mensajeError = "ocurrió un error, no se pudo eliminar tu cuenta";
        console.error(this.mensajeError + ", error:", error);
      });
    }    
  }
}
