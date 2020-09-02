import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryListMockService } from '../../app-logic/inventory-list-mock.service'
import { InventoryListService } from '../../app-logic/inventory-list.service'
import { InventoryItem } from '../../app-logic/inventory-item'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmItemDeletionComponent } from 'src/app/dialogs/confirm-item-deletion/confirm-item-deletion.component';
import { EditInventoryItemComponent } from 'src/app/dialogs/edit-inventory-item/edit-inventory-item.component';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize, tap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  selection = new SelectionModel<Element>(true, []);
  isLoading: boolean;
  inventoryItems: any;

  inventoryColumns: string[] = [
    'select',
    'id',
    'name',
    'user',
    'description',
    'location',
    'inventoryNumber',
    'createdAt',
    'modifiedAt',
    'editAction'
  ]

  constructor(private inventoryListMockService: InventoryListMockService, public dialog: MatDialog, private fb: FormBuilder,
    private inventoryListService: InventoryListService) { }

  ngOnInit(): void {
    // this.inventoryItems = new MatTableDataSource<InventoryItem>(this.inventoryListMockService.getData());
    // this.inventoryItems.paginator = this.paginator;
    // this.inventoryItems.sort = this.sort;
    this.isLoading = true;
    this.inventoryListService.getData()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data) => {
        this.inventoryItems = data;
        this.isLoading = false;
      }, (error) => { console.log('Table could not be filled with data. ', error) });

    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        tap(() => {
          this.isLoading = true;
          this.inventoryListService.getData()
            .pipe(
              finalize(() => {
                this.isLoading = false;
              })
            )
            .subscribe((data) => {
              this.inventoryItems = data;
              this.isLoading = false;
            }, (error) => { console.log('Table could not be filled with data. ', error) });
        })
      ).subscribe();

  }

  masterToggle() {
    this.isAllItemsSelected()
      ? (this.selection.clear())
      : (this.inventoryItems.forEach(row => {
        this.selection.select(row);
      }))
  }

  isAllItemsSelected() {
    const selectedItems = this.selection.selected.length;
    const numOfRows = this.inventoryItems.length;
    return selectedItems === numOfRows;
  }

  askDeleteSelectedItems() {
    if (this.selection.selected.length == 0)
      alert('No items selected, nothing to delete.')
    else {
      let noOfItems = this.selection.selected.length;
      const dialogRef = this.dialog.open(ConfirmItemDeletionComponent, { width: '300px', data: noOfItems })
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.deleteSelectedItems();
          this.selection.clear();
        }
      })
    }
  }

  editItem(item) {
    let itemInfoForm = this.fb.group({
      id: [item.id],
      name: [item.name, Validators.required],
      description: [item.description, Validators.maxLength(200)],
      user: [item.user, Validators.required],
      location: [item.location, Validators.required],
      inventoryNumber: [item.inventoryNumber, Validators.required],
      createdAt: [item.createdAt, Validators.required]
    })
    const dialogRef = this.dialog.open(EditInventoryItemComponent, { width: '400px', data: itemInfoForm })
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        item.id = itemInfoForm.value.id;
        item.name = itemInfoForm.value.name;
        item.user = itemInfoForm.value.user;
        item.description = itemInfoForm.value.description;
        item.location = itemInfoForm.value.location;
        item.inventoryNumber = itemInfoForm.value.inventoryNumber;
        item.createdAt = itemInfoForm.value.createdAt;
        item.modifiedAt = new Date();
        this.inventoryListService.putData(item).subscribe();
      }
    })
  }

  deleteSelectedItems() {
    let updatedData = this.inventoryItems.data;
    this.selection.selected.forEach(selectionItem => {
      updatedData = updatedData.filter((inventoryItem) => inventoryItem.id.toString() != selectionItem.id)
    });
    // TODO: update mongoDB via service, this edits the table only
    this.inventoryListMockService.inventoryData = updatedData;
    this.inventoryItems = new MatTableDataSource<InventoryItem>(this.inventoryListMockService.getData());
    this.inventoryItems.paginator = this.paginator;
    this.inventoryItems.sort = this.sort;
  }

}
