import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryListMockService } from '../../app-logic/inventory-list-mock.service'
import { InventoryItem } from '../../app-logic/inventory-item'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections'

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
    'deleted'
  ]

  constructor(private inventoryListMockService: InventoryListMockService) { }

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

}
