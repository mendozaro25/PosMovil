import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExampleCrudPageRoutingModule } from './example-crud-routing.module';

import { ExampleCrudPage } from './example-crud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExampleCrudPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ExampleCrudPage]
})
export class ExampleCrudPageModule {}
