import React from "react";
import "./Weather.css";

export function Weather({ currentWeather }) {
  return (
    <>
      <div className="weather">
        <p>{currentWeather.date}</p>
        <p>
          {currentWeather.name}, {currentWeather.sys.country}
        </p>
        <p>Coordinates: </p>
        <p>Latitude - {currentWeather.coord.lat}</p>
        <p>Longitude - {currentWeather.coord.lon}</p>
        <img
          src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
          alt=""
        />
        <p>
          {currentWeather.main.temp}°C, feels like{" "}
          {currentWeather.main.feels_like}°C
        </p>
        <p>
          {currentWeather.weather[0].main},{" "}
          {currentWeather.weather[0].description}
        </p>
        <div>
          <p>Wind: {currentWeather.wind.speed}m/s</p>
          <p>Pressure: {currentWeather.main.pressure}hPa</p>
          <p>Humidity: {currentWeather.main.humidity}%</p>
          <p>Visibility: {currentWeather.visibility / 1000}km</p>
        </div>
      </div>
    </>
  );
}
