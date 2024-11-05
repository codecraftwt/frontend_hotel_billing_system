import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcToIst'
})
export class UtcToIstPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    // Create a Date object from the provided UTC date string
    const utcDate = new Date(value);

    // IST offset is +5 hours 30 minutes (in milliseconds)
    const istOffset = 5.5 * 60 * 60 * 1000;

    // Adjust the UTC time by adding the IST offset
    const istDate = new Date(utcDate.getTime() - istOffset);

    // Format the time to 12-hour format (with AM/PM)
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // 12-hour clock with AM/PM
    };

    // Get today's date for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare only dates
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    let formattedTime = istDate.toLocaleString('en-IN', options).replace(',', '');

    // If it's today, return "Today"
    if (istDate >= today && istDate < tomorrow) {
      return `Today, ${formattedTime}`;
    }
    
    // If it's tomorrow, return "Tomorrow"
    else if (istDate >= tomorrow && istDate < new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)) {
      return `Tomorrow, ${formattedTime}`;
    }

    // Otherwise, return the full date with time
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    const formattedDate = istDate.toLocaleDateString('en-IN', dateOptions);
    return `${formattedDate}, ${formattedTime}`;
  }
}
