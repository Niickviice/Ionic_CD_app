import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPasswordPageRoutingModule } from './editar-password-routing.module';

import { EditarPasswordPage } from './editar-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPasswordPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditarPasswordPage]
})
export class EditarPasswordPageModule {}
