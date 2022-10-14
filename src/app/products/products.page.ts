import { Component } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})

export class ProductsPage {
  searchTerm: string;

  editMode: boolean = false;

  products: any = [];

  products_api: any = [];

  constructor(
    private productsService: ProductsService,
    private loadingCtrl: LoadingController
  ) {
    this.showData();
  }

  ngOnInit() {}

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 2000,
      spinner: 'circles',
    });
    loading.present();
  }

  async updateListProducts() {
    this.productsService.getProducts().subscribe((res: any) => {
      console.log('Sitios Actualizados', res);
      this.products_api = res;
      localStorage.setItem('productos', JSON.stringify(this.products_api));
      this.showData();
    }, (error: any) => {
      console.log('Error', error);
    });
  }

  clear(){
    localStorage.removeItem('productos');
  }

  async showData(){
    this.showLoading();
    this.products = JSON.parse(localStorage.getItem('productos'));
    console.log('Aqui esta el localStorage', this.products);
  }
}