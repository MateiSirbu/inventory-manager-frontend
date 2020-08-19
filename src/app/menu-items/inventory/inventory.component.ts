import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryListMockService } from '../../app-logic/inventory-list-mock.service'
import { InventoryItem } from '../../app-logic/inventory-item'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmItemDeletionComponent } from 'src/app/dialogs/confirm-item-deletion/confirm-item-deletion.component';
import { EditInventoryItemComponent } from 'src/app/dialogs/edit-inventory-item/edit-inventory-item.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  selection = new SelectionModel<Element>(true, []);

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
    'deleted',
    'editAction'
  ]

  constructor(private inventoryListMockService: InventoryListMockService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.inventoryItems = new MatTableDataSource<InventoryItem>(this.inventoryListMockService.getData());
    this.inventoryItems.paginator = this.paginator;
    this.inventoryItems.sort = this.sort;
  }

  masterToggle() {
    this.isAllItemsSelected()
      ? (this.selection.clear())
      : (this.inventoryItems.data.forEach(row => {
        this.selection.select(row);
      }))
  }

  isAllItemsSelected() {
    const selectedItems = this.selection.selected.length;
    const numOfRows = this.inventoryItems.data.length;
    return selectedItems === numOfRows;
  }

  askDeleteSelectedItems() {
    if (this.selection.selected.length == 0)
      alert('No items selected, nothing to delete.')
    else {
      let noOfItems = this.selection.selected.length;
      const dialogRef = this.dialog.open(ConfirmItemDeletionComponent, { width: '250px', data: noOfItems })
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.deleteSelectedItems();
          this.selection.clear();
        }
      })
    }
  }

  editItem(item)
  {
    let itemInfo = {
      id: item.id,
      name: item.name,
      user: item.user,
      description: item.description,
      location: item.location,
      inventoryNumber: item.inventoryNumber
    }
    const dialogRef = this.dialog.open(EditInventoryItemComponent, { width: '250px', data: itemInfo})
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        item.id = itemInfo.id;
        item.name = itemInfo.name;
        item.user = itemInfo.user;
        item.description = itemInfo.description;
        item.location = itemInfo.location;
        item.inventoryNumber = itemInfo.inventoryNumber;
        item.modifiedAt = new Date();
      }
      // TODO: update database with aforementioned information
     })
  }

  deleteSelectedItems() {
    let updatedData = this.inventoryItems.data;
    this.selection.selected.forEach(selectionItem => {
      updatedData = updatedData.filter((inventoryItem) => inventoryItem.id.toString() != selectionItem.id)
    });
    // TODO: update mongoDB via service, this edits the table only
    this.inventoryItems = new MatTableDataSource<InventoryItem>(updatedData);
    // after updating database, fetch data from it instead (delete the previous line and uncomment the next one)
    // this.inventoryItems = new MatTableDataSource<InventoryItem>(this.inventoryListMockService.getData());
    this.inventoryItems.paginator = this.paginator;
    this.inventoryItems.sort = this.sort;
  }

}
