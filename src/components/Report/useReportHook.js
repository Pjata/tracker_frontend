import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Events from "./Events";
import { formatDistanceStrict } from "date-fns";
import {addInfoToEvent} from './useEventFiltering'
import {
  prop,
  path,
  pipe,
  groupBy,
  map,
  curry,
  toPairs,
  head,
  sort
} from "ramda";
import query from "./query";
import { addPeriodForEvent } from "./useEventFiltering";

const TOP_Y = 98;
const CENTER_Y = 176;
const BOTTOM_Y = 253;
const DEF_X = 120;
const NEUTRAL_DEF_X = 230;
const NEUTRAL_ATTACK_X = 411;
const ATTACKING_X = 522;
const CENTER_X = 320;

export const faceOffPositions = {
  DEFENDING_TOP: {
    x: DEF_X,
    y: TOP_Y
  },
  NEUTRAL_DEF_TOP: {
    x: NEUTRAL_DEF_X,
    y: TOP_Y
  },
  NEUTRAL_ATTACK_TOP: {
    x: NEUTRAL_ATTACK_X,
    y: TOP_Y
  },
  ATTACKING_TOP: {
    x: ATTACKING_X,
    y: TOP_Y
  },
  CENTER: {
    x: CENTER_X,
    y: CENTER_Y
  },
  DEFENDING_BOTTOM: {
    x: DEF_X,
    y: BOTTOM_Y
  },
  NEUTRAL_DEF_BOTTOM: {
    x: NEUTRAL_DEF_X,
    y: BOTTOM_Y
  },
  NEUTRAL_ATTACK_BOTTOM: {
    x: NEUTRAL_ATTACK_X,
    y: BOTTOM_Y
  },
  ATTACKING_BOTTOM: {
    x: ATTACKING_X,
    y: BOTTOM_Y
  }
};

export const distance = curry((a, b) =>
  Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
);

const HOME_BLUE_X = 214;
const AWAY_BLUE_X = 426;

const addFaceoffZoneToEvent = faceOffPositions => event => {
  const distanceToEvent = distance(event.position);
  const getFaceOffZone = pipe(
    map(distanceToEvent),
    toPairs,
    sort((a, b) => a[1] - b[1]),
    head,
    prop(0)
  );
  return { ...event, faceOffZone: getFaceOffZone(faceOffPositions) };
};

export const addFaceoffZone = map(addFaceoffZoneToEvent(faceOffPositions));

const addEventZoneType = event => {
  const { position, period } = event;
  const periodSwitchedZone = period === "SECOND";
  if (position.x < 214) {
    return {
      ...event,
      zone: periodSwitchedZone ? "ATTACK" : "DEFEND"
    };
  }
  if (position.x > 426) {
    return {
      ...event,
      zone: periodSwitchedZone ? "DEFEND" : "ATTACK"
    };
  }
  return {
    ...event,
    zone: "NEUTRAL"
  };
};

const getPeriodFirstEventTimes = events => {
  return [];
  const twoBiggestDiffs = events
    .sort((a, b) => a.realTime - b.realTime)
    .reduce(
      (acc, curr) => {
        if (acc.lastEvent) {
          const diff = Math.abs(curr.realTime - acc.lastEvent.realTime);
          const [first, second] = acc.diffs;
          if (diff > first.diff) {
            acc.diffs = [{ diff, time: curr.realTime }, first];
          }
        }
        acc.lastEvent = curr;
        return acc;
      },
      { diffs: [{ diff: 0 }, { diff: 0 }] }
    );
  return twoBiggestDiffs.diffs.map(({ time }) => time).sort();
};

const getEvents = data => {
  if (data) {
    const { match } = data;
    if (match && match.events) {
      return match.events;
    }
  }
  return [];
};
export const partitionEvents = events => {
  const periodTimers = getPeriodFirstEventTimes(events);
  const addEventInfo = map(
    pipe(addPeriodForEvent(periodTimers), addEventZoneType)
  );
  const partitionEvents = pipe(
    addEventInfo,
    groupBy(prop("period")),
    map(groupBy(prop("type"))),
    map(map(groupBy(prop("zone"))))
  );
  return partitionEvents(events);
};
export const useReport = matchId => {
  const { loading, error, data } = useQuery(query, {
    pollInterval: 5000,
    variables: {
      matchId
    }
  });
  const events = getEvents(data);
  const matchVideoInfo = path(["match", "matchVideoInfo"], data);
  const addEventInfo = map(addInfoToEvent(matchVideoInfo));

  console.log(events);
  return {
    loading,
    error,
    data: {
      ...data,
      events: addEventInfo(events)
    }
  };
};
export default useReport;
