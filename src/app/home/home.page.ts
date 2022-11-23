import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CrudCotizacionesService } from '../services/crud-cotizaciones.service';
import { QuotePage } from '../quote/quote.page';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  quoteItems$: Observable<QuotePage[]>;

  quotes: any = [];

  listado = [];

  products: any = [];
  
  constructor(
    private router: Router,
    private toastController: ToastController,
    private crud: CrudCotizacionesService,
    private productsService: ProductsService
  ) {
    this.getProducts();
    this.listar();
    console.log(this.listar);
  }

  ngOnInit() {
  }

  async getProducts() {
    this.productsService.getProducts().subscribe((res: any) => {
      console.log('Productos Sincronizados', res);
      this.products = res;
    }, (error: any) => {
      console.log('Error', error);
    });
  }

  async listar(){
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
}
