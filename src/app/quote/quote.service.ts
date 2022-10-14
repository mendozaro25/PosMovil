import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuotePage } from './quote.page';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private items$ = new BehaviorSubject<QuotePage[]>([]);

  getQuoties(){
    return this.items$.asObservable();
  }

  addToQuote(newItem: QuotePage){
    this.items$.next([...this.items$.getValue(), newItem]);
  }

  removeQuote(code: string){
    this.items$.next(this.items$.getValue().filter((item)=> item.code !== code));
  }

  changeQty(quantity: number, code:string){
    const items = this.items$.getValue();
    const index = items.findIndex(item => item.code == code);
    items[index].quantity += quantity;
    this.items$.next(items);
  }

  getTotalPrice(){
    return this.items$.pipe(map(items => {
      let total = 0;
      items.forEach(item => {
        total += item.quantity * item.retail_price;
      });
      return total;
    })
    );
  }
}
