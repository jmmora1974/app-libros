import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';
import {PerfilPageModule} from '../pages/perfil/perfil.module'
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin  = ()=> redirectUnauthorizedTo(['login']);
const routes: Routes = [
  {
    path: 'home',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  },
  {
    path: 'crearlibro',
    pathMatch: 'full',
    loadChildren: () => import('../pages/crearlibro/crearlibro.module').then(m => m.CrearlibroPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
   
  }
]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
