import { max } from 'date-fns';

export function loadWeather(weatherToday, weatherWeek, weatherForecastHourly) {
  let index = 1;
  updateWeatherMain(weatherToday, '°C');
  for (const day of weatherWeek) {
    updateForecastDaily(day, index, '°C');
    index += 1;
  }
}

function updateWeatherMain(weatherToday, temperatureUnit) {
  const main = document.querySelector('#today-main');
  const additional = document.querySelector('#today-additional');
  main.querySelector('[data-today = "weather-text"]').textContent =
    weatherToday.condition.text;
  main.querySelector('[data-today = "weather-icon"]').src =
    weatherToday.condition.icon;
  main.querySelector('[data-today = "date"]').textContent = weatherToday.time;
  main.querySelector('[data-today = "current-temp"]').textContent =
    weatherToday.temperature + temperatureUnit;
  main.querySelector('[data-today = "max-temp"]').textContent =
    weatherToday.maxTemperature + temperatureUnit;
  main.querySelector('[data-today = "min-temp"]').textContent =
    weatherToday.minTemperature + temperatureUnit;
  additional.querySelector('[data-today = "heat-index"]').textContent =
    weatherToday.heatIndex + temperatureUnit;
  additional.querySelector(
    '[data-today = "humidity"]'
  ).textContent = `${weatherToday.humidity}%`;
  additional.querySelector(
    '[data-today = "precipitation"]'
  ).textContent = `${weatherToday.precip}mm`;
  additional.querySelector(
    '[data-today = "rain-chance"]'
  ).textContent = `${weatherToday.rainChance}%`;
  additional.querySelector('[data-today = "sunrise"]').textContent =
    weatherToday.sunrise;
  additional.querySelector('[data-today = "sunset"]').textContent =
    weatherToday.sunset;
  updateMoonPhase(
    weatherToday.moon_phase,
    additional.querySelector('#moon-phase-container')
  );
  if (!weatherToday.alerts) {
    updateAlerts(
      weatherToday.alerts,
      main.querySelector('[data-today = "alerts"]')
    );
  }
}

// Takes one forecasted day and edits the respective container in forecast container
function updateForecastDaily(weatherForecastDaily, index, temperatureUnit) {
  const container = document.querySelector(`[data-forecast-day = "${index}"]`);
  const dayOfWeek = container.querySelector('.forecast-day');
  dayOfWeek.textContent = weatherForecastDaily.dayOfWeek;
  const maxTemp = container.querySelector('.forecast-max-temp');
  maxTemp.textContent = weatherForecastDaily.maxTemperature + temperatureUnit;
  const minTemp = container.querySelector('.forecast-min-temp');
  minTemp.textContent = weatherForecastDaily.minTemperature;
  const weatherImg = container.querySelector('.forecast-weather');
  weatherImg.src = weatherForecastDaily.condition.icon;
  weatherImg.alt = weatherForecastDaily.condition.text;
}

function updateForecastHourly(weatherForecastHourly) {}

function updateAlerts(alerts, containerAlerts) {
  for (const alert of alerts.alert) {
    const container = document.createElement('div');
    const headline = document.createElement('p');
    const areas = document.createElement('p');
    headline.textContent = alert.headline;
    areas.textContent = areas.headline;
    container.append(headline, areas);
    containerAlerts.append(container);
  }
}

// UPDATE TO PUT IN MOONPHASE SVG
function updateMoonPhase(phase, containerMoonPhase) {
  containerMoonPhase.querySelector('[data-today = "moon-phase"]').textContent =
    phase;
}
