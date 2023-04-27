import { getDay, format } from 'date-fns';

export function convertToDay(date) {
  let number = getDay(new Date(date));
  switch (number) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
  }
}

export function convertDate(date) {
  let formattedDate = format(new Date(date), "eeee',' d MMM ''yy");
  return formattedDate;
}

export function handleSearch() {
  const search = document.querySelector('#search');
  let location = search.value;
  getWeather(location);
  search.value = '';
}
