import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalQuotiesPage } from '../modal-quoties/modal-quoties.page';
import { AlertController } from '@ionic/angular';
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
    private modalCtrl: ModalController
  ) {
    this.getQuoties();
    console.log(this.quoties);
   }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalQuotiesPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
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

  async getQuoties(){
    this.quoties = await this.crud.getData();
  }

  async ionViewWillEnter(){
    this.quoties = await this.crud.getData();
  }
}
