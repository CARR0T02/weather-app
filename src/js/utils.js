import { getDay, format } from 'date-fns';
import { getWeather } from './script.js';

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
  console.log(date);
  let formattedDate = format(new Date(date), "eeee',' d MMM ''yy");
  return formattedDate;
}

export function handleSearch() {
  const search = document.querySelector('#search');
  let location = search.value;
  getWeather(location);
  search.value = '';
}

export function getMoonPhaseSVG(moonPhase, iconPath) {
  switch (moonPhase) {
    case 'New Moon':
      iconPath.setAttribute(
        'd',
        'M12 20A8 8 0 1 1 20 12A8 8 0 0 1 12 20M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Z'
      );
      break;

    case 'Waxing Crescent':
      iconPath.setAttribute(
        'd',
        'M12 2A9.91 9.91 0 0 0 9 2.46A10 10 0 0 1 9 21.54A10 10 0 1 0 12 2Z'
      );
      break;

    case 'First Quarter':
      iconPath.setAttribute('d', 'M12 2V22A10 10 0 0 0 12 2Z');
      break;
    case 'Waxing Gibbous':
      iconPath.setAttribute(
        'd',
        'M6 12C6 7.5 7.93 3.26 12 2A10 10 0 0 1 12 22C7.93 20.74 6 16.5 6 12Z'
      );
      break;
    case 'Full Moon':
      iconPath.setAttribute('d', 'M12 2A10 10 0 1 1 2 12A10 10 0 0 1 12 2Z');
      break;
    case 'Waning Gibbous':
      iconPath.setAttribute(
        'd',
        'M18 12C18 7.5 16.08 3.26 12 2A10 10 0 0 0 12 22C16.08 20.74 18 16.5 18 12Z'
      );
      break;
    case 'Last Quarter':
      iconPath.setAttribute('d', 'M12 2A10 10 0 0 0 12 22Z');
      break;
    case 'Waning Crescent':
      iconPath.setAttribute(
        'd',
        'M2 12A10 10 0 0 0 15 21.54A10 10 0 0 1 15 2.46A10 10 0 0 0 2 12Z'
      );
      break;
  }
}
