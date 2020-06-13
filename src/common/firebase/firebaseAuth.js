import firebase from "./firebase";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      backgroundColor: theme.palette.primary.main,
    },
    paper: {
      width: "300px",
      backgroundColor: theme.palette.accent.dark,
      height: "200px",
    },
    logoRoot: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      width: "250px",
    },
  };
});

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/app/teams",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

export const SignInScreen = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <div className={classes.logoRoot}>
          <img
            className={classes.logo}
            src="dia-logo-title.png"
            alt={"Diabolus"}
          />
        </div>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </Paper>
    </div>
  );
};
