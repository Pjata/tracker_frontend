import { usePlayerDnD } from "./usePlayerDnD";
import React, { useState, useEffect, useReducer } from "react";
import * as R from "ramda";
import { LineGroup } from "../../recorder/OnIce/LineGroup";
import reduceReducers from "reduce-reducers";

const groupByLines = R.groupBy((item) => item.row);

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const toBenchSource = (playersOnBench) => ({ droppableId, index }) => {
  const lineNum = Number(droppableId.split("_")[1]);

  const lines = groupByLines(playersOnBench);
  const offSet = R.compose(
    R.sum,
    R.map((a) => a.length),
    R.take(lineNum),
    R.values
  )(lines);

  return { droppableId: "onBench", index: offSet + index };
};

const moveToIce = (state, source, destination) => {
  const { playersOnBench, playersOnIce } = state;
  const { onIce, onBench } = move(
    playersOnBench,
    playersOnIce,
    toBenchSource(playersOnBench)(source),
    destination
  );
  return {
    ...state,
    playersOnIce: onIce,
    playersOnBench: onBench,
  };
};

const toBenchDestination = (playersOnIce, originalPositions) => ({ index }) => {
  const player = playersOnIce[index];
  const origIndex = originalPositions.findIndex((p) => player.id === p.id);
  return { droppableId: "onBench", index: origIndex };
};

const moveToBench = (state, source) => {
  const { playersOnBench, playersOnIce, originalPositions } = state;
  const { onIce, onBench } = move(
    playersOnIce,
    playersOnBench,
    source,
    toBenchDestination(playersOnIce, originalPositions)(source)
  );

  return {
    ...state,
    playersOnIce: onIce,
    playersOnBench: onBench,
  };
};

const moveReducer = (state, action) => {
  if (action.type === "MOVE") {
    const { source, destination } = action;
    if (
      source.droppableId.startsWith("onBench") &&
      destination.droppableId.startsWith("onBench")
    ) {
      return state;
    }
    if (destination.droppableId === "onIce") {
      return moveToIce(state, source, destination);
    }
    return moveToBench(state, source);
  }
  return state;
};

const noTargetReducer = (state, { type, source }) => {
  if (type === "NO_TARGET" && source.droppableId === "onIce") {
    return moveToBench(state, source);
  }
  return state;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "playersFetched":
      const flattened = R.compose(
        R.flatten,
        R.values,
        groupByLines
      )(action.players);
      return {
        originalPositions: flattened,
        playersOnBench: flattened,
        playersOnIce: [],
      };
    case "movePlayersToIce":
      return {
        ...state,
        playersOnIce: action.players,
      };
    case "movePlayersToBench":
      return {
        ...state,
        playersOnBench: action.players,
      };
    default:
      return state;
  }
};

export const usePlayerOnIce = () => {
  const { state, dispatch, onDragEnd } = usePlayerDnD(
    {
      playersOnBench: [],
      playersOnIce: [],
    },
    reduceReducers({}, reducer, moveReducer, noTargetReducer)
  );
  console.log(state);
  const { playersOnBench, playersOnIce, originalPositions } = state;

  const lines = groupByLines(playersOnBench);

  const setPlayersOnBench = (players) =>
    dispatch({ type: "movePlayersToBench", players });

  const setPlayersOnIce = (players) =>
    dispatch({ type: "movePlayersToIce", players });

  const onAddAll = (players) => () => {
    const diff = R.difference(playersOnBench, players);
    setPlayersOnBench(diff);
    setPlayersOnIce([...playersOnIce, ...players]);
  };

  const mapToLineGroups = R.compose(
    R.addIndex(R.map)((key, index) => {
      const line = lines[key];
      return (
        <div>
          <div
            style={{
              textAlign: "left",
            }}
          >
            <button onClick={onAddAll(line)}>{`Line ${key}`}</button>
          </div>
          <LineGroup
            key={key}
            players={line}
            droppableId={`onBench_${index}`}
          />
        </div>
      );
    }),
    R.keys
  );

  const loader = (Component) => (props) =>
    originalPositions ? <Component {...props} /> : <div>Loading...</div>;
  const lineGroups = lines ? mapToLineGroups(lines) : [];
  const OnBench = loader(() => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gridGap: "24px",
      }}
    >
      {lineGroups}
    </div>
  ));

  const onRemoveAll = () => {
    setPlayersOnBench(originalPositions);
    setPlayersOnIce([]);
  };

  const OnIce = loader(() => (
    <div>
      <div
        style={{
          textAlign: "left",
        }}
      >
        <button onClick={onRemoveAll}>{`Remove`}</button>
      </div>
      <LineGroup players={playersOnIce} droppableId={"onIce"} />
    </div>
  ));

  return { OnIce, OnBench, onDragEnd };
};
