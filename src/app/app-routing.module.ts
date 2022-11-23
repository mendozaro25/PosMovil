import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { JoinedGuard } from './joined.guard';
import { NotJoinedGuard } from './not-joined.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [JoinedGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule),
    canActivate: [JoinedGuard]
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule),
    canActivate: [NotJoinedGuard]
  },
  {
    path: 'quote-item',
    loadChildren: () => import('./quote-item/quote-item.module').then( m => m.QuoteItemPageModule)
  },
  {
    path: 'item-quote',
    loadChildren: () => import('./item-quote/item-quote.module').then( m => m.ItemQuoteModule)
  },
  {
    path: 'list-quoties',
    loadChildren: () => import('./list-quoties/list-quoties.module').then( m => m.ListQuotiesPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
