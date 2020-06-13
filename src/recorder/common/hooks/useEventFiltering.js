import useGetMatchVideoInfo from "./useGetMatchVideoInfo";
import { path, compose } from "ramda";

const Left = (value) => ({
  map: (_) => Left(value),
  chain: (_) => Left(value),
  fork: (l, _) => l(value),
  isRight: () => false,
});
const Right = (value) => ({
  map: (fn) => Right(fn(value)),
  chain: (fn) => fn(value),
  fork: (_, r) => r(value),
  isRight: () => true,
});

export const getRealTimeForTime = (matchVideoInfo) => {
  const {
    startRealTimeFirstPeriod,
    startRealTimeSecondPeriod,
    startRealTimeThirdPeriod,
    startTimeFirstPeriod,
    startTimeSecondPeriod,
    startTimeThirdPeriod,
  } = matchVideoInfo;
  const startRealTimes = [
    startRealTimeFirstPeriod,
    startRealTimeSecondPeriod,
    startRealTimeThirdPeriod,
  ];
  const startTimes = [
    startTimeFirstPeriod,
    startTimeSecondPeriod,
    startTimeThirdPeriod,
  ];
  return (time) => {
    if (time < startTimes[1]) {
      return [startTimes[0], startRealTimes[0]];
    }
    if (time < startTimes[2]) {
      return [startTimes[1], startRealTimes[1]];
    }
    return [startTimes[2], startRealTimes[2]];
  };
};

const getPeriodForEvent = (matchVideoInfo) => {
  const {
    startRealTimeFirstPeriod,
    startRealTimeSecondPeriod,
    startRealTimeThirdPeriod,
  } = matchVideoInfo;
  const startRealTimes = [
    startRealTimeFirstPeriod,
    startRealTimeSecondPeriod,
    startRealTimeThirdPeriod,
  ];
  return (event) => {
    const { realTime } = event;
    if (realTime < startRealTimes[1]) {
      return "FIRST";
    }
    if (realTime < startRealTimes[2]) {
      return "SECOND";
    }
    return "THIRD";
  };
};
const getEventZone = (event) => {
  const { position, period } = event;
  const periodSwitchedZone = period === "SECOND";
  if (position.x < 214) {
    return periodSwitchedZone ? "ATTACK" : "DEFEND";
  }
  if (position.x > 426) {
    return periodSwitchedZone ? "DEFEND" : "ATTACK";
  }
  return "NEUTRAL";
};

const addPeriodForEvent = (matchVideoInfo) => (event) => ({
  ...event,
  period: getPeriodForEvent(matchVideoInfo)(event),
});
const addEventZoneForEvent = (event) => ({
  ...event,
  zone: getEventZone(event),
});
const addInfoToEvent = (matchVideoInfo) =>
  compose(addEventZoneForEvent, addPeriodForEvent(matchVideoInfo));

const isEventPropertyIncludedInFilter = (propertyPath) => (filter) => (
  event
) => {
  if (!filter || filter.length === 0) {
    return Right(event);
  }
  if (filter.map((v) => v.value).includes(path(propertyPath)(event))) {
    return Right(event);
  }
  return Left(event);
};
const isEventInPeriod = isEventPropertyIncludedInFilter(["period"]);
const isEventTypeShowing = isEventPropertyIncludedInFilter(["type"]);
const isPlayerShowing = isEventPropertyIncludedInFilter(["player", "id"]);
const isInZone = isEventPropertyIncludedInFilter(["zone"]);

const getEventsFiltered = (matchVideoInfo) => (events) => (filters) => {
  const isShowing = (event) =>
    Right(event)
      .chain(isPlayerShowing(filters.selectedPlayers))
      .chain(isEventInPeriod(filters.selectedPeriods))
      .chain(isEventTypeShowing(filters.selectedEvents))
      .chain(isInZone(filters.selectedZones))
      .isRight();
  return events.map(addInfoToEvent(matchVideoInfo)).filter(isShowing);
};

export default function useEventFiltering({ events, matchId, filters }) {
  const [loading, data] = useGetMatchVideoInfo(matchId);
  if (!data) {
    return events;
  }
  console.log(data)
  const matchVideoInfo = path(["matchVideoInfo"], data);
  return getEventsFiltered(matchVideoInfo)(events)(filters);
}
