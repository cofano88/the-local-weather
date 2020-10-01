import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export function Header() {
  return (
    <div className="header">
      <div className="logo">The local weather</div>

      <ul className="navi">
        <li>
          <Link to="/weather">
            <button>weather</button>
          </Link>
        </li>
        <li>
          <Link to="/history">
            <button>history</button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
