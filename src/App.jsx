import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./Header";
import { RoutedContent } from "./RoutedContent";
import { Modal } from "./Modal";
import "./App.css";

export default function App() {
  const [currentWeather, setCurrentWeather] = useState();
  const [historyWeather, setHistoryWeather] = useState();
  const [index, setIndex] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function modal(index, status) {
    setIndex(index);
    setModalIsOpen(status);
  }

  useEffect(() => {
    async function fetchMyAPI() {
      const apiKey = `${process.env.REACT_APP_LOCATION_API_KEY}`;
      const respLocation = await fetch(`http://ip-api.com/json/`);
      const locationObj = await respLocation.json();
      const lat = locationObj.lat;
      const lon = locationObj.lon;

      const respWeather = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      const weatherObj = await respWeather.json();
      var currentdate = new Date();
      var date =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        "  " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes();
      const current = { ...weatherObj, date: date };

      setCurrentWeather(current);
    }

    fetchMyAPI();
  }, []);

  useEffect(() => {
    let reqRead = new XMLHttpRequest();
    const secretKey = `${process.env.REACT_APP_WEATHER_API_KEY}`;
    const binNum = `${process.env.REACT_APP_BINNUM}`;
    reqRead.onreadystatechange = () => {
      if (reqRead.readyState === XMLHttpRequest.DONE) {
        let resp = JSON.parse(reqRead.responseText);
        if (
          historyWeather &&
          historyWeather[historyWeather.length - 1].date ===
            resp[resp.length - 1].date &&
          historyWeather[historyWeather.length - 1].id ===
            resp[resp.length - 1].id
        ) {
          return;
        } else {
          setHistoryWeather(resp);
        }
      }
    };

    reqRead.open("GET", `https://api.jsonbin.io/b/${binNum}/latest`, true);

    reqRead.setRequestHeader("secret-key", `${secretKey}`);
    reqRead.send();
  }, [historyWeather]);

  useEffect(() => {
    setTimeout(() => {
      let reqUpd = new XMLHttpRequest();
      const secretKey = `${process.env.REACT_APP_WEATHER_API_KEY}`;
      const binNum = `${process.env.REACT_APP_BINNUM}`;
      reqUpd.onreadystatechange = () => {
        if (reqUpd.readyState === XMLHttpRequest.DONE) {
          console.log(reqUpd.responseText);
        }
      };

      reqUpd.open("PUT", `https://api.jsonbin.io/b/${binNum}`, true);
      reqUpd.setRequestHeader("Content-Type", "application/json");
      reqUpd.setRequestHeader("secret-key", `${secretKey}`);
      reqUpd.setRequestHeader("versioning", "false");

      if (
        !historyWeather ||
        !currentWeather ||
        historyWeather[historyWeather.length - 1].date === currentWeather.date
      ) {
        return;
      } else {
        let history = historyWeather;
        history.push(currentWeather);
        let json = JSON.stringify(history);
        reqUpd.send(json);
      }
    }, []);
  }, [historyWeather, currentWeather]);

  return (
    <>
      <BrowserRouter>
        <div className="appWrap">
          <div className="headerWrap">
            <Header />
          </div>
          <div className="contentWrap">
            {currentWeather && historyWeather && (
              <RoutedContent
                currentWeather={currentWeather}
                historyWeather={historyWeather}
                modal={(index, status) => modal(index, status)}
              />
            )}
          </div>
          {modalIsOpen && (
            <div className="modalWrap">
              <Modal
                historyWeather={historyWeather}
                index={index}
                modal={(index, status) => modal(index, status)}
              />
            </div>
          )}
        </div>
      </BrowserRouter>
    </>
  );
}
