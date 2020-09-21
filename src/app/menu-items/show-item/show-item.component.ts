import { Component, OnInit } from '@angular/core';
import { InventoryListService } from '../../app-logic/inventory-list.service';
import { InventoryItem } from 'src/app/app-logic/inventory-item';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css']
})
export class ShowItemComponent implements OnInit {

  itemId: string;
  item: InventoryItem;
  searchedForItem = false;
  itemIsFound = false;

  constructor(
    private inventoryListService: InventoryListService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) {
    this.activatedRoute.params.subscribe((params) => {
      this.itemId = params.id;
    })
  }

  ngOnInit(): void {
    this.inventoryListService.getDataById(this.itemId)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.itemIsFound = false;
        this.searchedForItem = true;
        if (error.status != 404) // do not show snackbar if connection to backend is OK but item does not exist
          this.openSnackBarAlert(`${error.status} ${error.statusText}. Cannot fetch item from database.`);
        return EMPTY;
      }))
      .subscribe((data) => {
        this.item = new InventoryItem(data);
        this.itemIsFound = this.item ? true : false;
        this.searchedForItem = true;
      });
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
