import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TomarFotoArchivosPageRoutingModule } from './tomar-foto-archivos-routing.module';

import { TomarFotoArchivosPage } from './tomar-foto-archivos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TomarFotoArchivosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TomarFotoArchivosPage]
})
export class TomarFotoArchivosPageModule {}
