import { NativeDateAdapter } from '@angular/material';

export class CustomDateAdapter extends NativeDateAdapter {

  format(date: Date, displayFormat: Object): string {
    if (!this.isValid(date)) {
      throw Error('NativeDateAdapter: Cannot format invalid date.');
    }

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return this._to2digit(day) + '.' + this._to2digit(month) + '.' + year;
  }

  parse(value: any): Date | null {
    if (typeof value == 'number') {
      return new Date(value);
    }

    if ((typeof value === 'string') && (value.indexOf('.') > -1)) {
      const str = value.split('.');

      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const day = Number(str[0]);

      return new Date(year, month, day);
    }

    return value ? new Date(Date.parse(value)) : null;
  }

  private _to2digit(n: number) {
   return ('00' + n).slice(-2);
  }
}