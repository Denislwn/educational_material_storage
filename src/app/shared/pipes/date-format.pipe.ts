import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  monthStringFormat(numberMonth: number) {
    const months = ['янв', 'фев', 'мрт', 'апр', 'мая', 'июн',
      'июл', 'авг', 'сен', 'окт', 'нбр', 'дек'];
    return months[numberMonth];
  }

  transform(date: string): string {
    let dateStr: string;
    const newDate = new Date(date);
    dateStr = newDate.getDate() + ' ' + this.monthStringFormat(newDate.getMonth()) +
      '. ' + newDate.getFullYear();
    return dateStr;
  }
}
