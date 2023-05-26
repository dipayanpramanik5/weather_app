import moment from "moment";

const API_KEY = "7a87a07015165906085dcf5477d6d762";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Call openweathermap api with endpont to get weather data.
const getWeatherData = (infoType, searchParams, units) => {
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    try {
        return fetch(url)
            .then((res) => res.json());
    }
    catch (error) {
        console.log('Error handled in catch block')
    }
}


// Get formatted current weather details.
const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data

    const { main: details, icon } = weather[0];
    const time = moment.unix(dt).format('hh:mm A');
    const date = moment.unix(dt).format("dddd, MMMM Do YYYY");
    const sunriseTime = moment.unix(sunrise).format("hh:mm A");
    const sunsetTime = moment.unix(sunset).format("hh:mm A");

    return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, time, date, country, sunriseTime, sunsetTime, details, icon, speed };
}

// Get formatted forecasted weather details.
const formatForecastWeather = (data) => {
    let { list } = data;
    let currentDay = moment().format('dddd');
    let itemCount = 0;
    let daily = list.map((day) => {
        let hour = moment.unix(day.dt).format('hh A');
        let dayWeek = moment.unix(day.dt).format('dddd');
        // Will fetch forecast data for future days of 11AM only.
        if (hour == '11 AM' && currentDay != dayWeek) {
            itemCount += 1;
            return {
                key: itemCount,
                title: moment.unix(day.dt).format('dddd'),
                temp: day.main.temp,
                hour: hour,
            }
        }

    });

    return { daily };
}


// Get formated weather data of current weather and forecasted weather in 5day 3hours format.
const getFormattedWeatherData = async (searchParams) => {
    // Get the current weather.
    const currentWeatherInfo = await getWeatherData('weather', searchParams);
    if (!currentWeatherInfo.message) {
        const formattedCurrentWeather = await formatCurrentWeather(currentWeatherInfo);
        // Get the latitude and longitude of the current weather.
        const { lat, lon } = formattedCurrentWeather;
        // Get the forecaseted weather for the next 5 days along with current day in for 3 hour forecast.
        const formattedForecastWeather = await getWeatherData("forecast", {
            lat,
            lon,
            units: searchParams.units,
        }).then(formatForecastWeather);


        let filteredFormattedForecastWeather = {
            'daily': formattedForecastWeather.daily.filter((forecastdata) => {
                return forecastdata !== undefined;
            })
        };
        return { ...formattedCurrentWeather, ...filteredFormattedForecastWeather };
    }
    else {
        return null;
    }
}

export default getFormattedWeatherData;
