import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiRazasService } from '../servicios/api-razas.service';

@Component({
  selector: 'app-raza-info',
  templateUrl: './raza-info.page.html',
  styleUrls: ['./raza-info.page.scss'],
})
export class RazaInfoPage implements OnInit {
  mensajeError:string;
  mostrarSpinner:boolean;
  idRaza:number;
  raza:any;

  constructor(private api:ApiRazasService, private ar:ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.mostrarSpinner = true;
    this.ar.queryParams.subscribe((params)=>{
      this.idRaza = parseInt(params.idRaza);
      this.api.obtenerRazaPorId(this.idRaza,(raza)=>{
        console.log("raza del servidor:", raza);                
        if(!raza.raza_alias){//si nno viene coon alias
          raza.raza_alias = raza.raza; //le asignamoos el de la raaza
        }
        this.raza = raza;
        this.mostrarSpinner = false;        
      },(e)=>{
        this.mensajeError="Ocurrió un error, no se pudo obtener la raza, por favor intenta más tarde";
        console.error(this.mensajeError,", error:",e);
      });
    });    
  }

}
