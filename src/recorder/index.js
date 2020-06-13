import React from "react";
import "./index.css";
import LiveRecoder from "./LiveRecorder";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import EditorWithVideo from "./EditorWithVideo";
import EventPlayback from "./EventPlayback";

const RecorderApp = () => {
  let { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/:matchId/:videoId/playback`} component={EventPlayback} />
      <Route exact path={`${path}/:matchId/:videoId`} component={EditorWithVideo} />
      <Route exact path={`${path}/:matchId`} component={LiveRecoder} />
    </Switch>
  );
};
export default RecorderApp;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.register();
