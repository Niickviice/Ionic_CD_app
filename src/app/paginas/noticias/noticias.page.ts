import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  razas: any

  constructor(private almacenServicio: StorageService, private http: HttpClient) {

    this.almacenServicio.almacen.get('token').then((token)=>{
        const option = {
          headers:{
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: 'Bearer ' + token
          }
        };
        this.http.get('http://localhost:8000/razasCompletas?lote=10&pag=1', option)
        .subscribe((razas)=>{
          console.log('usuario:', razas);
          this.razas = razas;
        });
    });
   }

  ngOnInit() {
  }

}
