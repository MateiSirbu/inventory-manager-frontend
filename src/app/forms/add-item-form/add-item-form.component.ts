import { Component, OnInit } from '@angular/core';
import { InventoryListMockService } from 'src/app/app-logic/inventory-list-mock.service';
import { InventoryItem } from 'src/app/app-logic/inventory-item';
import { Router } from '@angular/router';
import { InventoryListService } from 'src/app/app-logic/inventory-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { Authenticator } from 'src/app/app-logic/authenticator.service';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css']
})
export class AddItemFormComponent implements OnInit {

  constructor(private inventoryMockService: InventoryListMockService,
    private route: Router,
    private inventoryListService: InventoryListService,
    private snackBar: MatSnackBar,
    public authenticator: Authenticator) { }

  submitted = false;

  model = new InventoryItem({
    name: "Thingamajig",
    user: "John Doe",
    location: "Level 1",
    inventoryNumber: 12345678,
    createdAt: new Date(),
    addedAt: new Date(),
    addedBy: 'Unknown User',
    modifiedAt: new Date(),
    modifiedBy: 'Unknown User',
    description: "The thing in a nutshell, or two",
    active: false
  })

  ngOnInit() {
    if (!this.authenticator.isLoggedIn()) {
      this.openSnackBarAlert('To add an item, you need to log in first.')
      this.route.navigate(['/login']);
      return;
    }
  }

  onSubmit() {
    this.authenticator.getAuthenticatedUserInfo()
      .pipe(catchError((err) => {
        this.openSnackBarAlert(`${err.status}: ${err.statusText}. Cannot add item.`);
        return EMPTY;
      }))
      .subscribe((res) => {
        this.model.addedBy = res.firstName + ' ' + res.lastName;
        this.model.modifiedBy = res.firstName + ' ' + res.lastName;
        this.model.addedAt = new Date();
        this.model.modifiedAt = new Date();
        this.inventoryListService.postData(this.model)
          .pipe(tap((resp) => {
            if (resp != null) {
              this.submitted = true;
            }
          }))
          .pipe(catchError((error: HttpErrorResponse) => {
            this.openSnackBarAlert(`${error.status}: ${error.statusText}. Cannot add item.`);
            return EMPTY;
          }))
          .subscribe();
      })

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
      duration: 10000,
      panelClass: ['my-snack-bar-alert']
    });
  }

}
