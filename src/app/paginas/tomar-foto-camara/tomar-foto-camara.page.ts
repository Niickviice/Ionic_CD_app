import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tomar-foto-camara',
  templateUrl: './tomar-foto-camara.page.html',
  styleUrls: ['./tomar-foto-camara.page.scss'],
})
export class TomarFotoCamaraPage implements OnInit {
  mensajeError:string;
  mostrarSpinner:boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
