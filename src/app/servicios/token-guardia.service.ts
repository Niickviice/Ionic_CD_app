import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenGuardiaService implements CanActivate{

  constructor(private almacenServicio: StorageService, private enreutador: Router) {

  }
  
  private expiroToken(token: string) {
    if(token!=null){
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
    } 
    return true;//expiró token
  }

  // Regresa un valor booleano sí se puede o no ejecutar una página
  // eslint-disable-next-line @typescript-eslint/member-ordering
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.almacenServicio.almacen.get('token').then((token)=>{

      if(this.expiroToken(token)){
        this.enreutador.navigate(['login'], {queryParams:{expiro:true}});
        return false;
      }

      //No ha expirado el token
      return true; // puede ejecutar la pagina

    });
  }
}
