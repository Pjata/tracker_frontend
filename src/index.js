import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apollo/client";
import { createMuiTheme } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { ThemeProvider } from "@material-ui/styles";
import { deepOrange } from "@material-ui/core/colors";

/*
const getTheme = () => {
  let overwrites = {
    palette: {
      primary1Color: Colors.orange700,
      primary2Color: Colors.orange900,
      accent1Color: Colors.blueGrey400,
      accent2Color: Colors.blueGrey900,
      accent3Color: Colors.deepOrangeA400,
    },
  };
//  return getMuiTheme(baseTheme, overwrites);
};
*/
const theme = createMuiTheme({
  palette: {
    primary: { main: orange[700], dark: orange[900] }, // Purple and green play nicely together.
    accent: {
      main: blueGrey[400],
      dark: blueGrey[900],
      light: deepOrange.A400,
    }, // This is just green.A700 as hex.
  },
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
