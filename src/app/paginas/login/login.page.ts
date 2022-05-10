import { StorageService } from './../../servicios/storage.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URL_API_OBTEN_TOKEN, URL_API_OBTEN_USUARIO_ME } from 'src/app/app.constantes';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formulario: FormGroup;
  // eslint-disable-next-line @typescript-eslint/ban-types
  mensajeError: String;
  expiro:boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  constructor(private activatedRoute:ActivatedRoute, 
              private ConstForm: FormBuilder, 
              private http: HttpClient, 
              private enrutador: Router, 
              private menuCtrl:MenuController,
              private almacenservicio: StorageService){
    this.formulario = this.ConstForm.group({
      email:['arcade_fire@gmail.com', []],
      password:['1234', []]
    });
  }

  ngOnInit() {    
  }

  //tan pronto esté lista la aplicacion
  ionViewWillEnter(){
    this.menuCtrl.enable(false); // escondemos el menú lateral
    this.expiro = false;
    //reseteamos el formulario
    this.formulario.reset();
    //obtenemos los parametros del query string
    this.activatedRoute.queryParams.subscribe((params)=>{
      if(params.expiro){
        this.expiro = params.expiro === "true";
      }
    });
  }

  enviarDatos(){
    console.log('enviando datos');
    const emailF = this.formulario.get('email').value;
    const passwordF = this.formulario.get('password').value;
    console.log('email' +emailF );
    console.log('password' +passwordF);

    const parametros = 'username=' + emailF + '&password=' + passwordF ;
    const opciones = {
      headers:{
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    this.http.post(URL_API_OBTEN_TOKEN, parametros, opciones)
    .subscribe((respuesta: any )=>{
    console.log('token:' + respuesta.access_token);
    //Guardar el Token en el STORAGE
    this.almacenservicio.almacen.set('token', respuesta.access_token).then(()=>{
      //Obtener el token
      this.almacenservicio.almacen.get('token').then((token) =>{
        console.log('Token del almacenamiento:' + token);
        const option = {
          headers:{
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: 'Bearer ' + respuesta.access_token
          }
        };
        this.http.get(URL_API_OBTEN_USUARIO_ME, option).subscribe((usuario: any)=>{
          console.log('usuario en login:');
          console.log(usuario);
          this.almacenservicio.almacen.set('idUsuario', usuario.id).then(()=>{
            this.almacenservicio.almacen.set("nombreUsuario",usuario.nombre).then(()=>{              
              console.log(this.enrutador);
              //mostramos el menú lateral
              this.menuCtrl.enable(true);              
              this.enrutador.navigate(['/tomar-foto']);
            });
          });
        });
      });

    });
  },
  (error)=>{
    console.log('ocurrio un error');
    console.log(error);
    // eslint-disable-next-line eqeqeq
    if(error.status === 403 || error.status===401){
      this.mensajeError = 'Email o Password son incorrectos';
    } else{
      this.mensajeError ='Error en el servidor, intente más tarde';
    }
  });

 }

}

