import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CrudCotizacionesService } from '../services/crud-cotizaciones.service';
import { QuotePage } from '../quote/quote.page';
import { QuoteService } from '../quote/quote.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  quoteItems$: Observable<QuotePage[]>;

  products_api: any = [];

  quotes: any = [];

  listado = [];

  products: any = [];
  
  constructor(
    private router: Router,
    private toastController: ToastController,
    private quoteService: QuoteService,
    private crud: CrudCotizacionesService
  ) {
    this.products = JSON.parse(localStorage.getItem('productos'));
    console.log(this.products);
    this.listar();
    console.log(this.listar);
  }

  ngOnInit() {
    this.quoteItems$ = this.quoteService.getQuoties();
    console.log(this.quoteItems$);
    this.listar();
  }

  async listar(){
    this.listado = await this.crud.getData();
  }

  async ionViewWillEnter(){
    this.listado = await this.crud.getData();
  }

  async signOut() {
    localStorage.removeItem('ingresado');
    this.router.navigateByUrl('welcome');
    const toast = await this.toastController.create({
      message: '¡NOS VEMOS PRONTO!',
      duration: 4000,
      icon: 'hand-left-sharp',
      color: 'secondary',
    });
    toast.present();
  }

  get_quotes(){
    this.quoteService.getQuoties().subscribe((res: any) => {
      this.quotes = res;
      console.log('qa', this.quotes);
    }, (error: any) => {
      console.log('Error', error);
    });
  }
}
