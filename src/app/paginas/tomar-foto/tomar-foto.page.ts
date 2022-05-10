import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tomar-foto',
  templateUrl: './tomar-foto.page.html',
  styleUrls: ['./tomar-foto.page.scss'],
})
export class TomarFotoPage implements OnInit {
  mensajeError:string;
  mostrarSpinner:boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
