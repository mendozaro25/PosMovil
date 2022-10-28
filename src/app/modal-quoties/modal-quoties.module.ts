import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalQuotiesPageRoutingModule } from './modal-quoties-routing.module';

import { ModalQuotiesPage } from './modal-quoties.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalQuotiesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalQuotiesPage]
})
export class ModalQuotiesPageModule {}
