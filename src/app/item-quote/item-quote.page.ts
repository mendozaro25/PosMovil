import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QuotePage } from '../quote/quote.page';

@Component({
  selector: 'app-item-quote',
  templateUrl: './item-quote.page.html',
  styleUrls: ['./item-quote.page.scss'],
})
export class ItemQuotePage {

  @Input() item: QuotePage;
  @Output() increase = new EventEmitter();
  @Output() decrease = new EventEmitter();

}
