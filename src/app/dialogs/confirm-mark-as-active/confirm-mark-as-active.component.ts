import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-mark-as-active',
  templateUrl: './confirm-mark-as-active.component.html',
  styleUrls: ['./confirm-mark-as-active.component.css']
})
export class ConfirmMarkAsActiveComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmMarkAsActiveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}