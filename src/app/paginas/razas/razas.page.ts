import { Component, OnInit } from '@angular/core';
import { ApiRazasService } from 'src/app/servicios/api-razas.service';

@Component({
  selector: 'app-razas',
  templateUrl: './razas.page.html',
  styleUrls: ['./razas.page.scss'],
})
export class RazasPage implements OnInit {
  mensajeError:string;
  mostrarSpinner:boolean;
  razas:any[];
  filtroEspecie:string="todos";
  razasOriginales:any[];
  
  TAM_LOTE_DEFAULT=100000; //el totaal de razas a mostrar, @TODO: AGREGAR PAGINACIÓN
  PAG_DEFAULT = 0; //la pagina default de la paginación, @TODO: AGREGAR PAGINACIÓN
  
  constructor(private api:ApiRazasService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.mostrarSpinner = true;
    this.api.obtenerRazas(this.TAM_LOTE_DEFAULT,this.PAG_DEFAULT,(razas)=>{
      console.log("razas del servidor:", razas);
      this.mostrarSpinner = false;
      //agregamos información adicional al objeto de raza
      this.razas = razas.map((raza)=>{
        if(!raza.raza_alias){//si nno viene coon alias
          raza.raza_alias = raza.raza; //le asignamoos el de la raaza
        }
        return raza;
      });            
      this.razasOriginales = this.razas; //para filtrar mas adleante
    },(e)=>{
      this.mensajeError="Ocurrió un error, no se pudieron obtener las razas, por favor intenta más tarde";
      console.error(this.mensajeError,", error:",e);
    })
  }

  filtrar(){
    this.mostrarSpinner = true;
    console.log("filtranndoo por:", this.filtroEspecie);
    if(this.filtroEspecie === "todos"){
      this.razas = this.razasOriginales;
    } else {      
      this.razas = this.razasOriginales.filter((raza)=>{
        return raza.especie === this.filtroEspecie;
      });
    }
    this.mostrarSpinner = false;
  }

}
