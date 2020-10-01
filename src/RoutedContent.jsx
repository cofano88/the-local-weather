import React from "react";
import { Switch, Route } from "react-router-dom";
import { Weather } from "./Weather";
import { History } from "./History";

export function RoutedContent({ currentWeather, historyWeather, modal }) {
  return (
    <Switch>
      <div>
        <Route
          exact
          path="/"
          render={() => <Weather currentWeather={currentWeather} />}
        />
        <Route
          path="/weather"
          render={() => <Weather currentWeather={currentWeather} />}
        />
        <Route
          path="/history"
          render={() => (
            <History
              historyWeather={historyWeather}
              modal={(index, status) => modal(index, status)}
            />
          )}
        />
      </div>
    </Switch>
  );
}
