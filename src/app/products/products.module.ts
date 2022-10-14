import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

// Https Client
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    Ng2SearchPipeModule,
    HttpClientModule
  ],
  declarations: [ProductsPage]
})
export class ProductsPageModule {}
