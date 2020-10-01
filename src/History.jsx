import React from "react";
import "./History.css";

export function History({ historyWeather, modal }) {
  return (
    <div className="history">
      <table>
        <tr>
          <th>Date</th>
          <th>Location</th>
          <th>Coordinates</th>
        </tr>
        {historyWeather.map((weatherItem, index) => (
          <tr className="string" onClick={() => modal(index, true)}>
            <td>{weatherItem.date}</td>
            <td>
              {weatherItem.name}, {weatherItem.sys.country}
            </td>
            <td>
              Latitude - {weatherItem.coord.lat}, Longitude -{" "}
              {weatherItem.coord.lon}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
