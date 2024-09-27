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
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare only dates
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    let formattedTime = istDate.toLocaleString('en-IN', options).replace(',', '');

    if (istDate >= today && istDate < tomorrow) {
      return `Today, ${formattedTime}`;
    } else if (istDate >= tomorrow && istDate < new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)) {
      return `Tomorrow, ${formattedTime}`;
    }

    // If neither today nor tomorrow, return the full date
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    const formattedDate = istDate.toLocaleDateString('en-IN', dateOptions);
    return `${formattedDate}, ${formattedTime}`;
  }
}
