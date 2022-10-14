import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuoteItemPageRoutingModule } from './quote-item-routing.module';

import { QuoteItemPage } from './quote-item.page';
import { ItemQuoteModule } from '../item-quote/item-quote.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuoteItemPageRoutingModule,
    ItemQuoteModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [QuoteItemPage]
})
export class QuoteItemPageModule {}
