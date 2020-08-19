import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-item-deletion',
  templateUrl: './confirm-item-deletion.component.html',
  styleUrls: ['./confirm-item-deletion.component.css']
})
export class ConfirmItemDeletionComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmItemDeletionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}