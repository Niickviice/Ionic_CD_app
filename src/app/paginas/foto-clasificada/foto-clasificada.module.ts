import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FotoClasificadaPageRoutingModule } from './foto-clasificada-routing.module';

import { FotoClasificadaPage } from './foto-clasificada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FotoClasificadaPageRoutingModule
  ],
  declarations: [FotoClasificadaPage]
})
export class FotoClasificadaPageModule {}
