import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearlibroPageRoutingModule } from './crearlibro-routing.module';

import { CrearlibroPage } from './crearlibro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearlibroPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrearlibroPage]
})
export class CrearlibroPageModule {}
