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

  constructor(
    private productsService: ProductsService,
    private loadingCtrl: LoadingController
  ) {
    this.getProducts();
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

  async getProducts() {
    this.showLoading();
    this.productsService.getProducts().subscribe((res: any) => {
      console.log('Productos Sincronizados', res);
      this.products = res;
    }, (error: any) => {
      console.log('Error', error);
    });
  }
}