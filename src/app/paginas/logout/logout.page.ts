import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {


  constructor(private almacenServ:StorageService, private enrutador:Router, private ar:ActivatedRoute, private menuCtrl:MenuController) { 
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.cerrarSesion();
  }

  cerrarSesion(){   
    this.menuCtrl.enable(false);
    //limpiamos el almacen (todos los datos)
    this.almacenServ.almacen.clear().then(()=>{ 
      this.ar.queryParams.subscribe((params)=>{      
        //una vez limpio el almacen redirigimos al login     

        //revisamos si hay que pasar el mensaje de "expiro" al login
        if(params.expiro && params.expiro==="true"){
          this.enrutador.navigate(["login"],{queryParams:{expiro:true}});
        } else {              
          this.enrutador.navigate(["login"]);
        }
      });
    });          
  }


}
