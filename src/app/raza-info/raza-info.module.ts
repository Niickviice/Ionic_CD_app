import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RazaInfoPageRoutingModule } from './raza-info-routing.module';

import { RazaInfoPage } from './raza-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RazaInfoPageRoutingModule
  ],
  declarations: [RazaInfoPage]
})
export class RazaInfoPageModule {}
