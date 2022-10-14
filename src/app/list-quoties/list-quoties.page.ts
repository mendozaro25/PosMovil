import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CrudCotizacionesService } from '../services/crud-cotizaciones.service';

@Component({
  selector: 'app-list-quoties',
  templateUrl: './list-quoties.page.html',
  styleUrls: ['./list-quoties.page.scss'],
})
export class ListQuotiesPage implements OnInit {

  searchTerm: string;

  quoties = [];

  constructor(
    private crud: CrudCotizacionesService,
    private alertCtrl: AlertController
  ) {
    this.getQuoties();
   }

  ngOnInit() {
    
  }

  async delete(index) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Estás seguro que deseas eliminar este producto?',
      buttons: [
        {
        text: 'Si',
        handler: ()=> this.crud.removeItem(index) && this.quoties.splice(index, 1),
        },
        {
        text: 'No',
        },
      ],
    });
    alert.present();
  }

  async getQuoties(){
    this.quoties = await this.crud.getData();
  }

  async ionViewWillEnter(){
    this.quoties = await this.crud.getData();
  }
}
