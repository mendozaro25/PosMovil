import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { QuotePage } from 'src/app/quote/quote.page';
import { QuoteService } from 'src/app/quote/quote.service';
import { ProductsService } from '../../products/products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  code: any;

  product_name: any;
  category_name: any;
  retail_price: any;
  description: any;
  thumbnail: any;
  brand_name: any;
  img: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private toastController: ToastController,
    private quoteService: QuoteService
  ) {
    this.activatedRoute.paramMap.subscribe((p) => {
      this.code = p.get('code');
      console.log(this.code);
      this.get_products(this.code);
    });
  }

  ngOnInit() {}

  get_products(code) {
    this.productsService.getProductsById(code).subscribe(
      (res: any) => {
        console.log('Producto encontrado', res);
        const products = res[0];
        this.product_name = products.product_name;
        this.category_name = products.category_name;
        this.retail_price = products.retail_price;
        this.description = products.description;
        this.brand_name = products.brand_name;
        this.thumbnail = products.thumbnail;
        this.img = products.img;
      },
      
      (error: any) => {
        console.log('Error', error);
      }
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Producto agregado para cotizar',
      duration: 3000,
      icon: 'checkmark-circle-sharp',
      color: 'primary',
      position: 'bottom'
    });
    toast.present();
  }

  addProductToQuote(){
    const quoteItem: QuotePage = {
      code: this.code,
      product_name: this.product_name,
      category_name: this.category_name,
      retail_price: this.retail_price,
      description: this.description,
      thumbnail: this.thumbnail,
      img: this.img,
      brand_name: this.brand_name,
      quantity: 1,
    };
    this.quoteService.addToQuote(quoteItem);
    this.presentToast();
    console.log('Product add to Quote', quoteItem);
  }
}
