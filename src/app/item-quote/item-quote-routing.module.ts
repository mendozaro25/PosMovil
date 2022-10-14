import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemQuotePage } from './item-quote.page';

const routes: Routes = [
  {
    path: '',
    component: ItemQuotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemQuotePageRoutingModule {}
