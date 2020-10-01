import React from "react";
import { Weather } from "./Weather";
import './Modal.css';

export function Modal({ historyWeather, index, modal }) {
  return (
    <div className="modalOverlay">
      <div className="modalWindow">
        <Weather currentWeather={historyWeather[index]} />
        <button onClick={() => modal("", false)}>cancel</button>
      </div>
    </div>
  );
}
