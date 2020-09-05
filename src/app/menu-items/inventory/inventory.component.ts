import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryListMockService } from '../../app-logic/inventory-list-mock.service'
import { InventoryListService } from '../../app-logic/inventory-list.service'
import { InventoryItem } from '../../app-logic/inventory-item'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmItemDeletionComponent } from 'src/app/dialogs/confirm-item-deletion/confirm-item-deletion.component';
import { EditInventoryItemComponent } from 'src/app/dialogs/edit-inventory-item/edit-inventory-item.component';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize, tap, switchMap } from 'rxjs/operators';
import { merge, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  selection = new SelectionModel<InventoryItem>(true, []);
  isLoading: boolean;
  inventoryItems: InventoryItem[];
  activeOnly$ = new BehaviorSubject(false);
  itemsCount = 0;

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

  get activeOnly(): boolean {
    return this.activeOnly$.value;
  }

  set activeOnly(v: boolean) {
    this.activeOnly$.next(v);
  }

  constructor(private inventoryListMockService: InventoryListMockService, public dialog: MatDialog, private fb: FormBuilder,
    private inventoryListService: InventoryListService) { }

  ngOnInit(): void {

    this.isLoading = true;

    merge(this.sort.sortChange, this.activeOnly$)
      .subscribe(() => {
        this.paginator.pageIndex = 0
      })

    merge(this.sort.sortChange, this.sort.sortChange, this.activeOnly$)
      .subscribe(() => {
        this.selection.clear()
      })
    
    merge(this.paginator.page, this.sort.sortChange, this.activeOnly$)
      .pipe(
        switchMap(() => {
          this.isLoading = true;
          this.selection.clear()
          return this.inventoryListService
            .getData(
              this.paginator.pageIndex + 1,
              this.paginator.pageSize,
              this.activeOnly,
              this.sort.active
                ? `${this.sort.active}_${this.sort.direction ? this.sort.direction : 'asc'}`
                : ''
            )
        })
      )
      .subscribe(
        (data) => {
          this.inventoryItems = data[0];
          this.itemsCount = data[1];
          this.isLoading = false;
        },
        (error) => {
          console.log('Table could not be filled with data', error);
          this.isLoading = false;
        }
      );

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
        this.inventoryListService.updateData(item).subscribe();
      }
    })
  }

  deleteSelectedItems() {
    let updatedData = this.inventoryItems;
    this.selection.selected.forEach(selectionItem => {
      updatedData = updatedData.filter((inventoryItem) => inventoryItem.id.toString() != selectionItem.id)
    });
    updatedData.forEach(item => {
      item.active = false;
      this.inventoryListService.updateData(item).subscribe();
    });
    // TODO: update mongoDB via service, this edits the table only
  }

  toggleActive() {
    this.paginator.pageIndex = 0
    this.activeOnly = !this.activeOnly
  }

}
