export function parseISODateAsLocal(dateString) {
  const date = new Date(dateString);

  const offset = date.getTimezoneOffset(); // minuti
  return new Date(date.getTime() - offset * 60000);
}

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function dateToDayOfWeek(year, month, day){
  const dayOfWeekSunday = new Date(year, month, day).getDay();
  const dayOfWeek = (dayOfWeekSunday + 6) % 7;
  return daysOfWeek[dayOfWeek];
}


