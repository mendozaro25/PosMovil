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

  price: any = [];

  total: any;

  private quoties: FormGroup;

  quoteItems$: Observable<QuotePage[]>;
  totalPrice$: Observable<number>;

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caracteres restantes`;
  }
  
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
      phone: ['', Validators.required]
    });
    this.quoteItems$ = this.quoteService.getQuoties();
    console.log(this.quoteItems$);
    this.totalPrice$ = this.quoteService.getTotalPrice();
    this.totalPrice$.subscribe(res => this.total = res)
  }

  async agregar() {
    const datos = [
      {
        id: Math.floor(Math.random() * 100),
        typeDocument: this.quoties.value.typeDocument,
        numberDocument: this.quoties.value.numberDocument,
        nameSocial: this.quoties.value.nameSocial,
        phone: this.quoties.value.phone,
        price: this.total
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
