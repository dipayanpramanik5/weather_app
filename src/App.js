import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemparatureAndDetails from './components/TemparatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './components/WeatherService';
import StatusMessage from './components/StatusMessage';
import { useEffect, useState } from 'react';

function App() {

  // Set state for search query, units, weather information and invalid city message.
  const [query, setQuery] = useState({ q: 'Kolkata' })
  const [units, setunits] = useState('metric')
  const [weather, setWeather] = useState(null)
  const [message, setMessage] = useState(null)

  // UseEffect function is used to call to get the external api and rerender component on  change of query and units value.
  useEffect(() => {
    const fetchWeather = async () => {
      let weatherInfo = await getFormattedWeatherData({ ...query, units });
      if (weatherInfo) {
        setWeather(weatherInfo);
        setMessage(null);
      }
      else {
        setMessage(`Invalid city name entered, so we are showing weatherinfo of your previous searched city ${weather.name}, ${weather.country}`);
      }
    };

    fetchWeather();
  }, [query, units]);

  // Change the API query paramter  when user add/update search input or fetch current location weather.
  const inputChangeHandler = (searchInput) => {
    setQuery(searchInput);
  }

  // Change the  API Units when change the units fromcelcius to farenhite or viseversa.
  const unitChangeHandler = (unit) => {
    setunits(unit);
  }

  let weatherUnit = 'C';
  let windSpeedUnit = 'm/s';

  if (units == 'imperial') {
    weatherUnit = 'F';
    windSpeedUnit = 'mph';
  }

  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-grey-400">
      <StatusMessage messageData={message} />
      <Inputs onInputChange={inputChangeHandler} onChangeUnit={unitChangeHandler} />
      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemparatureAndDetails weather={weather} weatherUnit={weatherUnit} windSpeedUnit={windSpeedUnit} />
          <Forecast title={"Daily Forecast"} items={weather.daily} weatherUnit={weatherUnit} />
        </div>
      )}
    </div>
  );
}

export default App;
