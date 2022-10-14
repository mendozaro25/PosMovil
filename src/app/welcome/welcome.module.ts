import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomePageRoutingModule } from './welcome-routing.module';

import { WelcomePage } from './welcome.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

// Https Client
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomePageRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  declarations: [WelcomePage]
})
export class WelcomePageModule {}
