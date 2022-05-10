import { TokenGuardiaService } from './servicios/token-guardia.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tomar-foto',
    pathMatch: 'full'
  },  
  {
    path: 'crear-cuenta',
    loadChildren: () => import('./paginas/crear-cuenta/crear-cuenta.module').then( m => m.CrearCuentaPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./paginas/logout/logout.module').then( m => m.LogoutPageModule)
  },
  //rutas protegidas
  {
    path: 'noticias',
    loadChildren: () => import('./paginas/noticias/noticias.module').then( m => m.NoticiasPageModule),
    canActivate:[TokenGuardiaService]
  },
  {
    path: 'mi-cuenta',
    loadChildren: () => import('./paginas/mi-cuenta/mi-cuenta.module').then( m => m.MiCuentaPageModule),
    canActivate:[TokenGuardiaService]
  },
  {
    path: 'tomar-foto',
    loadChildren: () => import('./paginas/tomar-foto/tomar-foto.module').then( m => m.TomarFotoPageModule),
    canActivate:[TokenGuardiaService]
  },
  {
    path: 'mis-fotos',
    loadChildren: () => import('./paginas/mis-fotos/mis-fotos.module').then( m => m.MisFotosPageModule),
    canActivate:[TokenGuardiaService]
  },
  {
    path: 'razas',
    loadChildren: () => import('./paginas/razas/razas.module').then( m => m.RazasPageModule),
    canActivate:[TokenGuardiaService]
  },
  {
    path: 'editar-foto',
    loadChildren: () => import('./paginas/editar-foto/editar-foto.module').then( m => m.EditarFotoPageModule),
    canActivate:[TokenGuardiaService]
  },
  {
    path: 'editar-password',
    loadChildren: () => import('./paginas/editar-password/editar-password.module').then( m => m.EditarPasswordPageModule),
    canActivate:[TokenGuardiaService]
  },
  {
    path: 'editar-cuenta',
    loadChildren: () => import('./paginas/editar-cuenta/editar-cuenta.module').then( m => m.EditarCuentaPageModule),
    canActivate:[TokenGuardiaService]
  },
  {
    path: 'eliminar-cuenta',
    loadChildren: () => import('./paginas/eliminar-cuenta/eliminar-cuenta.module').then( m => m.EliminarCuentaPageModule),
    canActivate:[TokenGuardiaService]
  },
  {
    path: 'tomar-foto-camara',
    loadChildren: () => import('./paginas/tomar-foto-camara/tomar-foto-camara.module').then( m => m.TomarFotoCamaraPageModule),
    canActivate:[TokenGuardiaService]
  },
  {
    path: 'tomar-foto-archivos',
    loadChildren: () => import('./paginas/tomar-foto-archivos/tomar-foto-archivos.module').then( m => m.TomarFotoArchivosPageModule),
    canActivate:[TokenGuardiaService]
  },
  {
    path: 'foto-clasificada',
    loadChildren: () => import('./paginas/foto-clasificada/foto-clasificada.module').then( m => m.FotoClasificadaPageModule),
    canActivate:[TokenGuardiaService]
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
