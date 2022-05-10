import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { SITE_KEY_RECAPTCHA } from 'src/app/app.constantes';
import { ApiRazasService } from 'src/app/servicios/api-razas.service';
import { Validadores } from 'src/app/validadores/validadores';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
})
export class CrearCuentaPage implements OnInit {

  @ViewChild("captcha")
  captcha:any;

  @ViewChild("botonGuardar")
  botonGuardar:any;

  formulario:FormGroup;
  datosGuardados:boolean;
  mensajeError:string;
  recaptchaKey:string=SITE_KEY_RECAPTCHA;
  captchaOK:boolean=false;

  constructor(private formBuilder:FormBuilder, private enrutador:Router, private api:ApiRazasService,private menuCtrl:MenuController) { 
    this.menuCtrl.enable(false); //deshabilitamos el menú lateral    
    this.formulario = this.formBuilder.group({
      email:["test@email.com", [Validators.required,Validators.email]],
      nombre:["test nombre canción", [Validators.required]],
      password:["12345",[Validators.required,Validators.minLength(5)]],
      confirmarPassword:["12345",[Validators.required,Validadores.mismoValor("password")]]
    });  
  }

  inicializarFormulario(){
    this.formulario.reset();
    this.captcha.reset();
  }

  mostrarLogin(){
    this.enrutador.navigate(["/login"]);
  }

  enCaptchaResuelto(evento){
    console.log("captcha resuelto:", evento);
    this.captchaOK=true;
  }

  crearCuenta(){
    console.log("creando cuenta");

    this.botonGuardar.disabled=true; //bloqueamos el botón de guardar
    this.mensajeError=""; //borramos cualquier mensaje de error previo 

    //preparamos objeto usuario
    const usuario = {
      nombre:this.formulario.get("nombre").value,
      email:this.formulario.get("email").value,
      password:this.formulario.get("password").value,
      telefono:""
    };

    //invocamos al api de ciclones para crear el usuario
    this.api.crearUsuario(usuario,(usuario)=>{
      console.log("usuario creado en el servidor:",usuario);
      //si todo se guardo bien
      this.datosGuardados=true;
      setTimeout(()=>{
        this.mostrarLogin();
      },3000);
    },(e)=>{
      //si ocurre un error
      this.captcha.reset();  //reiniciamos el captcha
      this.captchaOK=false;
      if(e.status===409){
       this.mensajeError = "Ya existe un usuario con ese email"; 
      }else{
       this.mensajeError = "ocurrió un error en el servidor, intenta más tarde"; 
      }
      console.error(this.mensajeError + ", error:",e);
    });
  }

  ngOnInit() {    
  }

  ionViewWillEnter(){
    //si el usuario vuelve a entrar a la página nos aseguramos de que se borre el formulario anterior
    this.inicializarFormulario();
  }

}