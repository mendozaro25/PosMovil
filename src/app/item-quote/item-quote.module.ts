import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ItemQuotePage } from "./item-quote.page";

@NgModule({
  declarations: [ItemQuotePage],
  imports: [CommonModule, IonicModule],
  exports: [ItemQuotePage]
})

export class ItemQuoteModule {}
