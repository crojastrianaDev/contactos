import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'contactos',
    loadChildren: () => import('./contactos/contactos.module').then( m => m.ContactosPageModule)
  },
  {
    path: 'nuevo-contacto',
    loadChildren: () => import('./nuevo-contacto/nuevo-contacto.module').then( m => m.NuevoContactoPageModule)
  },
  {
    path: 'editar-contacto',
    loadChildren: () => import('./editar-contacto/editar-contacto.module').then( m => m.EditarContactoPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
