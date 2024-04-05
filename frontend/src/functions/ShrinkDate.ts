export default function ShrinkDate(inputDateTime: string): string {
  if (inputDateTime) {
    const dtObj = new Date(inputDateTime);

    const year = dtObj.getFullYear();
    const month = ('0' + (dtObj.getMonth() + 1)).slice(-2);
    const day = ('0' + dtObj.getDate()).slice(-2);
    const hour = ('0' + (dtObj.getHours() - 1)).slice(-2); // Adjusting the hour by subtracting 1
    const minute = ('0' + dtObj.getMinutes()).slice(-2);
    const timezoneOffset = dtObj.getTimezoneOffset(); // Get the timezone offset in minutes

    // Convert timezone offset to ±HH:MM format
    const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffset / 60));
    const timezoneOffsetMinutes = Math.abs(timezoneOffset % 60);
    const timezoneOffsetFormatted =
      (timezoneOffset >= 0 ? '-' : '+') +
      ('0' + timezoneOffsetHours).slice(-2) +
      ':' +
      ('0' + timezoneOffsetMinutes).slice(-2);

    const convertedDateTime = `${year}-${month}-${day}T${hour}:${minute}${timezoneOffsetFormatted}`;

    return convertedDateTime;
  } else {
    return '';
  }
}