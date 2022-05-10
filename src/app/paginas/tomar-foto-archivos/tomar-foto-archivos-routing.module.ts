import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TomarFotoArchivosPage } from './tomar-foto-archivos.page';

const routes: Routes = [
  {
    path: '',
    component: TomarFotoArchivosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TomarFotoArchivosPageRoutingModule {}
