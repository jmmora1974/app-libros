import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin  = ()=> redirectUnauthorizedTo(['login']);


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'crearlibro',
        loadChildren: () => import('../pages/crearlibro/crearlibro.module').then(m => m.CrearlibroPageModule),
        ...canActivate(redirectUnauthorizedToLogin)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../pages/perfil/perfil.module').then(m => m.PerfilPageModule),
        ...canActivate(redirectUnauthorizedToLogin)
      }, 
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'crearlibro',
    loadChildren: () => import('../pages/crearlibro/crearlibro.module').then(m => m.CrearlibroPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('../pages/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
