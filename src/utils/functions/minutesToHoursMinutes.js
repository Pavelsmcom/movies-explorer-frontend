export default function minutesToHoursMinutes(minutes) {
  minutes = Number(minutes);

  return Math.floor(minutes / 60) + 'ч ' + (minutes % 60) + 'м';
}
