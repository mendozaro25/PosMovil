import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CrudCotizacionesService } from '../services/crud-cotizaciones.service';
import { QuotePage } from '../quote/quote.page';
import { QuoteService } from '../quote/quote.service';

@Component({
  selector: 'app-quote-item',
  templateUrl: './quote-item.page.html',
  styleUrls: ['./quote-item.page.scss'],
})
export class QuoteItemPage implements OnInit {
  segmentValue = '1';

  total: any;

  products: any = [];

  products2: any = [];

  phoneValue: any;

  private quoties: FormGroup;

  quoteItems$: Observable<QuotePage[]>;
  totalPrice$: Observable<number>;

  constructor(
    private quoteService: QuoteService,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private crud: CrudCotizacionesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.quoties = this.formBuilder.group({
      typeDocument: ['', Validators.required],
      numberDocument: ['', Validators.required],
      nameSocial: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.quoteItems$ = this.quoteService.getQuoties();
    this.quoteItems$.subscribe((res) => (this.products = res));

    this.quoteItems$.subscribe((pr) => (this.products2 = pr[0]));
    console.log(this.products2);

    this.totalPrice$ = this.quoteService.getTotalPrice();
    this.totalPrice$.subscribe((res) => (this.total = res));
  }

  async agregar() {
    const datos = [
      {
        quote_id: 'qt' + Math.random().toString(16).slice(2),
        quote_typeDocument: this.quoties.value.typeDocument,
        quote_numberDocument: this.quoties.value.numberDocument,
        quote_nameSocial: this.quoties.value.nameSocial,
        quote_phone: this.quoties.value.phone,
        product_code: this.products2.code,
        product_name: this.products2.product_name,
        product_category: this.products2.category_name,
        product_retail_price: this.products2.retail_price,
        product_description: this.products2.description,
        product_img: this.products2.img,
        product_brand_name: this.products2.brand_name,
        product_quantity: this.products2.quantity,
        subTotal_quote: this.total,
      },
    ];
    await this.crud.addData(datos);
    const toast = await this.toastController.create({
      message: 'Cotización agregada',
      duration: 3000,
      icon: 'checkmark-circle-sharp',
      color: 'primary',
      position: 'bottom',
    });
    toast.present();
    this.quoties.reset();
  }

  onIncrease(item: QuotePage) {
    this.quoteService.changeQty(1, item.code);
  }

  onDecrease(item: QuotePage) {
    if (item.quantity == 1) this.removeFromQuote(item);
    else this.quoteService.changeQty(-1, item.code);
  }

  async removeFromQuote(item: QuotePage) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Estás seguro que deseas eliminar este producto?',
      buttons: [
        {
          text: 'Si',
          handler: () => this.quoteService.removeQuote(item.code),
        },
        {
          text: 'No',
        },
      ],
    });
    alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Producto agregado para cotizar',
      duration: 3000,
      icon: 'checkmark-circle-sharp',
      color: 'primary',
      position: 'bottom',
    });
    toast.present();
  }

  segmentChanged(event) {
    console.log(event);
    this.segmentValue = event.detail.value;
  }
}
