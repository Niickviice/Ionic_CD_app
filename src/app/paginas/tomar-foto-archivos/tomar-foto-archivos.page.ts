import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tomar-foto-archivos',
  templateUrl: './tomar-foto-archivos.page.html',
  styleUrls: ['./tomar-foto-archivos.page.scss'],
})
export class TomarFotoArchivosPage implements OnInit {
  mensajeError:string;
  mostrarSpinner:boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
