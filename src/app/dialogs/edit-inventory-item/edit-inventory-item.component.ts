import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-inventory-item',
  templateUrl: './edit-inventory-item.component.html',
  styleUrls: ['./edit-inventory-item.component.css']
})
export class EditInventoryItemComponent {

  constructor(
    public dialogRef: MatDialogRef<EditInventoryItemComponent>,
    @Inject(MAT_DIALOG_DATA) public form: FormGroup) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
