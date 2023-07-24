import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalLibroPageRoutingModule } from './modal-libro-routing.module';

import { ModalLibroPage } from './modal-libro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalLibroPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalLibroPage]
})
export class ModalLibroPageModule {}
