import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  headers: HttpHeaders;

  constructor(public http: HttpClient) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    /*this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');*/
  }

  getProducts(){
    return this.http.get('http://demo.gpw.cloud/api/movil/product');
  }

  getProductsById(code: string){
    return this.http.get('http://demo.gpw.cloud/api/movil/productId/'+code);
  }
}
