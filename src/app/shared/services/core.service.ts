import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configs } from '../common/configs/configs';
import { MonthRange } from '../models/common.model';

export interface CoreInterface {
  range(start: number, end: number): Array<number>;
  convertMinuteToTime(minutes: number): string;
  compareTimeGreaterThanCurrent(hrsmins: string): boolean;
  timeInRange(start: string, end: string): boolean;
  cloneArrayOrObject(arrOrObj: Array<any> | Object): Array<any> | Object;
  validateFile(file: File, acceptFileExtensions: Array<string>, maximumSize: number): string;
}

@Injectable()
export class CoreService implements CoreInterface {
  constructor(private http: HttpClient) {}

  range(start: number, end: number) {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  }

  _range(start: number, stop: number, step: number = null) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    if (!step) {
      step = stop < start ? -1 : 1;
    }

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  }

  convertMinuteToTime(minutes: number) {
    let m = minutes % 60;
    let h = (minutes - m) / 60;

    let Hrsmins = h.toString() + ':' + (m < 10 ? '0' : '') + m.toString(); // + (h > 12 ? " PM" : " AM");
    return Hrsmins;
  }

  compareTimeGreaterThanCurrent(hrsmins: string): boolean {
    if (!hrsmins) {
      return false;
    }
    let times = hrsmins.split(':');
    let h = parseInt(times[0]);
    let m = parseInt(times[1]);

    let currentDate = new Date();
    let currentH = currentDate.getHours();
    let currentM = currentDate.getMinutes();
    if (h == currentH) {
      return h > currentH && m > currentM;
    } else {
      return h > currentH;
    }
  }

  timeInRange(start: string, end: string): boolean {
    if (!start || !end) {
      return false;
    }
    let currentTime = new Date();

    let cH = currentTime.getHours();
    let cM = currentTime.getMinutes();

    let sTimes = start.split(':');
    let sH = parseFloat(sTimes[0]);
    let sM = parseFloat(sTimes[1]);

    let eTimes = end && end.split(':');
    let eH = parseFloat(eTimes[0]);
    let eM = parseFloat(eTimes[1]);

    return cH >= sH && cH <= eH;
  }

  getYearRange = (startYear: number): number[] => {
    let currentYear = new Date().getFullYear();
    if (startYear >= currentYear) {
      return [currentYear];
    }
    return this.range(startYear, currentYear);
  };

  getShortMonth = (): Array<MonthRange> => {
    return Configs.shortMonths.map((m, i) => {
      return <MonthRange>{ label: m, value: i + 1 };
    });
  };

  base64ToArrayBuffer = (base64: string) => {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  };

  cloneArrayOrObject(arrOrObj: Array<any> | Object): Array<any> | Object {
    return JSON.parse(JSON.stringify(arrOrObj));
  }

  validateFile(file: File, acceptFileExtensions: string[], maximumSize: number): string {
    if (!file) {
      return 'File is empty.';
    }

    if (file.size > maximumSize * 1024 * 1024) {
      return `File size should not exceed ${maximumSize} MB.`;
    }

    if (file.name !== null && file.name !== '' && file.name !== undefined) {
      let fileExt = file.name.replace(/^.*\./, '');

      if (acceptFileExtensions && acceptFileExtensions.length > 0 && !acceptFileExtensions.some(x => x == fileExt)) {
        return `File should be ${acceptFileExtensions.toString()}`;
      }
    }

    return '';
  }

  hasOwnProperty(obj: any, prop: any) {
    var proto = obj.__proto__ || obj.constructor.prototype;
    return prop in obj && (!(prop in proto) || proto[prop] !== obj[prop]);
  }
}
