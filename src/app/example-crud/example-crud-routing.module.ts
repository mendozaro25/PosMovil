import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExampleCrudPage } from './example-crud.page';

const routes: Routes = [
  {
    path: '',
    component: ExampleCrudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExampleCrudPageRoutingModule {}
