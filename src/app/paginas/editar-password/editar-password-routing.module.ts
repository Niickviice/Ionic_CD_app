import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPasswordPage } from './editar-password.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPasswordPageRoutingModule {}
