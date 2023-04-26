import { max } from 'date-fns';

export function loadWeather(weatherToday, weatherWeek, weatherForecastHourly) {
  let index = 1;
  for (const day of weatherWeek) {
    updateForecastDaily(day, index);
    index += 1;
  }
}

function updateWeatherMain(weatherToday) {}

// Takes one forecasted day and edits the respective container in forecast container
function updateForecastDaily(weatherForecastDaily, index) {
  const container = document.querySelector(`[data-forecast-day = "${index}"]`);
  const dayOfWeek = container.querySelector('.forecast-day');
  dayOfWeek.textContent = weatherForecastDaily.dayOfWeek;
  const maxTemp = container.querySelector('.forecast-max-temp');
  maxTemp.textContent = weatherForecastDaily.maxTemperature;
  const minTemp = container.querySelector('.forecast-min-temp');
  minTemp.textContent = weatherForecastDaily.minTemperature;
  const weatherImg = container.querySelector('.forecast-weather');
  weatherImg.src = weatherForecastDaily.condition.icon;
  weatherImg.alt = weatherForecastDaily.condition.text;
}

function updateForecastHourly(weatherForecastHourly) {}
