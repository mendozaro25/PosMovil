import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuoteItemPage } from './quote-item.page';

const routes: Routes = [
  {
    path: '',
    component: QuoteItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuoteItemPageRoutingModule {}
