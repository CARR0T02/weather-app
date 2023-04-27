import '../style.css';
import { handleSearch } from './utils.js';
import { fetchData, fetchCurrentData, getToday, getWeekly } from './data.js';
import { loadWeather } from './DOMcontrol.js';

export async function getWeather(input = null) {
  let weatherData;
  if (input === null) {
    weatherData = await fetchCurrentData();
  } else {
    weatherData = await fetchData(input);
  }
  const weatherToday = getToday(weatherData, '°C');
  const weatherWeek = getWeekly(weatherData, '°C');
  loadWeather(weatherToday, weatherWeek, null);
  console.log(weatherData);
  console.log(weatherToday);
  console.table(weatherWeek);
}

function initialise() {
  window.addEventListener('load', () => {
    document.querySelector('body').style.visibility = 'visible';
  });
  const search = document.querySelector('#search');
  search.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });
  const searchBtn = document.querySelector('#search-icon');
  searchBtn.addEventListener('click', handleSearch);
}

initialise();
getWeather();

function loadWeekly() {}
