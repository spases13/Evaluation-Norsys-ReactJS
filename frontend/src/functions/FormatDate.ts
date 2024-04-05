export default function FormatDate(inputDate: string) {
  if(inputDate) { 

    let [datePart, timePart] = inputDate.split('T');
    let [year, month, day] = datePart.split('-');
    let [time,] = timePart.split('.');
    let [hours, minutes,] = time.split(':');
    
    return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes;
  }
  else { 
    return ""
  }
}