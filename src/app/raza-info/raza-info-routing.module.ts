import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RazaInfoPage } from './raza-info.page';

const routes: Routes = [
  {
    path: '',
    component: RazaInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RazaInfoPageRoutingModule {}
