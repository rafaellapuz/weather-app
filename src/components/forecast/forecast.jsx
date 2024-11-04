import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = [
  'Monday', 
  'Tuesday', 
  'Wednesday', 
  'Thursday', 
  'Friday', 
  'Saturday', 
  'Sunday'
];

const Forecast = ({ data, isCelsius }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

  // function to format the date as "MM/DD"
  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };

  return (
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => {
          const forecastDate = new Date(); 
          forecastDate.setDate(forecastDate.getDate() + 1 + idx);  //forcast date +1 from current date

          const maxTemp = isCelsius // max and min tempo conversion
            ? `${Math.round(item.main.temp_max)}°C`
            : `${Math.round(item.main.temp_max * 9/5 + 32)}°F`;
          const minTemp = isCelsius
            ? `${Math.round(item.main.temp_min)}°C`
            : `${Math.round(item.main.temp_min * 9/5 + 32)}°F`;

          return (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item">
                    <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                    <label className="day">{forecastDays[idx]} ({formatDate(forecastDate)})</label>
                    <label className="description">{item.weather[0].description}</label>
                    <label className="min-max">{maxTemp} / {minTemp}</label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                  <div className="daily-details-grid-item">
                    <label>Pressure:</label>
                    <label>{item.main.pressure} hPa</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Humidity:</label>
                    <label>{item.main.humidity}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Clouds:</label>
                    <label>{item.clouds.all}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Wind speed:</label>
                    <label>{item.wind.speed} m/s</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Sea level:</label>
                    <label>{item.main.sea_level} m</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Feels like:</label>
                    <label>{isCelsius
                      ? `${Math.round(item.main.feels_like)}°C`
                      : `${Math.round(item.main.feels_like * 9/5 + 32)}°F`}</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default Forecast;
