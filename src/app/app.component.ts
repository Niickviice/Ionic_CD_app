import { Component } from '@angular/core';
import { ApiRazasService } from './servicios/api-razas.service';
import { StorageService } from './servicios/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Mi cuenta', url: '/mi-cuenta', icon: 'person-circle' },
    { title: 'Tomar foto', url: '/tomar-foto', icon: 'camera' },
    { title: 'Mis fotos', url: '/mis-fotos', icon: 'images' },
    { title: 'Razas', url: '/razas', icon: 'paw' },
    { title: 'Cerrar sesión', url: '/logout', icon: 'log-out' },

  ];
  
  
  nombreUsuario:string="";
  
  constructor(private api:ApiRazasService, private almacenServ:StorageService) {            
  }

  ngOnInit(){
    this.obtenerUsuario();
  }

  obtenerUsuario(){
    //al arrancar la aplicación obtenemos el nombre del usuario
    this.almacenServ.almacen.get("token").then((token)=>{
      if(token!==null){
        console.log("token del usuario:",token);
        this.api.obtenUsuarioMe((usuario)=>{
          this.nombreUsuario = usuario.nombre;
          console.log("nombre del usuario:",this.nombreUsuario);          
        },
        (error)=>{
          console.error("ocurrio un error:",error);
        })
      }
    });    
  }
}
