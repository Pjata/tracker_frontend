/* eslint-disable default-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, useCallback, useMemo, useEffect } from "react";
import useAddEvent from "./EventList/useAddEvent";
import useUpdateEvent from "./EventList/useUpdateEvent";
import produce from "immer";
import uuid from "uuid/v1";
import Events from "./Events";
import * as R from "ramda";

const getPosition = ({ x, y }) => ({ x, y });
const getEventData = (data) => {
  const omitTypename = R.omit(["__typename"]);
  const { shotPosition, ...eventData } = data;
  return {
    ...omitTypename(eventData),
    shotPosition: omitTypename(shotPosition),
  };
};
const setRealTimeToNow = (event) => ({
  ...event,
  eventToAdd: {
    ...event.eventToAdd,
    realTime: new Date(),
  },
});
const eventToAdd = (event) => ({
  id: uuid(),
  eventToAdd: {
    realTime: event.realTime || new Date(),
    type: event.type,
    player: event.player,
    position: getPosition(event.position),
    eventData: event.eventData,
  },
});
const eventToUpdate = (event) => ({
  id: uuid(),
  eventToAdd: {
    id: event.id,
    type: event.type,
    player: R.path(["player"])(event),
    position: getPosition(event.position),
    eventData: getEventData(event.eventData),
  },
});
const initialState = {
  mode: "RINK",
  selectedEvent: null,
  addEventQueue: [],
  updateEventQueue: [],
  videoPlayerTime: 0,
};
export const RecordStateContext = React.createContext(initialState);

const reducer = produce((state, { type, data }) => {
  const { mode } = state;
  switch (type) {
    case "SHOT_TARGET_POSITION_SELECTED": {
      const newEvent = {
        ...state.event,
        eventData: {
          ...state.event.eventData,
          shotPosition: data,
        },
      };
      state.updateEventQueue.push(eventToUpdate(newEvent));
      state.event = null;
      state.mode = "RINK";
      break;
    }
    case "SHOT_PRIMARY_ASSIST_LOCATION_SELECTED": {
      const newEvent = {
        ...state.event,
        eventData: {
          ...state.event.eventData,
          primaryAssist: data,
        },
      };
      state.event = newEvent;
      state.mode = "EDITING_PRIMARY_PASS_TIME_DIFFERENCE";
      break;
    }
    case "EDIT_SAVE_POSITION":
      state.event = { ...state.selectedEvent };
      state.mode = "SELECT_SHOT_TARGET_POSITION";
      break;
    case "SHOT_OUTCOME_SELECTED":
      {
        const newEvent = {
          ...state.selectedEvent,
          eventData: {
            ...state.selectedEvent.eventData,
            shotOutcome: data.type,
          },
        };

        if (
          newEvent.eventData.shotOutcome === "SHOT_ON_GOAL" ||
          newEvent.eventData.shotOutcome === "GOAL"
        ) {
          state.event = newEvent;
          state.mode = "SELECT_SHOT_TARGET_POSITION";
          return;
        }
        newEvent.eventData.shotPosition = null;
        state.updateEventQueue.push(eventToUpdate(newEvent));
        state.mode = "RINK";
      }
      break;
    case "SHOT_TYPE_SELECTED":
      {
        const newEvent = {
          ...state.selectedEvent,
          eventData: {
            ...state.selectedEvent.eventData,
            shotType: data.type,
          },
        };
        state.mode = "RINK";
        state.updateEventQueue.push(eventToUpdate(newEvent));
      }
      break;
    case "PRIMARY_ASSIST_TIME_DIFFERENCE_SELECTED":
      {
        const newEvent = {
          ...state.event,
          eventData: {
            ...state.event.eventData,
            assistTimeDifference: data,
          },
        };
        state.event = newEvent;
        state.mode = "SELECT_GOALIE_POSITION";
      }
      break;
    case "GOALIE_POSITION_SELECTED":
      {
        const newEvent = {
          ...state.event,
          eventData: {
            ...state.event.eventData,
            goaliePosition: data,
          },
        };
        state.event = newEvent;
        state.mode = "SELECT_SCREEN";
      }
      break;
    case "SCREEN_SELECTED":
      {
        const newEvent = {
          ...state.event,
          eventData: {
            ...state.event.eventData,
            screen: data,
          },
        };
        state.mode = "RINK";
        state.updateEventQueue.push(eventToUpdate(newEvent));
      }
      break;
    case "EDIT_EVENT":
      state.mode = "EDITING_EVENT";
      break;
    case "EDIT_CHANCE":
      state.event = { ...state.selectedEvent };
      state.mode = "EDITING_PRIMARY_PASS_LOCATION";
      break;
    case "EDIT_SHOT_OUTCOME":
      state.mode = "EDIT_SHOT_OUTCOME";
      break;
    case "EDIT_SHOT_TYPE":
      state.mode = "EDIT_SHOT_TYPE";
      break;
    case "DESELECT_EVENT":
      state.selectedEvent = null;
      break;
    case "SELECTED_EVENT":
      state.selectedEvent = data;
      break;
    case "FACEOFF_PERIOD_SET":
    case "OUTSIDE_CLICK":
      state.mode = "RINK";
      break;
    case "SELECT_PLAYER":
      state.mode = "PLAYER_SELECTOR";
      break;
    case "EVENT_PLACE":
      if (mode === "RINK") {
        state.event = {
          ...data,
          realTime: new Date(),
        };
        state.mode = "SELECTOR";
      }
      break;
    case "CHANGE_PLAYER":
      state.mode = "PLAYER_SELECTOR";
      state.event = {
        ...state.selectedEvent,
      };
      state.forceUpdate = true;
      break;
    case "CHANGE_EVENT":
      state.mode = "SELECTOR";
      state.event = {
        ...state.selectedEvent,
      };
      state.forceUpdate = true;
      break;
    case "EVENT_SELECTED":
      if (state.forceUpdate) {
        const newEvent = {
          ...state.event,
          ...data,
        };
        state.mode = "RINK";
        state.event = null;
        state.forceUpdate = false;
        state.updateEventQueue.push(eventToUpdate(newEvent));
        return;
      }
      if (
        data.type === "SAVE" ||
        data.type === "GOAL_AGAINST" ||
        data.type === "SHOT_AGAINST"
      ) {
        const newEvent = {
          ...state.event,
          ...data,
          player: {
            id: null,
          },
        };
        state.event = null;
        state.mode = "RINK";
        state.addEventQueue.push(eventToAdd(newEvent));
        return;
      }
      state.event = {
        ...state.event,
        ...data,
      };
      state.mode = "PLAYER_SELECTOR_ADD";
      break;
    case "FACEOFF_ENEMY_SELECTED":
      state.mode = "FACEOFF_EVENT_DATA_SELECTOR";
      state.event = {
        ...state.event,
        eventData: {
          ...state.event.eventData,
          enemy: data,
        },
      };
      break;
    case "SELECTED_PLAYER":
      {
        const newEvent = {
          ...state.event,
          player: data,
        };
        if (state.forceUpdate) {
          state.updateEventQueue.push(eventToUpdate(newEvent));
          state.mode = "RINK";
          state.event = null;
          state.forceUpdate = false;
          return;
        }
        if (newEvent.type === Events.FACEOFF.type) {
          state.event = newEvent;
          state.mode = "FACEOFF_ENEMY_SELECTOR";
          return;
        }
        state.event = null;
        state.mode = "RINK";
        state.addEventQueue.push(eventToAdd(newEvent));
      }
      break;
    case "FACEOFF_EVENT_DATA_SELECTED":
      {
        const newEvent = {
          ...state.event,
          eventData: {
            ...state.event.eventData,
            ...data,
          },
        };
        state.mode = "RINK";
        state.event = null;
        state.addEventQueue.push(setRealTimeToNow(eventToAdd(newEvent)));
      }
      break;
    case "EVENT_UPDATED":
      state.updateEventQueue = state.updateEventQueue.filter(
        ({ id }) => id !== data.id
      );
      break;
    case "EVENT_ADDED":
      state.addEventQueue = state.addEventQueue.filter(
        ({ id }) => id !== data.id
      );
      break;
    case "VIDEO_PLAYER_TIME":
      state.videoPlayerTime = data;
      break;
    case "PERIOD_START_EDIT":
      state.mode = "PERIOD_START_EDIT";
      break;
  }
});
const RecordState = (props) => {
  const { children, matchId } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  const addEvent = useAddEvent(matchId);
  const updateEvent = useUpdateEvent(dispatch);

  useEffect(() => {
    state.addEventQueue.forEach(({ eventToAdd, done, id }) => {
      if (!done) {
        console.log("DO THIS SHIT", eventToAdd, id);
        dispatch({
          type: "EVENT_ADDED",
          data: { id },
        });
        addEvent(eventToAdd);
      }
    });
  }, [state.addEventQueue]);
  useEffect(() => {
    state.updateEventQueue.forEach(({ eventToAdd, done, id }) => {
      if (!done) {
        console.log("UPDATE THIS SHIT", eventToAdd, id);
        dispatch({
          type: "EVENT_UPDATED",
          data: { id },
        });
        updateEvent({ ...eventToAdd, matchId });
      }
    });
  }, [state.updateEventQueue]);

  console.log(value);
  return (
    <RecordStateContext.Provider value={value}>
      {children}
    </RecordStateContext.Provider>
  );
};

export default RecordState;
