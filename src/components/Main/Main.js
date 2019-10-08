import React from "react";
import Navbar from "..//Navbar";
import PrivateRoute from "../PrivateRoute";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import TopMenu from "../TopMenu/TopMenu";
import Teams from "../Teams/TeamsContainer"
import Team from "../Team/TeamContainer"
import Match from "../Match/MatchContainer"

export default function Main() {
  return (
    <div>
      <TopMenu />
      <Switch>
          <Redirect exact from="/" to="/app/teams" />
          <Route exact path={"/app/teams"} component={Teams} />
          <Route exact path={"/app/team/:id"} component={Team} />
          <Route exact path={"/app/match/:id"} component={Match} />
      </Switch>
    </div>
  );
}
