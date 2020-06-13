import * as R from "ramda";

const Events = {
  HIT: {
    color: "#B7B7B7",
    name: "Hit",
    type: "HIT",
    eventData: {}
  },
  SHOOT: {
    color: "#2D72b5",
    name: "Shot",
    type: "SHOOT",
    eventData: {}
  },
  SHOT_AGAINST: {
    color: "#2D72b5",
    name: "Shot against",
    type: "SHOT_AGAINST",
    eventData: {}
  },
  SAVE: {
    color: "#986b27",
    name: "Save",
    type: "SAVE",
    eventData: {}
  },
  FACEOFF: {
    color: "#F1b940",
    name: "Faceoff",
    type: "FACEOFF",
    eventData: {}
  },
  PENALTY: {
    color: "#6d20a0",
    name: "Penalty",
    type: "PENALTY",
    eventData: {}
  },
  BLOCK: {
    color: "#FDf150",
    name: "Block",
    type: "BLOCK",
    eventData: {}
  },
  TURNOVER: {
    color: "#f44336",
    name: "Turnover",
    type: "TURNOVER",
    eventData: {},
    unused: true
  },
  GOAL_AGAINST: {
    color: "#ff3e23",
    name: "Goal against",
    type: "GOAL_AGAINST",
    eventData: {},
  },
  GOAL: {
    color: "#43A047",
    name: "Goal",
    type: "GOAL",
    eventData: {},
  }
};

const outcomeColors = {
  SHOT_ON_GOAL: "#2d72b5",
  BLOCKED: "#e99b7f",
  MISSED_THE_GOAL: "#4aa259"
};
const getShotOutcomeColor = outcome => outcomeColors[outcome];
export const getColorForEvent = event => {
  const shotOutcome = R.path(["eventData", "shotOutcome"], event);
  if(shotOutcome) {
    return getShotOutcomeColor(shotOutcome) || event.color
  }
  return event.color
};
export default Events;
