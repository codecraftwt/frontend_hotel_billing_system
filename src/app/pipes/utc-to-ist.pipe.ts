import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcToIst'
})
export class UtcToIstPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const utcDate = new Date(value);
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
    const istDate = new Date(utcDate.getTime());

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    return istDate.toLocaleString('en-IN', options);
  }
}
