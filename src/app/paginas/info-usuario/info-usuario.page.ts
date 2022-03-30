import { StorageService } from './../../servicios/storage.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.page.html',
  styleUrls: ['./info-usuario.page.scss'],
})
export class InfoUsuarioPage implements OnInit {

  usuario: any;


  constructor(private almacenServicio: StorageService, private http:HttpClient) {
    this.almacenServicio.almacen.get('token').then((token)=>{
      this.almacenServicio.almacen.get('idUsuario').then((idUsuario)=>{
        const option = {
          headers:{
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: 'Bearer ' + token
          }
        };
        this.http.get('http://localhost:8000/usuario/' + idUsuario, option)
        .subscribe((infoUsuario)=>{
          console.log("usuario:", infoUsuario);
          this.usuario = infoUsuario;
        });

      });
    });
   }

  ngOnInit() {
  }

}
