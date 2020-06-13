import React, { useEffect, useState } from "react";
import Navbar from "..//Navbar";
import PrivateRoute from "../PrivateRoute";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import TopMenu from "../TopMenu/TopMenu";
import Teams from "../Teams/TeamsContainer";
import Team from "../Team/TeamContainer";
import Match from "../Match/MatchContainer";
import firebase from "../../common/firebase/firebase";

export default function Main() {
  const [isUserLoading, setUserLoading] = useState(true);
  let history = useHistory();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      setUserLoading(false);
      if (!user) {
        history.push("/login");
      }
    });
  }, [history]);

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

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
