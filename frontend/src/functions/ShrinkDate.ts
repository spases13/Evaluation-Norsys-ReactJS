export default function ShrinkDate(inputDateTime: string): string {
  const dtObj = new Date(inputDateTime);

  const year = dtObj.getFullYear();
  const month = ('0' + (dtObj.getMonth() + 1)).slice(-2); 
  const day = ('0' + dtObj.getDate()).slice(-2);
  const hour = ('0' + (dtObj.getHours() - 1)).slice(-2);
  const minute = ('0' + dtObj.getMinutes()).slice(-2);

  const convertedDateTime = `${year}-${month}-${day}T${hour}:${minute}`;

  return convertedDateTime;
}