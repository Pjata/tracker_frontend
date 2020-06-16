import React, { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { usePlayers } from "./usePlayers";
import * as R from "ramda";
import { LineGroup } from "../../recorder/OnIce/LineGroup";

export const usePlayerDnD = (initialState,reducer) => {
  const [state, dispatch] = useReducer(reducer,initialState);

  const { teamId } = useParams();
  const players = usePlayers(teamId);

  useEffect(() => {
    if (!players) {
      return;
    }
    dispatch({
      type: "playersFetched",
      players,
    });
  }, [players]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      dispatch({ type: "NO_TARGET", source, destination });
      return;
    }
    if (source.droppableId === destination.droppableId) {
      dispatch({ type: "REORDER", source, destination });
      return;
    }
    dispatch({
      type: "MOVE",
      source,
      destination,
    });
  };

  return {
    state,
    dispatch,
    onDragEnd,
  };
};
