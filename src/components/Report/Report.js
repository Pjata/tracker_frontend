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
import { getShotOnGoalEvents, filterEvents } from "./useEventFiltering";
import produce from "immer";
import ShotPositions from "./ShotPositions";
import PeriodFilter from "./Filters/PeriodFilter";
import FaceoffBasic from "./FaceoffBasic";

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
  },
  shotMaps: {
    display: "grid",
    gridGap: theme.spacing(2),
    gridTemplateColumns: "1fr 1fr"
  },
  periodShots: {
    marginTop: theme.spacing(10)
  }
}));

const Report = props => {
  const {
    match: {
      params: { matchId }
    }
  } = props;
  const [tab, changeTab] = useState(1);
  const [filters, setFilters] = useState({});
  const { loading, error, data } = useReport(matchId);
  const classes = useStyles();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  const { events } = data;

  const shotOnGoalEvents = getShotOnGoalEvents(filterEvents(events)(filters));

  const onChange = key => value => {
    setFilters(
      produce(filters, draft => {
        draft[key] = value;
      })
    );
  };
  return (
    <div>
      <AppBar>
        <Tabs value={tab} onChange={(_, v) => changeTab(v)}>
          <Tab label="Shots" />
          <Tab label="Faceoffs" />
        </Tabs>
      </AppBar>
      <div className={classes.root}>
        <TabPanel index={0} value={tab}>
          <EventBasic events={shotOnGoalEvents} type="SHOOT" label="Shots" />
          <div className={classes.periodShots}>
            <PeriodFilter
              selectedPeriods={filters.selectedPeriods}
              onChange={onChange("selectedPeriods")}
            />
            <EventsBasedOnType
              events={shotOnGoalEvents}
              type="SHOOT"
              typePath={["eventData", "shotType"]}
              label="Shot types"
            />
            <div className={classes.shotMaps}>
              <ShotPositions events={shotOnGoalEvents} />
              <ShotsMap events={shotOnGoalEvents} />
            </div>
          </div>
        </TabPanel>
        <TabPanel index={1} value={tab}>
          <FaceoffBasic events={events} type="FACEOFF" label="Faceoffs" />
          <FaceoffMap events={events} />
        </TabPanel>
      </div>
    </div>
  );
};

export default Report;
