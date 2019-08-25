import { MatSnackBarConfig } from '@angular/material';

export module Configs {
  export const StartYear = 2015;
  export const fullMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  export const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  export const PageIndex = 1;
  export const PageSize = 25;
  export const VAT = 10;
  export const FileMaximunSize = 1; // MB
  export const DivideItemNumber = 6;

  export const TokenPrefix = 'supplychain';
  export const FileExtensions = ['docx', 'doc', 'pdf'];
  export const FileExtensionsContainer = ['xls', 'xlsx'];

  export function NewGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  export const MatSnackBarDefaultConfig: MatSnackBarConfig = {
    duration: 15 * 1000,
    verticalPosition: 'top',
    panelClass: 'snack-bar-container',
    horizontalPosition: 'right'
  };
}
