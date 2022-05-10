import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TomarFotoCamaraPageRoutingModule } from './tomar-foto-camara-routing.module';

import { TomarFotoCamaraPage } from './tomar-foto-camara.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TomarFotoCamaraPageRoutingModule
  ],
  declarations: [TomarFotoCamaraPage]
})
export class TomarFotoCamaraPageModule {}
