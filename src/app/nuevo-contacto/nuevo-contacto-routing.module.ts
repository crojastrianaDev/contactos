import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoContactoPage } from './nuevo-contacto.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoContactoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoContactoPageRoutingModule {}
