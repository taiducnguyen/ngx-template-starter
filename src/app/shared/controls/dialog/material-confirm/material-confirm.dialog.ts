import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogData } from '@app/shared/models/materiral/materiral.model';

@Component({
  selector: 'material-confirm-dialog',
  templateUrl: './material-confirm.dialog.html'
})
export class MaterialConfirmDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MaterialConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  onCloseDialog(isConfirm: boolean): void {
    this.dialogRef.close(isConfirm);
  }
}
