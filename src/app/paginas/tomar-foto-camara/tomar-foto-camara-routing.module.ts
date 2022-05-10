import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TomarFotoCamaraPage } from './tomar-foto-camara.page';

const routes: Routes = [
  {
    path: '',
    component: TomarFotoCamaraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TomarFotoCamaraPageRoutingModule {}
