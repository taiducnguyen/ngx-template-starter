import { Injectable } from '@angular/core';
// import { SnackBarComponent, MaterialConfirmDialogComponent } from '@app/shared/controls';
// import { MatSnackBar, MatDialog } from '@angular/material';
import { Configs } from '@app/shared/common/configs/configs';
import { SnackbarData, DialogData, MessageType } from '@app/shared/models/materiral/materiral.model';

export interface IDialogInterface {
  onOpenInformMessageSnackBar(data: SnackbarData, callBack?: Function): void;
  onOpenConfirmDialog(data: DialogData, callBack?: Function): void;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService implements IDialogInterface {
  // constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {}

  onOpenInformMessageSnackBar = (data: SnackbarData, callBack?: Function) => {
    // let duration = data.type == MessageType.Success ? 5000 : Configs.MatSnackBarDefaultConfig.duration;
    // let config = { ...Configs.MatSnackBarDefaultConfig, duration };
    // const snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {
    //   ...config,
    //   data: data
    // });
    // if (callBack) {
    //   snackBarRef.afterDismissed().subscribe(res => {
    //     callBack(res.dismissedByAction);
    //   });
    // }
  };

  onOpenConfirmDialog = (data: DialogData, callBack?: Function) => {
    // const dialogRef = this.dialog.open(MaterialConfirmDialogComponent, {
    //   data: data
    // });
    // if (callBack) {
    //   dialogRef.afterClosed().subscribe(confirm => {
    //     callBack(confirm);
    //   });
    // }
  };
}
