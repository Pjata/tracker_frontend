import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { NavLink } from "react-router-dom";
import firebase from "../../common/firebase/firebase";

const isAuthenticated = () => firebase.auth().currentUser;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const logout = () => firebase.auth().signOut();

export default function TopMenu() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position={"static"}>
        <Toolbar>
          <div className={classes.title}>
            <NavLink to="/app/teams">
              <Link color={"textPrimary"} href={"/app/teams"}>
                <Typography variant="h6" className={classes.title}>
                  Teams
                </Typography>
              </Link>
            </NavLink>
          </div>
          <Link color={"textPrimary"} onClick={logout}>
            <Typography variant="h6" className={classes.title}>
              Logout
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
