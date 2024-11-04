import React from "react";
import "./current-weather.css";

const CurrentWeather = ({ data, isCelsius }) => {
  const temperature = isCelsius
    ? `${Math.round(data.main.temp)}°C`
    : `${Math.round(data.main.temp * 9/5 + 32)}°F`; // Convert to Fahrenheit if necessary
  const feelsLike = isCelsius
    ? `${Math.round(data.main.feels_like)}°C`
    : `${Math.round(data.main.feels_like * 9/5 + 32)}°F`;
    console.log(data)

  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`} // displays img based on weather data
        />
      </div>
      <div className="bottom">
        <p className="temperature">{temperature}</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">{feelsLike}</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
