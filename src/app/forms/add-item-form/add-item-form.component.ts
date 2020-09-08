import { Component, OnInit } from '@angular/core';
import { InventoryListMockService } from 'src/app/app-logic/inventory-list-mock.service';
import { InventoryItem } from 'src/app/app-logic/inventory-item';
import { Router } from '@angular/router';
import { InventoryListService } from 'src/app/app-logic/inventory-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css']
})
export class AddItemFormComponent {

  constructor(private inventoryMockService: InventoryListMockService,
     private route: Router,
     private inventoryListService: InventoryListService,
     private snackBar: MatSnackBar) { }

  submitted = false;

  model = new InventoryItem({
    name: "Thingamajig",
    user: "John Doe",
    location: "Level 1",
    inventoryNumber: 12345678,
    createdAt: new Date(),
    modifiedAt: new Date(),
    description: "The thing in a nutshell, or two",
    active: false
  })

  onSubmit() {
    // this.model.id = this.inventoryMockService.getLastId() + 1; 
    // unnecessary, mongoDB does this for you. Also not required by API, throws internal error
    this.inventoryListService.postData(this.model)
    .pipe(tap((resp) => {
      if (resp != null)
        this.submitted = true;
    }))
    .pipe(catchError((error: HttpErrorResponse) => {
      this.openSnackBarAlert(`${error.status} ${error.statusText}. Cannot add item.`);
      return EMPTY;
    }))
    .subscribe();
  }

  navigateToInventoryList() {
    this.route.navigate(['/inventory']);
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['my-snack-bar']
    });
  }

  openSnackBarAlert(message) {
    this.snackBar.open(message, 'OK', {
      panelClass: ['my-snack-bar-alert']
    });
  }

}
