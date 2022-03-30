import { StorageService } from './../../servicios/storage.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formulario: FormGroup;
  // eslint-disable-next-line @typescript-eslint/ban-types
  mensajeError: String;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  constructor(private ConstForm: FormBuilder, private http: HttpClient, private enrutador: Router, private almacenservicio: StorageService){
    this.formulario = this.ConstForm.group({
      email:['Correo electrónico ', []],
      password:['password', []]
    });
  }

  ngOnInit() {
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

    this.http.post('http://localhost:8000/token', parametros, opciones)
    .subscribe((respuesta: any )=>{
    console.log('token papu:' + respuesta.access_token);
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
        this.http.get('http://localhost:8000/usuarios/me', option).subscribe((usuario: any)=>{
          console.log('usuario en login:');
          console.log(usuario);
          this.almacenservicio.almacen.set('idUsuario', usuario.id).then(()=>{
            console.log(this.enrutador);
            this.enrutador.navigate(['folder/Inbox']);
          });
        });
      });

    });    
  },
  (error)=>{
    console.log('ocurrio un error');
    console.log(error);
    // eslint-disable-next-line eqeqeq
    if(error.status == 403){
      this.mensajeError = 'Email o Password son incorrectos';
    } else{
      this.mensajeError ='Error en el srvidor, intente más tarde';
    }
  });

 }

}

