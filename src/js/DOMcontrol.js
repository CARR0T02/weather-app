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
  document.querySelector('[data-today = "country"').textContent =
    weatherToday.country;
  document.querySelector('[data-today = "weather-text"]').textContent =
    weatherToday.condition.text;
  document.querySelector('[data-today = "weather-icon"]').src =
    weatherToday.condition.icon;
  document.querySelector('[data-today = "date"]').textContent =
    weatherToday.time;
  document.querySelector('[data-today = "current-temp"]').textContent =
    weatherToday.temperature + temperatureUnit;
  document.querySelector('[data-today = "max-temp"]').textContent =
    weatherToday.maxTemperature + temperatureUnit;
  document.querySelector('[data-today = "min-temp"]').textContent =
    weatherToday.minTemperature + temperatureUnit;
  document.querySelector('[data-today = "heat-index"]').textContent =
    weatherToday.heatIndex + temperatureUnit;
  document.querySelector(
    '[data-today = "humidity"]'
  ).textContent = `${weatherToday.humidity}%`;
  document.querySelector(
    '[data-today = "precipitation"]'
  ).textContent = `${weatherToday.precip}mm`;
  document.querySelector(
    '[data-today = "rain-chance"]'
  ).textContent = `${weatherToday.rainChance}%`;
  document.querySelector('[data-today = "sunrise"]').textContent =
    weatherToday.sunrise;
  document.querySelector('[data-today = "sunset"]').textContent =
    weatherToday.sunset;
  updateMoonPhase(
    weatherToday.moon_phase,
    document.querySelector('#moon-phase-container')
  );
  if (!weatherToday.alerts) {
    updateAlerts(
      weatherToday.alerts,
      document.querySelector('[data-today = "alerts"]')
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
  minTemp.textContent = weatherForecastDaily.minTemperature + temperatureUnit;
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
