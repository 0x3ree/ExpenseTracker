export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
  // this will return the date in the format of YYYY-MM-DD and the 0-10 will slice the string to get only the date part and make sure it's not above 10 characters long
}
export function getDateMinusdays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
