import { convertToDay, convertDate } from './utils.js';

const keyWeather_API = 'a76384fc6b0e40dc9eb230847232404';
const keyIP_API = '747c7134266a415caf9ab17c6830e94a';

async function fetchJSON(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Fetches weather data based on search input
export async function fetchData(input) {
  try {
    let URL = `https://api.weatherapi.com/v1/forecast.json?key=${keyWeather_API}&q=${input}&days=8&alerts=yes`;
    const weatherData = await fetchJSON(URL, { mode: 'cors' });
    return weatherData;
  } catch (err) {
    console.log(err);
  }
}

// Fetches weather data based on current location
export async function fetchCurrentData() {
  try {
    let URL = `https://ipgeolocation.abstractapi.com/v1/?api_key=${keyIP_API}`;
    const IPData = await fetchJSON(URL);
    const weatherData = await fetchData(IPData.ip_address);
    return weatherData;
  } catch (err) {
    console.log(err);
  }
}

// Get necessary data for today
export function getToday(weatherData, temperatureUnit) {
  let temperature,
    maxTemperature,
    minTemperature,
    heatIndex,
    precip,
    humidity,
    time,
    condition,
    rainChance,
    sunrise,
    sunset,
    moon_phase,
    alerts,
    city;
  if (temperatureUnit === '°C') {
    heatIndex = weatherData.current.feelslike_c;
    temperature = weatherData.current.temp_c;
    maxTemperature = weatherData.forecast.forecastday[0].day.maxtemp_c;
    minTemperature = weatherData.forecast.forecastday[0].day.mintemp_c;
  } else if (temperatureUnit === '°F') {
    heatIndex = weatherData.current.feelslike_f;
    temperature = weatherData.current.temp_f;
    maxTemperature = weatherData.forecast.forecastday[0].day.maxtemp_f;
    minTemperature = weatherData.forecast.forecastday[0].day.mintemp_f;
  } else {
    throw new Error('Invalid Temperature unit');
  }
  precip = weatherData.current.precip_mm;
  humidity = weatherData.current.humidity;
  time = convertDate(weatherData.location.localtime);
  condition = weatherData.current.condition;
  rainChance = weatherData.forecast.forecastday[0].day.daily_chance_of_rain;
  sunrise = weatherData.forecast.forecastday[0].astro.sunrise;
  sunset = weatherData.forecast.forecastday[0].astro.sunset;
  moon_phase = weatherData.forecast.forecastday[0].astro.moon_phase;
  alerts = weatherData.alerts;
  city = weatherData.location.name;
  return {
    temperature,
    maxTemperature,
    minTemperature,
    heatIndex,
    precip,
    humidity,
    time,
    condition,
    rainChance,
    sunrise,
    sunset,
    moon_phase,
    alerts,
    city,
  };
}

// Get necessary forecasted data for the week
export function getWeekly(weatherData, temperatureUnit) {
  let date, dayOfWeek, maxTemperature, minTemperature, condition;
  let forecastDailyArr = [];
  for (let i = 1; i < 8; i++) {
    const day = weatherData.forecast.forecastday[i];
    date = day.date;
    dayOfWeek = convertToDay(date);
    condition = day.day.condition;
    if (temperatureUnit === '°C') {
      maxTemperature = day.day.maxtemp_c;
      minTemperature = day.day.mintemp_c;
    } else if (temperatureUnit === '°F') {
      maxTemperature = day.day.maxtemp_f;
      minTemperature = day.day.mintemp_f;
    } else {
      throw new Error('Invalid temperature unit');
    }
    let forecastDay = {
      date,
      dayOfWeek,
      maxTemperature,
      minTemperature,
      condition,
    };
    forecastDailyArr.push(forecastDay);
  }
  return forecastDailyArr;
}

// Get necessary forecasted data for the next 24hrs
export function getHourly(weatherData, temperatureUnit) {}
