import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddItemComponent } from './menu-items/add-item/add-item.component';
import { ContactComponent } from './menu-items/contact/contact.component';
import { InventoryComponent } from './menu-items/inventory/inventory.component';
import { ScanComponent } from './menu-items/scan/scan.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ShowItemComponent } from './menu-items/show-item/show-item.component'

const routes: Routes = [
  { path: '', component: HomePageComponent, data: { routeIndex: 0 } },
  { path: 'inventory', component: InventoryComponent, data: { routeIndex: 1 } },
  { path: 'scan', component: ScanComponent, data: { routeIndex: 2 } },
  { path: 'add-item', component: AddItemComponent, data: { routeIndex: 3 } },
  { path: 'contact', component: ContactComponent, data: { routeIndex: 4 } },
  { path: 'item/:id', component: ShowItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponent = [
  HomePageComponent,
  ScanComponent,
  InventoryComponent,
  ContactComponent,
  AddItemComponent
]