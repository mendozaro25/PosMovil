import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { CrudCotizacionesService } from '../services/crud-cotizaciones.service';

@Component({
  selector: 'app-list-quoties',
  templateUrl: './list-quoties.page.html',
  styleUrls: ['./list-quoties.page.scss'],
})
export class ListQuotiesPage{

  searchTerm: string;

  quoties = [];

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';

  constructor(
    private crud: CrudCotizacionesService,
    private alertCtrl: AlertController,
    private toastController: ToastController
  ) {
    this.getQuoties();
    console.log(this.quoties);
   }

  async delete(index) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Estás seguro que deseas eliminar esta cotización?',
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

  async upQuote() {
    const toast = await this.toastController.create({
      message: 'LA COTIZACIÓN SE SUBIÓ CORRECTAMENTE',
      duration: 3000,
      icon: 'checkmark-circle-sharp',
      color: 'success',
      position: 'bottom'
    });
    toast.present();
  }

  async getQuoties(){
    this.quoties = await this.crud.getData();
  }

  async ionViewWillEnter(){
    this.quoties = await this.crud.getData();
  }
}
