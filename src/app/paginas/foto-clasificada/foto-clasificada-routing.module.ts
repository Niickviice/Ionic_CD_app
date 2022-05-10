import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FotoClasificadaPage } from './foto-clasificada.page';

const routes: Routes = [
  {
    path: '',
    component: FotoClasificadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotoClasificadaPageRoutingModule {}
