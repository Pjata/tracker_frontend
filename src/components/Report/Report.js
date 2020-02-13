import React, { useState } from "react";
import useReport from "./useReportHook";
import EventBasic from "./EventBasic";
import FaceoffMap from "./FaceoffMap";
import ShotsMap from "./ShotsMap";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import EventsBasedOnType from "./EventsBasedOnType";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  if (value !== index) {
    return null;
  }

  return <div>{children}</div>;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    gridGap: theme.spacing(2),
    gridTemplateColumns: "1fr 1fr 1fr",
    marginTop: theme.spacing(10)
  }
}));

const Report = props => {
  const {
    match: {
      params: { matchId }
    }
  } = props;
  const [tab, changeTab] = useState(0);
  const { loading, error, data } = useReport(matchId);
  const classes = useStyles();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  const { events } = data;
  return (
    <div>
      <AppBar>
        <Tabs value={tab} onChange={(_, v) => changeTab(v)}>
          <Tab label="Shots" />
          <Tab label="Faceoffs"/>
        </Tabs>
      </AppBar>
      <div className={classes.root}>
        <TabPanel index={0} value={tab}>
          <EventBasic events={events} type="SHOOT" label="Shots" />
          <EventsBasedOnType
            events={events}
            type="SHOOT"
            typePath={["eventData", "shotType"]}
            label="Shot types"
          />
          <ShotsMap events={events} />
        </TabPanel>
        <TabPanel index={1} value={tab}>
          <EventBasic events={events} type="FACEOFF" label="Faceoffs" />
          <FaceoffMap events={events} />
        </TabPanel>
      </div>
    </div>
  );
};

export default Report;
