// time-utils.ts
export function convertUTCToIST(utcDateString: string): string {
    // Create a date object from the UTC string
    const utcDate = new Date(utcDateString);
  
    // IST is UTC + 5:30 hours
    const offsetInMilliseconds = 5.5 * 60 * 60 * 1000; // 5 hours and 30 minutes
  
    // Calculate IST time
    const istDate = new Date(utcDate.getTime() + offsetInMilliseconds);
  
    // Format IST time as a string (e.g., YYYY-MM-DD HH:MM:SS +05:30)
    const year = istDate.getUTCFullYear();
    const month = String(istDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(istDate.getUTCDate()).padStart(2, '0');
    const hours = String(istDate.getUTCHours()).padStart(2, '0');
    const minutes = String(istDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(istDate.getUTCSeconds()).padStart(2, '0');
  
    // Return formatted date with IST timezone offset
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} +05:30`;
  }
  