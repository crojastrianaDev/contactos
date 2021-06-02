import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarContactoPageRoutingModule } from './editar-contacto-routing.module';

import { EditarContactoPage } from './editar-contacto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarContactoPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [EditarContactoPage],
})
export class EditarContactoPageModule {}
