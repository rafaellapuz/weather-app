import { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/curent-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./Key";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true); 

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const unit = isCelsius ? "metric" : "imperial";

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${unit}`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${unit}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  // toggle between Celsius and Fahrenheit
  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="container">
      
      <Search onSearchChange={handleOnSearchChange} />
      <button onClick={toggleUnit} className="toggle-button">
        Switch to {isCelsius ? "Fahrenheit" : "Celsius"}</button>
      {currentWeather && <CurrentWeather data={currentWeather} isCelsius={isCelsius} />}

      {forecast && <Forecast data={forecast} isCelsius={isCelsius} />}
    </div>
  );
}

export default App;
