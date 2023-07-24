import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalLibroPage } from './modal-libro.page';

const routes: Routes = [
  {
    path: '',
    component: ModalLibroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalLibroPageRoutingModule {}
