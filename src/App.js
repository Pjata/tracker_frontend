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
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Main from "./components/Main"
import Report from './components/Report'
import { SignInScreen } from "./common/firebase/firebaseAuth"
function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path={"/profile"} component={Profile} />
          <Route path={"/login"} component={SignInScreen} />
          <Route path={"/:matchId/report"} component={Report} />
          <Route path={"/"} component={Main} />
        </Switch>
    </BrowserRouter>
  )
}

export default App

/*

 */
