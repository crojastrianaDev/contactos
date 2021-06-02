import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarContactoPage } from './editar-contacto.page';

const routes: Routes = [
  {
    path: '',
    component: EditarContactoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarContactoPageRoutingModule {}
