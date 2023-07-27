import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { MapaPageModule } from "../mapa/mapa.module";

@NgModule({
    declarations: [PerfilPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PerfilPageRoutingModule,
        ReactiveFormsModule,
        MapaPageModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PerfilPageModule {}
