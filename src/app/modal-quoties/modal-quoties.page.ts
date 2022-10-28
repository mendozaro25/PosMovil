import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-quoties',
  templateUrl: './modal-quoties.page.html',
  styleUrls: ['./modal-quoties.page.scss'],
})
export class ModalQuotiesPage implements OnInit{

  name: string;

  private EditQuoties: FormGroup;

  constructor(
    private modalCtrl: ModalController,  
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder) {
    }

  ngOnInit() {
    this.EditQuoties = this.formBuilder.group({
      typeDocument: [''],
      numberDocument: [''],
      nameSocial: [''],
      phone: ['']
    });
  }

  async cancel() {
    const alert = await this.alertCtrl.create({
      header: 'Cancelar',
      message: '¿Estás seguro que deseas cancelar?',
      buttons: [
        {
          text: 'Si',
          handler: () => this.modalCtrl.dismiss(null, 'cancel'),
        },
        {
          text: 'No',
        },
      ],
    });
    alert.present();
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

}
