import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { InventoryComponent } from './menu-items/inventory/inventory.component';
import { ScanComponent } from './menu-items/scan/scan.component';
import { AddItemComponent } from './menu-items/add-item/add-item.component';
import { ContactComponent } from './menu-items/contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ConfirmItemDeletionComponent } from './dialogs/confirm-item-deletion/confirm-item-deletion.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog';
import { EditInventoryItemComponent } from './dialogs/edit-inventory-item/edit-inventory-item.component'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { AddItemFormComponent } from './forms/add-item-form/add-item-form.component';
import { HttpClientModule } from '@angular/common/http'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmMarkAsActiveComponent } from './dialogs/confirm-mark-as-active/confirm-mark-as-active.component'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { QRCodeModule } from 'angularx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ShowItemComponent } from './menu-items/show-item/show-item.component';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponent,
    NavBarComponent,
    ConfirmItemDeletionComponent,
    EditInventoryItemComponent,
    AddItemFormComponent,
    ConfirmMarkAsActiveComponent,
    ShowItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    EcoFabSpeedDialModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    QRCodeModule,
    ZXingScannerModule,
    NgxPrintModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
