import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarFotoPageRoutingModule } from './editar-foto-routing.module';

import { EditarFotoPage } from './editar-foto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarFotoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditarFotoPage]
})
export class EditarFotoPageModule {}
