import React from "react"
import logo from "./logo.svg"
import "./App.css"
import Navbar from "./components/Navbar"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"
import { Auth0Provider } from "./react-auth0-wrapper"
import config from "./auth_config.json"
import Profile from "./components/Profile"
import PrivateRoute from "./components/PrivateRoute"
import Teams from "./components/Teams/TeamsContainer"
import Team from "./components/Team/TeamContainer"
import Match from "./components/Match/MatchContainer"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import TopMenu from "./components/TopMenu/TopMenu"

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
}
function App() {
  return (
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <BrowserRouter>
        <div>
          <TopMenu />
          <Switch>
            <Route exact path={"/"} component={Navbar} />
            <Route exact path={"/app/teams"} component={Teams} />
            <Route exact path={"/app/team/:id"} component={Team} />
            <Route exact path={"/app/match/:id"} component={Match} />
            <PrivateRoute path={"/profile"} component={Profile} />
            <Route path={"/login"} component={Navbar} />
          </Switch>
        </div>
      </BrowserRouter>
    </Auth0Provider>
  )
}

export default App

/*

 */
