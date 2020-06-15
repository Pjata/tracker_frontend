import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlayers } from "../../common/hooks/usePlayers";
import * as R from "ramda";
import { LineGroup } from "./LineGroup";

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

const groupByLines = R.groupBy((item) => item.row);

export const usePlayerDnD = () => {
  const [playersOnIce, setPlayersOnIce] = useState([]);
  const [playersOnBench, setPlayersOnBench] = useState([]);
  const [originalPositions, setOriginalPositions] = useState([]);
  const { teamId } = useParams();
  const players = usePlayers(teamId);

  useEffect(() => {
    if (!players) {
      return;
    }
    const flattened = R.compose(R.flatten, R.values, groupByLines)(players);
    setOriginalPositions(flattened);
    setPlayersOnBench(flattened);
  }, [players]);

  const loader = (Component) => (props) =>
    players ? <Component {...props} /> : <div>Loading...</div>;

  const lines = groupByLines(playersOnBench);

  const toBenchSource = ({ droppableId, index }) => {
    const lineNum = Number(droppableId.split("_")[1]);

    const offSet = R.compose(
      R.sum,
      R.map((a) => a.length),
      R.take(lineNum - 1),
      R.values
    )(lines);

    return { droppableId: "onBench", index: offSet + index };
  };

  const toBenchDestination = ({ index }) => {
    const player = playersOnIce[index];
    const origIndex = originalPositions.findIndex((p) => player.id === p.id);
    return { droppableId: "onBench", index: origIndex };
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    const moveToBench = () => {
      const { onIce, onBench } = move(
        playersOnIce,
        playersOnBench,
        source,
        toBenchDestination(source)
      );

      setPlayersOnIce(onIce);
      setPlayersOnBench(onBench);
    };

    const moveToIce = () => {
      const { onIce, onBench } = move(
        playersOnBench,
        playersOnIce,
        toBenchSource(source),
        destination
      );
      setPlayersOnIce(onIce);
      setPlayersOnBench(onBench);
    };

    if (!destination) {
      if (source.droppableId === "onIce") {
        moveToBench();
      }
      return;
    }

    if (source.droppableId === destination.droppableId) {
      return;
    }

    if (
      source.droppableId.startsWith("onBench") &&
      destination.droppableId.startsWith("onBench")
    ) {
      return;
    }

    if (destination.droppableId === "onIce") {
      moveToIce();
    } else {
      moveToBench();
    }
  };

  const onAddAll = (players) => () => {
    const diff = R.difference(playersOnBench, players);
    setPlayersOnBench(diff);
    setPlayersOnIce([...playersOnIce, ...players]);
  };
  const onRemoveAll = () => () => {
    setPlayersOnBench(originalPositions);
    setPlayersOnIce([]);
  };

  const OnIce = loader(() => (
    <LineGroup
      onClick={onRemoveAll}
      players={playersOnIce}
      droppableId={"onIce"}
      buttonLabel={"Remove"}
    />
  ));

  const mapToLineGroups = R.compose(
    R.map((key) => {
      const line = lines[key];
      return (
        <LineGroup
          key={line}
          onClick={onAddAll}
          players={line}
          droppableId={`onBench_${key}`}
          buttonLabel={`Line ${key}`}
        />
      );
    }),
    R.keys
  );
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

  return { OnIce, OnBench, onDragEnd };
};
