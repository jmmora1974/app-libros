import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearlibroPage } from './crearlibro.page';

const routes: Routes = [
  {
    path: '',
    component: CrearlibroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearlibroPageRoutingModule {}
